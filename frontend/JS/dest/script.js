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
/*
function fetchData()
{
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    const url: string = "../backend/JSON/Appointments.json";

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE)
        {
            if (xhr.status === 200)
            {
                const jsonData: any = JSON.parse(xhr.responseText);
                console.log("Data received:", jsonData);
            }
            else
            {
                console.error("Error loading JSON file:", xhr.statusText);
            }
        }
    }

    xhr.open("GET", url, true);
    xhr.send;
}*/
function fetchAgain() {
    console.log("test");
    fetch("../backend/JSON/Appointments.json")
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
document.addEventListener("DOMContentLoaded", function () {
    //fetch("../backend/servicehandlder.php");
    fetchAgain();
});
