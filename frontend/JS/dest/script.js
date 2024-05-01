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
    //function to send datas from appointment creation to db
    var saveButton = document.getElementById('newSave');
    var formElements = {
        title: document.getElementById('newTitle'),
        date: document.getElementById('newDate'),
        time: document.getElementById('newTime'),
        duration: document.getElementById('newDuration'),
        location: document.getElementById('newLocation')
    };
    saveButton.addEventListener('click', function (event) {
        event.preventDefault();
        var formData = new FormData();
        formData.append('title', formElements.title.value);
        formData.append('date', formElements.date.value);
        formData.append('time', formElements.time.value);
        formData.append('duration', formElements.duration.value);
        formData.append('location', formElements.location.value);
        fetch('../backend/logic/appocreation.php', {
            method: 'POST',
            body: formData
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
            .then(function (data) {
            console.log('Erfolg:', data);
        })
            .catch(function (error) {
            console.error('Fehler beim Laden von appocreation.php:', error);
        });
    });
});
