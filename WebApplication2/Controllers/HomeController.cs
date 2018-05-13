using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebApplication2.Models;
using SimpleCrypto;
using BCrypt.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Data.Entity.Validation;
using Newtonsoft.Json.Linq;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public DBEntities db { get; private set; }

        public ActionResult Index()
        {
            return View();
        }

        [CheckAuthorization]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        //GET: EnsureLoggedOut
        private void EnsureLoggedOut()
        {
            // If the request is (still) marked as authenticated we send the user to the logout action
            if (Request.IsAuthenticated)
                Logout();
        }

        private ActionResult RedirectToLocal(string returnURL = "")
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(returnURL) && Url.IsLocalUrl(returnURL))
                    return Redirect(returnURL);

                return RedirectToAction("Index", "Home");
            }
            catch
            {
                throw;
            }
        }

        //POST: Logout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Logout()
        {
            try
            {
                // First we clean the authentication ticket like always
                //required NameSpace: using System.Web.Security;
                FormsAuthentication.SignOut();

                // Second we clear the principal to ensure the user does not retain any authentication
                //required NameSpace: using System.Security.Principal;
                HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);

                Session.Clear();
                System.Web.HttpContext.Current.Session.RemoveAll();

                // Last we redirect to a controller/action that requires authentication to ensure a redirect takes place
                // this clears the Request.IsAuthenticated flag since this triggers a new request
                return RedirectToLocal();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginVM entity)
        {

            try
            {
                using (db = new DBEntities())
                {
                    // Ensure we have a valid viewModel to work with
                    if (!ModelState.IsValid)
                        return View(entity);

                    var userInfo = db.Usuarios.Where(s => s.usuario1 == entity.usuario.Trim()).FirstOrDefault();

                    bool isLogin = BCrypt.Net.BCrypt.Verify(entity.contrasena, userInfo.contrasena);

                    if (isLogin)
                    {
                        FormsAuthentication.SetAuthCookie(entity.usuario, true);

                        //Set A Unique ID in session
                        Session["UserID"] = userInfo.usuario1;

                        // If we got this far, something failed, redisplay form
                        // return RedirectToAction("Index", "Dashboard");
                        return RedirectToLocal(entity.ReturnURL);
                    }
                    else
                    {
                        //Login Fail
                        TempData["ErrorMSG"] = "Credenciales incorrectas.";
                        return View(entity);
                    }
                }
            }
            catch
            {
                throw;
            }

        }

        [HttpGet]
        public ActionResult Login(string returnURL)
        {
            var infoUsuario = new LoginVM();
            try
            {
                EnsureLoggedOut();

                infoUsuario.ReturnURL = returnURL;

                return View(infoUsuario);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public ContentResult GetUsuarios(w2uiCommandVM request)
        {

            try
            {
                switch (request.cmd)
                {
                    case "get":
                    default:
                        using (db = new DBEntities())
                        {
                            JsonSerializer serializer = new JsonSerializer();
                            serializer.Converters.Add(new JavaScriptDateTimeConverter());
                            serializer.NullValueHandling = NullValueHandling.Ignore;



                            var result = db.Usuarios.Select(s => new
                            {
                                recid = s.id,
                                correoElectronico = s.correoElectronico,
                                usuario = s.usuario1,
                                estatus = s.estatus,
                                sexo = s.sexo,
                                fechaCreacion = s.fechaCreacion
                            }).ToList();
                            string jsonResult = JsonConvert.SerializeObject(result, new JavaScriptDateTimeConverter());
                            return Content(jsonResult, "application/json");
                        }
                    case "delete":
                        using (db = new DBEntities())
                        {
                            JsonSerializer serializer = new JsonSerializer();
                            serializer.Converters.Add(new JavaScriptDateTimeConverter());
                            serializer.NullValueHandling = NullValueHandling.Ignore;
                            var registros = db.Usuarios.Where(x => request.selected.Contains(x.id)).ToList();
                            registros.ForEach(r => r.estatus = false);
                            db.SaveChanges();
                            var result = registros.Select(n => new
                            {
                                recid = n.id,
                                correoElectronico = n.correoElectronico,
                                usuario = n.usuario1,
                                estatus = n.estatus,
                                sexo = n.sexo
                            });
                            string jsonResult = JsonConvert.SerializeObject(result, new JavaScriptDateTimeConverter());
                            return Content(jsonResult, "application/json");
                        }
                }
            }
            catch (Exception ex)
            {

                throw;
            }

        }


        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Usuario usuario)
        {
            try
            {
                using (db = new DBEntities())
                {
                    if (ModelState.IsValid)
                    {
                        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(usuario.contrasena);

                        usuario.contrasena = hashedPassword;

                        db.Usuarios.Add(usuario);
                        db.SaveChanges();
                        return RedirectToAction("Index");
                    }
                    else
                    {
                        return View(usuario);
                    }
                }
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }
    }
}