const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;

const appointmentClose = document.getElementById("appointmentClose") as HTMLInputElement;
const appointmentSave  = document.getElementById("appointmentSave")  as HTMLInputElement;

const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newExpire   = document.getElementById("newExpire")     as HTMLInputElement;
const newTime     = document.getElementById("newTime")     as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newLocation = document.getElementById("newLocation") as HTMLInputElement;

let appointmentID = "";
const appointmentTitle    = document.getElementById("appointmentTitle")    as HTMLInputElement;
const appointmentDuration = document.getElementById("appointmentDuration") as HTMLInputElement;
const appointmentLocation = document.getElementById("appointmentLocation") as HTMLInputElement;
const appointmentExpire   = document.getElementById("appointmentExpire")   as HTMLInputElement;
const appointmentName     = document.getElementById("appointmentName")     as HTMLInputElement;
const appointmentDate     = document.getElementById("appointmentDate")     as HTMLInputElement;
const appointmentTime     = document.getElementById("appointmentTime")     as HTMLInputElement;
const appointmentComment  = document.getElementById("appointmentComment")  as HTMLInputElement;

const expiredTitle    = document.getElementById("expiredTitle") as HTMLInputElement;
const expiredDuration = document.getElementById("expiredTitle") as HTMLInputElement;
const expiredLocation = document.getElementById("expiredTitle") as HTMLInputElement;
const expiredExpire   = document.getElementById("expiredTitle") as HTMLInputElement;


const list = document.getElementById("list") as HTMLDataListElement;

var data : any[];

function clearNew()
{
    newTitle.value = "";
    newDuration.value = "";
    newExpire.value = "";
    newTime.value = "";
    newLocation.value = "";
}

function clearAppointment()
{
    appointmentName.value = "";
    appointmentDate.value = "";
    appointmentTime.value = "";
    appointmentComment.value = "";
}

function appendAppointments(data: any)
{
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

function sendDataAppo(url: string)
{
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `input1=${encodeURIComponent(newTitle.value)}&input2=${encodeURIComponent(newExpire.value)}&input3=${encodeURIComponent(newTime.value)}&input4=${encodeURIComponent(newDuration.value)}&input5=${encodeURIComponent(newLocation.value)}`
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
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `input1=${encodeURIComponent(appointmentName.value)}&input2=${encodeURIComponent(appointmentDate.value)}&input3=${encodeURIComponent(appointmentTime.value)}&input4=${encodeURIComponent(appointmentComment.value)}`
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

function loadExpireModal(id: number)
{
    expiredTitle.innerHTML = data[id].title;
    expiredDuration.value  = data[id].duration;
    expiredLocation.value  = data[id].location;
    expiredExpire.value    = data[id].date;
}

function loadVoteModal(id: number)
{
    appointmentTitle.innerHTML = data[id].title;
    appointmentDuration.value  = data[id].duration;
    appointmentLocation.value  = data[id].location;
    appointmentExpire.value    = data[id].date;

    appointmentID = data[id].Appo_ID;
    appointmentName.value 

    console.log(appointmentID);

    
    appointmentSave?.addEventListener('click', () => {
            sendDataVote('../backend/logic/votecreation.php')
                .then(() => {
                    clearNew();
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
    })
    /*
    send data with these four variables:
    appointmentName
    appointmentDate
    appointmentTime     
    appointmentComment
    */
}

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

<<<<<<< HEAD
=======
appointmentSave?.addEventListener('click', () => {
    if (canSaveAppointment()) {
        sendDataAppo('../backend/logic/appocreation.php')
            .then(() => {
                clearAppointment();
                refreshPage();
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    } else {
        alert('Please fill out all fields before saving!')
    }
})

appointmentClose?.addEventListener('click', () => {
    clearAppointment();
})

>>>>>>> 3d1599435629137e91599bfd955a7e86cc47ff2a
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