const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;

const listTitle    = document.getElementById("listTitle")    as HTMLInputElement;
const listDuration = document.getElementById("listDuration") as HTMLInputElement;
const listDate     = document.getElementById("listDate")     as HTMLInputElement;

const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newDate     = document.getElementById("newDate")     as HTMLInputElement;

const list        = document.getElementById("list") as HTMLDataListElement;
const listElement = "<li class=\"list-group-item border-dark\" data-bs-toggle=\"modal\" data-bs-target=\"#appointmentModal\"></li>";

//create JSON-files on load
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
});

function clearNew()
{
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
}

function appendListElement()
{
    list.innerHTML = listElement;
}

function appendAppointmentData()
{
    
}

function createNewAppointment() 
{
    appendListElement();
    appendAppointmentData();
    clearNew();
}

newClose?.addEventListener("click", () => {
    clearNew();
})

newSave?.addEventListener("click", () => {
    createNewAppointment();
})