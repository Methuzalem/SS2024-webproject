const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;

const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newDate     = document.getElementById("newDate")     as HTMLInputElement;
const newTime     = document.getElementById("newTime")     as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newLocation = document.getElementById("newLocation") as HTMLInputElement;

const list = document.getElementById("list") as HTMLDataListElement;

function clearNew()
{
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
    newTime.value = "";
    newLocation.value = "";
}

function appendAppointments(data: any)
{
    for(let i = 0; i < data.length; i++)
    {
        let li = document.createElement("li");
        li.setAttribute("id", `${data[i].App_ID}`);
        li.setAttribute("class", "list-group-item border-dark")

        for(let j = 0; j < 3; j++)
        {
            let div   = document.createElement("div");
            if(j == 0) { div.setAttribute("class", "bg-dark text-white"); }
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.setAttribute("class", "form-control-plaintext");
            input.setAttribute("type", "text");
            input.readOnly = true;

            switch(j)
            {
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

            if(j == 1) { div.appendChild(label); }
            div.appendChild(input);
            li.appendChild(div);
        }
        list.appendChild(li);
    }
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
        appendAppointments(data);
    })
    .catch(error => {
        console.error("Fehler beim Laden der JSON-Datei:", error);
    });
}

function sendData(url: string)
{
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `input1=${encodeURIComponent(newTitle.value)}&input2=${encodeURIComponent(newDate.value)}&input3=${encodeURIComponent(newTime.value)}&input4=${encodeURIComponent(newDuration.value)}&input5=${encodeURIComponent(newLocation.value)}`
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
    window.location.href = window.location.pathname + window.location.search + '#';
    window.location.reload();
}

function canSave(): boolean {
    return newTitle.value.trim() !== "" &&
           newDate.value.trim() !== "" &&
           newTime.value.trim() !== "" &&
           newDuration.value.trim() !== "" &&
           newLocation.value.trim() !== "";
}

newSave?.addEventListener('click', () => {
    if (canSave()) {
        sendData('../backend/logic/appocreation.php')
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

document.addEventListener('DOMContentLoaded', function (){ 
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