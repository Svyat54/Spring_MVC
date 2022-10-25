//Вызов функций
function updateContact() {
    $.ajax({
        url: "/update",
        type: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        data: {
            id: $('#selectId').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            blogLink: $('#blogLink').val(),
            comment: $('#comment').val()
        },
        success: function (){
            flushInputs();
            chooseUpdate();
        }
    })
}
function deleteContact(){
    $.ajax({
        url: "/delete",
        type: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        data: {
            id: $('#selectId').val(),
        },
        // success: function (data){
        //     console.log(JSON.parse(data));
        // }
        success: function (){
            flushInputs();
            chooseDelete();
        }
    })
}
function addContact(){
    $.ajax({
        url: "/add",
        method: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        data: {
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            blogLink: $('#blogLink').val(),
            comment: $('#comment').val()
        }
    });
    flushInputs();
}
//
function getIds(){
    $.ajax({
        url: "/getIds",
        method: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data){
            setOptions(JSON.parse(data).ids);
        }
    })
}
function getOption(id){
    let option = document.createElement("option");
    option.innerHTML = id;
    return option;
}
function setOptions(ids){
    let select =  $('#selectId');
    select.empty();
    for (let i = 0; i < ids.length; i++)
        select.append(getOption(ids[i]));
    select.on('change', function(){
        selectListener()
    });
}
function getIdSelected() {
    let selectId = $('#selectId').val();
    if (selectId !== null)
        return selectId;
}
function setContactProps(contact) {
    $('#name').val(contact.name);
    $('#phone').val(contact.phone);
    $('#email').val(contact.email);
    $('#blogLink').val(contact.blogLink);
    $('#comment').val(contact.comment);
}
function selectListener(){
    $.ajax({
        url: "/getContact",
        type: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        data: {contactId: getIdSelected()},
        success(data) {
            flushInputs();
            setContactProps(JSON.parse(data));
        }
    })
}
//Кнопки выбора действия.
attrSubButton("add");
function chooseAdd() {
    $('#addChoice').html("<b>Add</b>");
    $('#updateChoice').html("Update");
    $('#deleteChoice').html("Delete");
    $('#selectId').hide();
    flushInputs();
    attrSubButton('add');
}
function chooseUpdate() {
    $('#addChoice').html("Add");
    $('#deleteChoice').html("Delete");
    $('#updateChoice').html("<b>Update</b>");
    flushInputs()
    attrSubButton('update');
    selectIdShow();
}
function chooseDelete(){
    $('#addChoice').html("Add");
    $('#updateChoice').html("Update");
    $('#deleteChoice').html("<b>Delete</b>");
    flushInputs();
    attrSubButton('delete');
    selectIdShow();
}
function attrSubButton(task){
    let submit = $('#submit');
    submit.val(task + " contact");
    submit.off('click');
    submit.on('click', function (){
        if(task === 'add') addContact();
        else if(task === 'update') updateContact();
        else deleteContact();
    });
}
function flushInputs() {
    $('#name').val("");
    $('#phone').val("");
    $('#email').val("");
    $('#blogLink').val("");
    $('#comment').val("");
}
function selectIdShow(){
    $('#selectId').show();
    getIds();
    setTimeout(function() {selectListener()},50);
}