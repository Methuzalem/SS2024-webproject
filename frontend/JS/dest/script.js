"use strict";
var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var newTitle = document.getElementById("newTitle");
var newDate = document.getElementById("newDate");
var newTime = document.getElementById("newTime");
var newDuration = document.getElementById("newDuration");
var newLocation = document.getElementById("newLocation");
var appointmentTitle = document.getElementById("appointmentTitle");
var appointmentDuration = document.getElementById("appointmentTitle");
var appointmentLocation = document.getElementById("appointmentTitle");
var appointmentExpire = document.getElementById("appointmentTitle");
var appointmentName = document.getElementById("appointmentTitle");
var appointmentDate = document.getElementById("appointmentTitle");
var appointmentTime = document.getElementById("appointmentTitle");
var appointmentComment = document.getElementById("appointmentTitle");
var list = document.getElementById("list");
var listElements = document.querySelectorAll("ul li");
function clearNew() {
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
    newTime.value = "";
    newLocation.value = "";
}
function appendAppointments(data) {
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("id", i.toString());
        for (var j = 0; j < 2; j++) {
            var div = document.createElement("div");
            var input = document.createElement("input");
            input.setAttribute("class", "form-control-plaintext");
            input.setAttribute("type", "text");
            input.readOnly = true;
            switch (j) {
                case 0:
                    div.setAttribute("class", "appointmentTitle");
                    input.value = data[i].title;
                    break;
                case 1:
                    input.value = "Duration: " + data[i].duration + " hours";
            }
            div.appendChild(input);
            li.appendChild(div);
        }
        var temp = new Date();
        console.log(temp.toISOString().split('T')[0]);
        li.setAttribute("data-bs-toggle", "modal");
        li.setAttribute("data-bs-target", "#appointmentModal");
        if (data[i].expired == 0) {
            li.setAttribute("class", "list-group-item border-dark");
        }
        else {
            li.setAttribute("class", "list-group-item border-dark bg-secondary");
        }
        list.appendChild(li);
    }
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
        appendAppointments(data);
    })
        .catch(function (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}
function sendData(url) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "input1=".concat(encodeURIComponent(newTitle.value), "&input2=").concat(encodeURIComponent(newDate.value), "&input3=").concat(encodeURIComponent(newTime.value), "&input4=").concat(encodeURIComponent(newDuration.value), "&input5=").concat(encodeURIComponent(newLocation.value))
    })
        .then(function (response) { return response.text(); })
        .then(function (data) {
        console.log('Server Response:', data);
    })
        .catch(function (error) {
        console.error('Error sending data:', error);
    });
}
newClose === null || newClose === void 0 ? void 0 : newClose.addEventListener("click", function () {
    clearNew();
});
function refreshPage() {
    window.location.href = window.location.pathname + window.location.search + '#';
    window.location.reload();
}
function canSave() {
    return newTitle.value.trim() !== "" &&
        newDate.value.trim() !== "" &&
        newTime.value.trim() !== "" &&
        newDuration.value.trim() !== "" &&
        newLocation.value.trim() !== "";
}
newSave === null || newSave === void 0 ? void 0 : newSave.addEventListener('click', function () {
    if (canSave()) {
        sendData('../backend/logic/appocreation.php')
            .then(function () {
            clearNew();
            refreshPage();
        })
            .catch(function (error) {
            console.error('Error sending data:', error);
        });
    }
    else {
        alert('Please fill out all fields before saving!');
    }
});
function test(event) {
    var clickedElement = event.target;
    alert(clickedElement.id);
}
listElements.forEach(function (element) {
    element.addEventListener("click", function (event) {
        test(event);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php')
        .then(function () {
        fetchData("../backend/JSON/Appointments.json");
    });
    //fix clicking outside modal box (delete values)
    var newAppointmentModal = document.getElementById('newAppointmentModal');
    var modalIsClosedByUser = true;
    newSave.addEventListener('click', function () {
        modalIsClosedByUser = false;
    });
    newClose.addEventListener('click', function () {
        modalIsClosedByUser = false;
    });
    if (newAppointmentModal) {
        newAppointmentModal.addEventListener('hidden.bs.modal', function () {
            if (modalIsClosedByUser) {
                clearNew();
            }
            modalIsClosedByUser = true;
        });
    }
});
