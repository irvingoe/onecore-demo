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
        show: {
            toolbar: true,
            footer: true,
            toolbarSave: true
        },
        columns: [
            { field: 'recid', caption: 'ID', size: '50px', sortable: true, resizable: true },
            {
                field: 'correoElectronico', caption: 'Correo Electronico', size: '120px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            {
                field: 'usuario', caption: 'Usuario', size: '80px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            {
                field: 'estatus', caption: 'Estado', size: '60px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
            },
            {
                field: 'sexo', caption: 'percent', size: '80px', sortable: true, resizable: true,
                editable: { type: 'text'}
            },
            {
                field: 'fechaCreacion', caption: 'Fecha Creado', size: '90px', sortable: true, resizable: true, render: 'date', style: 'text-align: right',
                editable: { type: 'date' }
            }
        ],
        toolbar: {
            items: [
                { id: 'add', type: 'button', caption: 'Add Record', icon: 'w2ui-icon-plus' }
            ],
            onClick: function (event) {
                if (event.target == 'add') {
                    w2ui.grid.add({ recid: w2ui.grid.records.length + 1 });
                }
            }
        },
        url: '/Home/GetUsuarios'
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}