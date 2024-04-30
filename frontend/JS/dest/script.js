var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var listTitle = document.getElementById("listTitle");
var listDuration = document.getElementById("listDuration");
var listDate = document.getElementById("listDate");
var newTitle = document.getElementById("newTitle");
var newDuration = document.getElementById("newDuration");
var newDate = document.getElementById("newDate");
var list = document.getElementById("list");
var listElement = "<li class=\"list-group-item border-dark\" data-bs-toggle=\"modal\" data-bs-target=\"#appointmentModal\"></li>";
//create JSON-files on load
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
});
function clearNew() {
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
}
function appendListElement() {
    list.innerHTML = listElement;
}
function appendAppointmentData() {
}
function createNewAppointment() {
    appendListElement();
    appendAppointmentData();
    clearNew();
}
newClose === null || newClose === void 0 ? void 0 : newClose.addEventListener("click", function () {
    clearNew();
});
newSave === null || newSave === void 0 ? void 0 : newSave.addEventListener("click", function () {
    createNewAppointment();
});
