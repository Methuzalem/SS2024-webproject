"use strict";
var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var newTitle = document.getElementById("newTitle");
var newDate = document.getElementById("newDate");
var newTime = document.getElementById("newTime");
var newDuration = document.getElementById("newDuration");
var newLocation = document.getElementById("newLocation");
var list = document.getElementById("list");
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
        li.setAttribute("id", "".concat(data[i].App_ID));
        li.setAttribute("class", "list-group-item border-dark");
        for (var j = 0; j < 3; j++) {
            var div = document.createElement("div");
            if (j == 0) {
                div.setAttribute("class", "bg-dark text-white");
            }
            var label = document.createElement("label");
            var input = document.createElement("input");
            input.setAttribute("class", "form-control-plaintext");
            input.setAttribute("type", "text");
            input.readOnly = true;
            switch (j) {
                case 0:
                    input.value = data[i].title;
                    break;
                case 1:
                    label.innerHTML = "Duration";
                    input.value = data[i].duration;
                    break;
                case 2:
                    input.value = data[i].date;
            }
            if (j == 1) {
                div.appendChild(label);
            }
            div.appendChild(input);
            li.appendChild(div);
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
    fetch(url, {
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
newSave === null || newSave === void 0 ? void 0 : newSave.addEventListener('click', function () {
    sendData('../backend/logic/appocreation.php');
    clearNew();
    fetch('../backend/servicehandler.php', {
        method: "POST"
    });
    fetchData("../backend/JSON/Appointments.json");
});
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
    fetchData("../backend/JSON/Appointments.json");
});
