var people = [
    { id: 1, text: 'John Cook' },
    { id: 2, text: 'Steve Jobs' },
    { id: 3, text: 'Peter Sanders' },
    { id: 4, text: 'Mark Newman' },
    { id: 5, text: 'Addy Osmani' },
    { id: 6, text: 'Paul Irish' },
    { id: 7, text: 'Doug Crocford' },
    { id: 8, text: 'Nicolas Cage' }
];

$(function () {
    //Para tratar los objetos de w2ui como JSON y no strings
    w2utils.settings.dataType = 'JSON'
    $('#grid').w2grid({
        name: 'grid',
        msgDelete: 'Desea desactivar el usuario seleccionado?',
        show: {
            toolbar: true,
            toolbarDelete: true,
            toolbarSave: true,
            toolbarReload: false,
            toolbarColumns: false,
            toolbarSearch: false,
            toolbarInput: false,
            searchAll: false
        },
        columns: [
            { field: 'recid', caption: 'ID', size: '10%', sortable: true, resizable: true },
            {
                field: 'correoElectronico', caption: 'Correo Electronico', size: '40%', sortable: true, resizable: true,
                editable: { type: 'email' }
            },
            {
                field: 'usuario', caption: 'Usuario', size: '15%', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            {
                field: 'estatus', caption: 'Estado', size: '15%', sortable: true, resizable: true,
                render: function (record) {
                    return '<div>' + (record.estatus ? 'Activo' : 'Inactivo') + '</div>';
                }
            },
            {
                field: 'sexo', caption: 'Sexo', size: '25%', sortable: true, resizable: true,
                editable: { type: 'text' }
            }
        ]
        //,
        //toolbar: {
        //    items: [
        //        { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
        //    ],
        //    onClick: function (event) {
        //        if (event.target === 'add') {
        //            w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
        //        }
        //    }
        //}
        ,
        url: '/Home/GetUsuarios',
        onSave: function (event) {
            var errors = new Array();
            var changes = this.getChanges();
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                if (change.hasOwnProperty('correoElectronico')) {
                    if (!w2utils.isEmail(change.correoElectronico)) {
                        errors.push(change.correoElectronico + " no es un email valido \n");
                    }
                }
            }
            if (errors.length > 0) {
                this.error(errors.join(''));
                event.preventDefault();
            }
            //if (!w2utils.isEmail(event.value_new)) {
            //    //console.log(record);
            //    record.w2ui = null;
            //    this.refresh();
            //    this.error(event.value_new + " no es un email valido");
            //}
        }
    });
});