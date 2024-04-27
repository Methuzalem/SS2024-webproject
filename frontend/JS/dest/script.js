"use strict";
var modal = document.getElementById("newAppointmentModal");
var btn = document.getElementById("newAppointment");
var cls = document.getElementById("close");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function (e) {
    console.log("Modal Open");
    modal === null || modal === void 0 ? void 0 : modal.setAttribute("style", "display:block");
});
cls === null || cls === void 0 ? void 0 : cls.addEventListener("click", function (e) {
    console.log("Modal Close");
    modal === null || modal === void 0 ? void 0 : modal.setAttribute("style", "display:none");
});
