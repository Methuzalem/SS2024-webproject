"use strict";
var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var newTitle = document.getElementById("newTitle");
var newDuration = document.getElementById("newDuration");
var newDate = document.getElementById("newDate");
var listTitle = document.getElementById("listTitle");
var listDuration = document.getElementById("listDuration");
var listDate = document.getElementById("listDate");
var list = document.getElementById("list");
var div = document.createElement("div");
function clearNew() {
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
}
function fetchData(url) {
    fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
    })
        .catch(function (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}
function createNewAppointment() {
    clearNew();
}
newClose === null || newClose === void 0 ? void 0 : newClose.addEventListener("click", function () {
    clearNew();
});
newSave === null || newSave === void 0 ? void 0 : newSave.addEventListener("click", function () {
    createNewAppointment();
});
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
    fetchData("../backend/JSON/Appointments.json");
});
