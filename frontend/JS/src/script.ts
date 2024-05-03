const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;
const addDate  = document.getElementById("addDate")  as HTMLInputElement;

const appointmentClose = document.getElementById("appointmentClose") as HTMLInputElement;
const appointmentSave  = document.getElementById("appointmentSave")  as HTMLInputElement;

const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newDate     = document.getElementById("newDate")     as HTMLInputElement;
const newExpire   = document.getElementById("newExpire")   as HTMLInputElement;
const newTime     = document.getElementById("newTime")     as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newLocation = document.getElementById("newLocation") as HTMLInputElement;

let appointmentID = "";
const appointmentTitle    = document.getElementById("appointmentTitle")    as HTMLInputElement;
const appointmentDuration = document.getElementById("appointmentDuration") as HTMLInputElement;
const appointmentLocation = document.getElementById("appointmentLocation") as HTMLInputElement;
const appointmentExpire   = document.getElementById("appointmentExpire")   as HTMLInputElement;
const appointmentName     = document.getElementById("appointmentName")     as HTMLInputElement;
const appointmentDate     = document.getElementById("appointmentDate")     as HTMLSelectElement;
const appointmentTime     = document.getElementById("appointmentTime")     as HTMLInputElement;
const appointmentComment  = document.getElementById("appointmentComment")  as HTMLInputElement;

const expiredTitle    = document.getElementById("expiredTitle") as HTMLInputElement;
const expiredDuration = document.getElementById("expiredDuration") as HTMLInputElement;
const expiredLocation = document.getElementById("expiredLocation") as HTMLInputElement;
const expiredExpire   = document.getElementById("expiredExpire") as HTMLInputElement;

const list = document.getElementById("list") as HTMLDataListElement;

var data : any[];
var dates : string[] = [];

function clearList()
{
    let elements = list.querySelectorAll("li");
    for(let i = 0; i < elements.length; i++)
    {
        list.removeChild(elements[i]);
    }
}

function clearNew()
{
    newTitle.value = "";
    newDate.value = "";
    newDuration.value = "";
    newExpire.value = "";
    newTime.value = "";
    newLocation.value = "";
}

function clearAppointment()
{
    appointmentName.value = "";
    appointmentTime.value = "";
    appointmentComment.value = "";
    const options = appointmentDate.querySelectorAll("option");
    for(let i = 1; i < options.length; i++)
    {
        appointmentDate.removeChild(options[i]);
    }
}

function appendAppointments(data: any)
{
    clearList();
    for(let i = 0; i < data.length; i++)
    {
        let li = document.createElement("li");
        li.setAttribute("id", i.toString());

        for(let j = 0; j < 2; j++)
        {
            let div = document.createElement("div");

            let input = document.createElement("input");
            input.setAttribute("class", "form-control-plaintext");
            input.setAttribute("type", "text");
            input.readOnly = true;

            switch(j)
            {
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
        
        let temp = new Date();
        console.log(temp.toISOString().split('T')[0]);

        li.setAttribute("data-bs-toggle", "modal");
        li.setAttribute("data-bs-target", "#appointmentModal");
        if(data[i].expired == 0)
        {
            li.setAttribute("class", "list-group-item border-dark")
        }
        else
        {
            li.setAttribute("class", "list-group-item border-dark bg-secondary");
            li.setAttribute("data-bs-target", "#expiredModal");
        }

        list.appendChild(li);
    }
}

function fetchData(url: string) : any
{
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
    })
    .then(fetchedData => {
        appendAppointments(fetchedData);
        data = fetchedData;
    })
    .catch(error => {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}

async function fetchexpireDates(url: string)
{
    try {
        const response = await fetch(url);
        const events = await response.json() as {Appo_ID: number, expireDate: string}[];
        const expireDates = events.map(event => {
            return { Appo_ID: event.Appo_ID, expireDate: event.expireDate };
        });

        console.log(expireDates); // Dies zeigt das Array der expireDates im Konsolenlog an
        return expireDates;

    } catch (error) {
        console.error('Fehler beim Laden oder Verarbeiten der Daten:', error);
        return [];
    }
}

async function compareDatesWithCurrent() {
    try {
        let expireDates = await fetchexpireDates("../backend/JSON/Appointments.json");

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zeit auf Mitternacht setzen, um nur das Datum zu vergleichen

        const pastDates = expireDates.filter(date => {
            const compareDate = new Date(date.expireDate);
            return compareDate < today;
        });

        // Vorbereiten der Daten zum Senden
        const formData = new FormData();
        pastDates.forEach(date => {
            formData.append('appoIDs[]', date.Appo_ID.toString()); // Umwandlung der ID in einen String
            formData.append('expireDates[]', date.expireDate); // Datum ist bereits ein String
        });

        // Senden der Daten an das PHP-Skript
        const response = await fetch('../backend/logic/expire.php', {
            method: 'POST',
            body: formData
        });

        const responseText = await response.text(); // Nehmen Sie response.json() für JSON-Antwort
        console.log('Response from server:', responseText);
    } catch (error) {
        console.error('Error in comparing dates or sending data:', error);
    }
}



function sendDataAppo(url: string)
{
    var datesString = dates.join(",");
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `input1=${encodeURIComponent(newTitle.value)}&input2=${encodeURIComponent(newExpire.value)}&input3=${encodeURIComponent(newTime.value)}&input4=${encodeURIComponent(newDuration.value)}&input5=${encodeURIComponent(newLocation.value)}&input6=${encodeURIComponent(datesString)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Server Response:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}

function sendDataVote(url: string)
{

    const selectedIndex = appointmentDate.selectedIndex;
    const selectedOption = appointmentDate.options[selectedIndex]; 
    const selectedText : any = selectedOption.textContent;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `input1=${encodeURIComponent(appointmentName.value)}&input2=${encodeURIComponent(selectedText)}&input3=${encodeURIComponent(appointmentTime.value)}&input4=${encodeURIComponent(appointmentComment.value)}&input5=${encodeURIComponent(appointmentID)}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Server Response:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}

newClose?.addEventListener("click", () => {
    clearNew();
})

function refreshPage(): void {
    window.location.reload();
}

function canSave(): boolean {
    return newTitle.value.trim() !== "" &&
           newExpire.value.trim() !== "" &&
           newTime.value.trim() !== "" &&
           newDuration.value.trim() !== "" &&
           newLocation.value.trim() !== "";
}

function canSaveAppointment(): boolean {
    return appointmentName.value.trim() !== "" &&
           appointmentDate.value.trim() !== "" &&
           appointmentTime.value.trim() !== "" &&
           appointmentComment.value.trim() !== "";
}

function generateAppointmentOptions(fetchedData: any[], id: number)
{
    for(let i = 0; i < fetchedData.length; i++)
    {
        if(fetchedData[i].isOption == 1)
        {
            if(fetchedData[i].appointment == data[id].Appo_ID)
            {
                let option = document.createElement("option");
                option.setAttribute("value", i.toString());
                option.setAttribute("id", i.toString());
                option.innerHTML = fetchedData[i].date;
                appointmentDate.appendChild(option);
            }
        }
    }
}

function loadExpireModal(id: number)
{
    expiredTitle.innerHTML = data[id].title;
    expiredDuration.value  = data[id].duration;
    expiredLocation.value  = data[id].location;
    expiredExpire.value    = data[id].expireDate;
}

function loadVoteModal(id: number)
{
    appointmentTitle.innerHTML = data[id].title;
    appointmentDuration.value  = data[id].duration;
    appointmentLocation.value  = data[id].location;
    appointmentExpire.value    = data[id].expireDate;

    appointmentID = data[id].Appo_ID;

    fetch("../backend/JSON/Date.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
    })
    .then(fetchedData => {
        generateAppointmentOptions(fetchedData, id);
    })
    .catch(error => {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}

appointmentClose?.addEventListener('click', () => {
    clearAppointment();
})

appointmentSave?.addEventListener('click', () => {
    sendDataVote('../backend/logic/votecreation.php')
        .then(() => {
            clearNew();
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    clearAppointment();
})

newSave?.addEventListener('click', () => {
    if (canSave()) {
        sendDataAppo('../backend/logic/appocreation.php')
            .then(() => {
                clearNew();
                refreshPage(); 
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    } else {
        alert('Please fill out all fields before saving!')
    }
})

addDate?.addEventListener("click", function(){
    if(newDate.value != "")
    {
        dates.push(newDate.value);
    }
    console.log(dates);
    newDate.value = "";
})

list?.addEventListener("click", function(event){
    const target = event.target as HTMLElement;
    let li = target;
    while(li && li.nodeName !== 'LI')
    {
        li = li.parentNode as HTMLElement;
    }
    if(!li) return;
    const id = li.getAttribute('id');
    if(id)
    {
        if(data[parseInt(id)].expired == 1)
            loadExpireModal(parseInt(id));
        else
            loadVoteModal(parseInt(id));
    }
})

document.addEventListener('DOMContentLoaded', function (){ 
    compareDatesWithCurrent();
    fetch('../backend/servicehandler.php')
        .then(() => {
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

    if(newAppointmentModal){
        newAppointmentModal.addEventListener('hidden.bs.modal', function () {
            if (modalIsClosedByUser) {
                clearNew();
            }
            modalIsClosedByUser = true; 
        });
    }
});