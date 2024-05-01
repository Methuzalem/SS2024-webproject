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
    fetch(url, {
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

newSave?.addEventListener('click', () => {
    sendData('../backend/logic/appocreation.php');
    clearNew();
    fetch('../backend/servicehandler.php', {
        method: "POST"
    });
    fetchData("../backend/JSON/Appointments.json");
});

document.addEventListener('DOMContentLoaded', function (){ 
    fetch('../backend/servicehandler.php');
    fetchData("../backend/JSON/Appointments.json");
});