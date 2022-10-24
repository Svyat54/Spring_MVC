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
function updateContact() {
    $.ajax({
        url: "/update",
        type: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        data: {
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            blogLink: $('#blogLink').val(),
            comment: $('#comment').val()
        }
    })
}

function getOption(id){
    let option = document.createElement("option");
    option.innerHTML = (id + 1);
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
    let selectId = $('#selectId');
    if (selectId.val() === null)
        return 1;
    else
        return selectId.val();
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
            setContactProps(JSON.parse(data));
        }
    })
}

function flushInputs() {
    $('#name').val("");
    $('#phone').val("");
    $('#email').val("");
    $('#blogLink').val("");
    $('#comment').val("");
}

function attrSubmitButton() {
    let submit = $('#submit');
    submit.val("add contact");
    submit.attr("type", "submit");
}
function chooseAdd() {
    $('#addChoice').html("<b>Add</b>");
    $('#updateChoice').html("Update");
    $('#selectId').hide();
    flushInputs();
    attrSubmitButton();
}

function attrUpdateButton() {
    let submit = $('#submit');
    submit.val("update contact");
    submit.attr("type", "button");
    submit.click(function () {updateContact()});
}
function chooseUpdate() {
    $('#addChoice').html("Add");
    $('#updateChoice').html("<b>Update</b>");
    $('#selectId').show();
    attrUpdateButton();
    getIds();
    selectListener();
}