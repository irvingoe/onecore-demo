﻿var people = [
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
                field: 'text', caption: 'text', size: '120px', sortable: true, resizable: true,
                editable: { type: 'text' }
            },
            {
                field: 'int', caption: 'int', size: '80px', sortable: true, resizable: true, render: 'int',
                editable: { type: 'int', min: 0, max: 32756 }
            },
            {
                field: 'money', caption: 'money', size: '80px', sortable: true, resizable: true, render: 'money',
                editable: { type: 'money' }
            },
            {
                field: 'percent', caption: 'percent', size: '80px', sortable: true, resizable: true, render: 'percent:1',
                editable: { type: 'percent', precision: 1 }
            },
            {
                field: 'color', caption: 'color', size: '80px', sortable: true, resizable: true,
                editable: { type: 'color' }
            },
            {
                field: 'date', caption: 'date', size: '90px', sortable: true, resizable: true, render: 'date', style: 'text-align: right',
                editable: { type: 'date' }
            },
            {
                field: 'time', caption: 'time', size: '70px', sortable: true, resizable: true,
                editable: { type: 'time' }
            },
            {
                field: 'list', caption: 'list', size: '50%', sortable: true, resizable: true,
                editable: { type: 'list', items: people, showAll: true },
                render: function (record, index, col_index) {
                    var html = this.getCellValue(index, col_index);
                    return html || '';
                }
            },
            {
                field: 'combo', caption: 'combo', size: '50%', sortable: true, resizable: true,
                editable: { type: 'combo', items: people, filter: false }
            },
            {
                field: 'select', caption: 'select', size: '100px', sortable: true, resizable: true,
                editable: { type: 'select', items: [{ id: '', text: '' }].concat(people) },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in people) {
                        if (people[p].id == this.getCellValue(index, col_index)) html = people[p].text;
                    }
                    return html;
                }
            },
            {
                field: 'check', caption: 'check', size: '60px', sortable: true, resizable: true, style: 'text-align: center',
                editable: { type: 'checkbox', style: 'text-align: center' }
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
        records: [
            { recid: 1, int: 100, money: 100, percent: 55, date: '1/1/2014', combo: 'John Cook', check: true },
            { recid: 2, int: 200, money: 454.40, percent: 15, date: '1/1/2014', combo: 'John Cook', check: false, list: { id: 2, text: 'Steve Jobs' } },
            { recid: 3, int: 350, money: 1040, percent: 98, date: '3/14/2014', combo: 'John Cook', check: true },
            { recid: 4, int: 350, money: 140, percent: 58, date: '1/31/2014', combo: 'John Cook', check: true, list: { id: 4, text: 'Mark Newman' } },
            { recid: 5, int: 350, money: 500, percent: 78, date: '4/1/2014', check: false },
            { recid: 6, text: 'some text', int: 350, money: 440, percent: 59, date: '4/4/2014', check: false },
            { recid: 7, int: 350, money: 790, percent: 39, date: '6/8/2014', check: false },
            { recid: 8, int: 350, money: 4040, percent: 12, date: '11/3/2014', check: true },
            {
                recid: 9, int: 1000, money: 3400, percent: 100, date: '2/1/2014',
                style: 'background-color: #ffcccc', editable: false
            }
        ]
    });
});

function showChanged() {
    console.log(w2ui['grid'].getChanges());
    w2alert('Changed records are displayed in the console');
}