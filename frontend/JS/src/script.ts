const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;

const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newDate     = document.getElementById("newDate")     as HTMLInputElement;

const listTitle    = document.getElementById("listTitle")    as HTMLInputElement;
const listDuration = document.getElementById("listDuration") as HTMLInputElement;
const listDate     = document.getElementById("listDate")     as HTMLInputElement;

const list = document.getElementById("list") as HTMLDataListElement;
const div  = document.createElement("div");

function clearNew()
{
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
}

function fetchData(url: string)
{
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}

function createNewAppointment() 
{
    clearNew();
}

newClose?.addEventListener("click", () => {
    clearNew();
})

newSave?.addEventListener("click", () => {
    createNewAppointment();
})

document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
    fetchData("../backend/JSON/Appointments.json");
});