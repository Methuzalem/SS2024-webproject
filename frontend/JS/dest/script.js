"use strict";
var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var addDate = document.getElementById("addDate");
var appointmentClose = document.getElementById("appointmentClose");
var appointmentSave = document.getElementById("appointmentSave");
var newTitle = document.getElementById("newTitle");
var newDate = document.getElementById("newDate");
var newExpire = document.getElementById("newExpire");
var newTime = document.getElementById("newTime");
var newDuration = document.getElementById("newDuration");
var newLocation = document.getElementById("newLocation");
var appointmentID = "";
var appointmentTitle = document.getElementById("appointmentTitle");
var appointmentDuration = document.getElementById("appointmentDuration");
var appointmentLocation = document.getElementById("appointmentLocation");
var appointmentExpire = document.getElementById("appointmentExpire");
var appointmentName = document.getElementById("appointmentName");
var appointmentDate = document.getElementById("appointmentDate");
var appointmentTime = document.getElementById("appointmentTime");
var appointmentComment = document.getElementById("appointmentComment");
var expiredTitle = document.getElementById("expiredTitle");
var expiredDuration = document.getElementById("expiredDuration");
var expiredLocation = document.getElementById("expiredLocation");
var expiredExpire = document.getElementById("expiredExpire");
var list = document.getElementById("list");
var data;
var dates = [];
function clearNew() {
    newTitle.value = "";
    newDate.value = "";
    newDuration.value = "";
    newExpire.value = "";
    newTime.value = "";
    newLocation.value = "";
}
function clearAppointment() {
    appointmentName.value = "";
    appointmentTime.value = "";
    appointmentComment.value = "";
    var options = appointmentDate.querySelectorAll("option");
    for (var i = 1; i < options.length; i++) {
        appointmentDate.removeChild(options[i]);
    }
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
            li.setAttribute("data-bs-target", "#expiredModal");
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
        .then(function (fetchedData) {
        appendAppointments(fetchedData);
        data = fetchedData;
    })
        .catch(function (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}
function sendDataAppo(url) {
    var datesString = dates.join(",");
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "input1=".concat(encodeURIComponent(newTitle.value), "&input2=").concat(encodeURIComponent(newExpire.value), "&input3=").concat(encodeURIComponent(newTime.value), "&input4=").concat(encodeURIComponent(newDuration.value), "&input5=").concat(encodeURIComponent(newLocation.value), "&input6=").concat(encodeURIComponent(datesString))
    })
        .then(function (response) { return response.text(); })
        .then(function (data) {
        console.log('Server Response:', data);
    })
        .catch(function (error) {
        console.error('Error sending data:', error);
    });
}
function sendDataVote(url) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "input1=".concat(encodeURIComponent(appointmentName.value), "&input2=").concat(encodeURIComponent(appointmentDate.value), "&input3=").concat(encodeURIComponent(appointmentTime.value), "&input4=").concat(encodeURIComponent(appointmentComment.value), "&input5=").concat(encodeURIComponent(appointmentID))
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
    window.location.reload();
}
function canSave() {
    return newTitle.value.trim() !== "" &&
        newExpire.value.trim() !== "" &&
        newTime.value.trim() !== "" &&
        newDuration.value.trim() !== "" &&
        newLocation.value.trim() !== "";
}
function canSaveAppointment() {
    return appointmentName.value.trim() !== "" &&
        appointmentDate.value.trim() !== "" &&
        appointmentTime.value.trim() !== "" &&
        appointmentComment.value.trim() !== "";
}
function generateAppointmentOptions(fetchedData, id) {
    for (var i = 0; i < fetchedData.length; i++) {
        if (fetchedData[i].isOption == 1) {
            if (fetchedData[i].appointment == data[id].Appo_ID) {
                var option = document.createElement("option");
                option.setAttribute("value", i.toString());
                option.innerHTML = fetchedData[i].date;
                appointmentDate.appendChild(option);
            }
        }
    }
}
function loadExpireModal(id) {
    expiredTitle.innerHTML = data[id].title;
    expiredDuration.value = data[id].duration;
    expiredLocation.value = data[id].location;
    expiredExpire.value = data[id].date;
}
function loadVoteModal(id) {
    appointmentTitle.innerHTML = data[id].title;
    appointmentDuration.value = data[id].duration;
    appointmentLocation.value = data[id].location;
    appointmentExpire.value = data[id].expireDate;
    appointmentID = data[id].Appo_ID;
    fetch("../backend/JSON/Date.json")
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
    })
        .then(function (fetchedData) {
        generateAppointmentOptions(fetchedData, id);
    })
        .catch(function (error) {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}
appointmentClose === null || appointmentClose === void 0 ? void 0 : appointmentClose.addEventListener('click', function () {
    clearAppointment();
});
appointmentSave === null || appointmentSave === void 0 ? void 0 : appointmentSave.addEventListener('click', function () {
    sendDataVote('../backend/logic/votecreation.php')
        .then(function () {
        clearNew();
    })
        .catch(function (error) {
        console.error('Error sending data:', error);
    });
    clearAppointment();
});
newSave === null || newSave === void 0 ? void 0 : newSave.addEventListener('click', function () {
    if (canSave()) {
        sendDataAppo('../backend/logic/appocreation.php')
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
addDate === null || addDate === void 0 ? void 0 : addDate.addEventListener("click", function () {
    if (newDate.value != "") {
        dates.push(newDate.value);
    }
    console.log(dates);
    newDate.value = "";
});
list === null || list === void 0 ? void 0 : list.addEventListener("click", function (event) {
    var target = event.target;
    var li = target;
    while (li && li.nodeName !== 'LI') {
        li = li.parentNode;
    }
    if (!li)
        return;
    var id = li.getAttribute('id');
    if (id) {
        if (data[parseInt(id)].expired == 1)
            loadExpireModal(parseInt(id));
        else
            loadVoteModal(parseInt(id));
    }
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
