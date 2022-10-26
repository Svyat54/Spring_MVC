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
            flushData();
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
            id: $('#selectId').val()},
        success: function (){
            flushData();
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
    flushData();
}
function requestContact(){
    flushTable();
    $.ajax({
        url:"/getName",
        type: "GET",
        dataType: "html",
        data: {name: $('#name').val()},
        success(data){
            let name = JSON.parse(data);
            drawTable(name);
        }
    })
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
            flushData();
            setContactProps(JSON.parse(data));
        }
    })
}
//Кнопки выбора действия.
attrSubButton("add");
function chooseAdd() {
    drawTask("add");
    $('#selectId').hide();
}
function chooseUpdate() {
    drawTask("update");
    selectIdShow();
}
function chooseDelete(){
    drawTask("delete");
    selectIdShow();
}
function chooseRequest() {
    drawTask("request");
    $('#selectId').hide();
}
function attrSubButton(task){
    let submit = $('#submit');
    if (task !== "request") submit.val(task + " contact");
    else submit.val(task);
    submit.off('click');
    submit.on('click', function (){
        if(task === 'add') addContact();
        else if(task === 'update') updateContact();
        else if (task === 'delete') deleteContact();
        else requestContact();
    });
}
function flushData() {
    $('#name').val("");
    $('#phone').val("");
    $('#email').val("");
    $('#blogLink').val("");
    $('#comment').val("");
    flushTable();
}
function flashChoice(task) {
    $('#addChoice').html("add");
    $('#updateChoice').html("update");
    $('#deleteChoice').html("delete");
    $('#requestChoice').html("request");
    $('#' + task + "Choice").html("<b>" + task + "</b>");
}
function selectIdShow(){
    $('#selectId').show();
    getIds();
    setTimeout(function() {selectListener()},50);
}
//Draw Table
function drawTable(tableData) {
    let table = $('#nameRequestTable');
    table.append(getHeader());
    for (let i = 0; i < tableData.length; i++)
        table.append(getRow(tableData[i]));
}
function getHeader() {
    let row = document.createElement("tr");
    let header = ["name", "phone", "email", "blogLink", "comment"];
    for (let i = 0; i < header.length; i++)
        row.append(getData(header[i]));
    return row;
}
function getRow(contact) {
    let row = document.createElement("tr");
    row.append(getData(contact.name));
    row.append(getData(contact.phone));
    row.append(getData(contact.email));
    row.append(getData(contact.blogLink));
    row.append(getData(contact.comment));
    return row;
}
function getData(data) {
    let cell = document.createElement("td");
    cell.innerHTML = data;
    cell.setAttribute("class", "request_Table_cell")
    return cell;
}
function flushTable(){
    let table = $('#nameRequestTable');
    if(table.children().length !== 0)
    table.children().remove();

}
//Function Draw
function drawTask(task) {
    flashChoice(task);
    flushData();
    drawInputsOutputs(task);
    attrSubButton(task);
}
function drawInputsOutputs(task) {
    if (task === "request") requestInputs();
    else addUpdDelInputs();
}
//Show/Hide
function addUpdDelInputs() {
    $('#phone').show();
    $('#email').show();
    $('#blogLink').show();
    $('#comment').show();
    $('#nameRequestTable').hide();
}
function requestInputs() {
    $('#phone').hide();
    $('#email').hide();
    $('#blogLink').hide();
    $('#comment').hide();
    $('#nameRequestTable').show();
}
