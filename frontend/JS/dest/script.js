"use strict";
//Declaration of buttons used in modal windows
var newClose = document.getElementById("newClose");
var newSave = document.getElementById("newSave");
var addDate = document.getElementById("addDate");
var appointmentClose = document.getElementById("appointmentClose");
var appointmentSave = document.getElementById("appointmentSave");
//declaration of input elements used in creating a new appointment
var newTitle = document.getElementById("newTitle");
var newDate = document.getElementById("newDate");
var newExpire = document.getElementById("newExpire");
var newTime = document.getElementById("newTime");
var newDuration = document.getElementById("newDuration");
var newLocation = document.getElementById("newLocation");
//declaration of input elements used in viewing the detailed version of an appointment
var appointmentID = "";
var appointmentTitle = document.getElementById("appointmentTitle");
var appointmentDuration = document.getElementById("appointmentDuration");
var appointmentLocation = document.getElementById("appointmentLocation");
var appointmentExpire = document.getElementById("appointmentExpire");
var appointmentName = document.getElementById("appointmentName");
var appointmentDate = document.getElementById("appointmentDate");
var appointmentTime = document.getElementById("appointmentTime");
var appointmentComment = document.getElementById("appointmentComment");
//declaration of input elements used in the expired version of appointments
var expiredTitle = document.getElementById("expiredTitle");
var expiredDuration = document.getElementById("expiredDuration");
var expiredLocation = document.getElementById("expiredLocation");
var expiredExpire = document.getElementById("expiredExpire");
var list = document.getElementById("list");
var data;
var dates = [];
//removes all elements from the appointment list
function clearList() {
    var elements = list.querySelectorAll("li");
    for (var i = 0; i < elements.length; i++) {
        list.removeChild(elements[i]);
    }
}
//clears all input elements for creating a new appointment
function clearNew() {
    newTitle.value = "";
    newDate.value = "";
    newDuration.value = "";
    newExpire.value = "";
    newTime.value = "";
    newLocation.value = "";
}
//clears all elements for viewing the detailed version
function clearAppointment() {
    appointmentName.value = "";
    appointmentTime.value = "";
    appointmentComment.value = "";
    //clears all generated options for the selector element
    var options = appointmentDate.querySelectorAll("option");
    for (var i = 1; i < options.length; i++) {
        appointmentDate.removeChild(options[i]);
    }
}
//generates appointment list elements from json data
function appendAppointments(data) {
    clearList();
    for (var i = 0; i < data.length; i++) {
        //creates a list element with let to clear it once for scope reaches end
        var li = document.createElement("li");
        li.setAttribute("id", i.toString());
        for (var j = 0; j < 2; j++) {
            //every list elemented seperated into two divs with an input tag each
            var div = document.createElement("div");
            var input = document.createElement("input");
            input.setAttribute("class", "form-control-plaintext");
            input.setAttribute("type", "text");
            input.readOnly = true;
            switch (j) {
                case 0:
                    //first input element holds the title of the appointment
                    div.setAttribute("class", "appointmentTitle");
                    input.value = data[i].title;
                    break;
                case 1:
                    //second one holds the duration of the appointment
                    input.value = "Duration: " + data[i].duration + " hours";
            }
            div.appendChild(input);
            li.appendChild(div);
        }
        //each list element is set to open a detail modal window
        //when appointment is not expired the version in which can be voted is called
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
//function fetches json data from appointments.json and saves it to global data variable
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
//function sends post method to service handler.php to save new appointments
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
//function sends post method to service handler.php to save votes for appointments
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
//checks if all input elements are filled when creating a new appointment
function canSave() {
    return newTitle.value.trim() !== "" &&
        newExpire.value.trim() !== "" &&
        newTime.value.trim() !== "" &&
        newDuration.value.trim() !== "" &&
        newLocation.value.trim() !== "";
}
//checks if all input elements are filled when voting for appointment
function canSaveAppointment() {
    return appointmentName.value.trim() !== "" &&
        appointmentDate.value.trim() !== "" &&
        appointmentTime.value.trim() !== "" &&
        appointmentComment.value.trim() !== "";
}
//generates date options from json data
function generateAppointmentOptions(fetchedData, id) {
    //for each date entry check if appointment keys match and is an option
    for (var i = 0; i < fetchedData.length; i++) {
        if (fetchedData[i].isOption == 1) {
            if (fetchedData[i].appointment == data[id].Appo_ID) {
                //create option with inner text of date and append to select element
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
    //appointment detail modal holds select element for which options need to be dynamically generated
    //passes date.json data to generateAppointmentOptions
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
//sends appointment vote data to database when save button is clicked
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
//sends new appointment data to database when save button is clicked
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
//saves selected dates to array and resets input element
//that way infinite date options for single appointment can be selected
addDate === null || addDate === void 0 ? void 0 : addDate.addEventListener("click", function () {
    if (newDate.value != "") {
        dates.push(newDate.value);
    }
    console.log(dates);
    newDate.value = "";
});
//function gets id of clicked list element when list is clicked
list === null || list === void 0 ? void 0 : list.addEventListener("click", function (event) {
    var target = event.target;
    var li = target;
    //counts to the highest clicked list element
    while (li && li.nodeName !== 'LI') {
        li = li.parentNode;
    }
    if (!li)
        return;
    //gets id of clicked list element
    var id = li.getAttribute('id');
    if (id) {
        if (data[parseInt(id)].expired == 1)
            loadExpireModal(parseInt(id));
        else
            loadVoteModal(parseInt(id));
    }
});
//loads list from appointment.json when page is loaded
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
            clearAppointment();
            if (modalIsClosedByUser) {
                clearNew();
            }
            modalIsClosedByUser = true;
        });
    }
});
