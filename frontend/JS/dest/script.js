var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function fetchexpireDates(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, events, expireDates, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    events = _a.sent();
                    expireDates = events.map(function (event) {
                        return { Appo_ID: event.Appo_ID, expireDate: event.expireDate };
                    });
                    console.log(expireDates); // Dies zeigt das Array der expireDates im Konsolenlog an
                    return [2 /*return*/, expireDates];
                case 3:
                    error_1 = _a.sent();
                    console.error('Fehler beim Laden oder Verarbeiten der Daten:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function compareDatesWithCurrent() {
    return __awaiter(this, void 0, void 0, function () {
        var expireDates, today_1, pastDates, formData_1, response, responseText, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetchexpireDates("../backend/JSON/Appointments.json")];
                case 1:
                    expireDates = _a.sent();
                    today_1 = new Date();
                    today_1.setHours(0, 0, 0, 0); // Zeit auf Mitternacht setzen, um nur das Datum zu vergleichen
                    pastDates = expireDates.filter(function (date) {
                        var compareDate = new Date(date.expireDate);
                        return compareDate < today_1;
                    });
                    formData_1 = new FormData();
                    pastDates.forEach(function (date) {
                        formData_1.append('appoIDs[]', date.Appo_ID.toString()); // Umwandlung der ID in einen String
                        formData_1.append('expireDates[]', date.expireDate); // Datum ist bereits ein String
                    });
                    return [4 /*yield*/, fetch('../backend/logic/expire.php', {
                            method: 'POST',
                            body: formData_1
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    responseText = _a.sent();
                    console.log('Response from server:', responseText);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error in comparing dates or sending data:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
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
    var selectedIndex = appointmentDate.selectedIndex;
    var selectedOption = appointmentDate.options[selectedIndex];
    var selectedText = selectedOption.textContent;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "input1=".concat(encodeURIComponent(appointmentName.value), "&input2=").concat(encodeURIComponent(selectedText), "&input3=").concat(encodeURIComponent(appointmentTime.value), "&input4=").concat(encodeURIComponent(appointmentComment.value), "&input5=").concat(encodeURIComponent(appointmentID))
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
                option.setAttribute("id", i.toString());
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
    expiredExpire.value = data[id].expireDate;
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
    compareDatesWithCurrent();
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
