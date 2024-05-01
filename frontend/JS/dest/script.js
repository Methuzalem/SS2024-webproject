"use strict";
var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var newTitle = document.getElementById("newTitle");
var newDuration = document.getElementById("newDuration");
var newDate = document.getElementById("newDate");
var newTime = document.getElementById("newTime");
var newLocation = document.getElementById("newLocation");
var listTitle = document.getElementById("listTitle");
var listDuration = document.getElementById("listDuration");
var listDate = document.getElementById("listDate");
var list = document.getElementById("list");
var div = document.createElement("div");
function clearNew() {
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
    newTime.value = "";
    newLocation.value = "";
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
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
    fetchData("../backend/JSON/Appointments.json");
    var saveButton = document.getElementById('newSave');
    saveButton.addEventListener('click', function () {
        var input1 = document.getElementById('newTitle').value;
        var input2 = document.getElementById('newDate').value;
        var input3 = document.getElementById('newTime').value;
        var input4 = document.getElementById('newDuration').value;
        var input5 = document.getElementById('newLocation').value;
        console.log('Input 1:', input1);
        console.log('Input 2:', input2);
        console.log('Input 3:', input3);
        console.log('Input 4:', input4);
        console.log('Input 5:', input5);
        // call to backend
        fetch('../backend/logic/appocreation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "input1=".concat(encodeURIComponent(input1), "&input2=").concat(encodeURIComponent(input2), "&input3=").concat(encodeURIComponent(input3), "&input4=").concat(encodeURIComponent(input4), "&input5=").concat(encodeURIComponent(input5))
        })
            .then(function (response) { return response.text(); })
            .then(function (data) {
            console.log('Server Response:', data);
        })
            .catch(function (error) {
            console.error('Error sending data:', error);
        });
        clearNew();
    });
});
