const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;

const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newDate     = document.getElementById("newDate")     as HTMLInputElement;
const newTime     = document.getElementById("newTime")     as HTMLInputElement;
const newLocation = document.getElementById("newLocation") as HTMLInputElement;

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
    newTime.value = "";
    newLocation.value = "";
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



document.addEventListener('DOMContentLoaded', function (){ 
    fetch('../backend/servicehandler.php');
    fetchData("../backend/JSON/Appointments.json");

    const saveButton = document.getElementById('newSave') as HTMLButtonElement;

    saveButton.addEventListener('click', () => {
        let input1 = (document.getElementById('newTitle') as HTMLInputElement).value;
        const input2 = (document.getElementById('newDate') as HTMLInputElement).value;
        const input3 = (document.getElementById('newTime') as HTMLInputElement).value;
        const input4 = (document.getElementById('newDuration') as HTMLInputElement).value;
        const input5 = (document.getElementById('newLocation') as HTMLInputElement).value;

        console.log('Input 1:', input1);
        console.log('Input 2:', input2);
        console.log('Input 3:', input3);
        console.log('Input 4:', input4);
        console.log('Input 5:', input5);
  
        // call to backend
        fetch('../backend/logic/appocreation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `input1=${encodeURIComponent(input1)}&input2=${encodeURIComponent(input2)}&input3=${encodeURIComponent(input3)}&input4=${encodeURIComponent(input4)}&input5=${encodeURIComponent(input5)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log('Server Response:', data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
        clearNew();
    });
});