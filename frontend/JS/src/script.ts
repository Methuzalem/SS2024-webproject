//Declaration of buttons used in modal windows
const newClose = document.getElementById("newClose") as HTMLInputElement;
const newSave  = document.getElementById("newSave")  as HTMLInputElement;
const addDate  = document.getElementById("addDate")  as HTMLInputElement;
const appointmentClose = document.getElementById("appointmentClose") as HTMLInputElement;
const appointmentSave  = document.getElementById("appointmentSave")  as HTMLInputElement;

//declaration of input elements used in creating a new appointment
const newTitle    = document.getElementById("newTitle")    as HTMLInputElement;
const newDate     = document.getElementById("newDate")     as HTMLInputElement;
const newExpire   = document.getElementById("newExpire")   as HTMLInputElement;
const newTime     = document.getElementById("newTime")     as HTMLInputElement;
const newDuration = document.getElementById("newDuration") as HTMLInputElement;
const newLocation = document.getElementById("newLocation") as HTMLInputElement;

//declaration of input elements used in viewing the detailed version of an appointment
let appointmentID = "";
const appointmentTitle    = document.getElementById("appointmentTitle")    as HTMLInputElement;
const appointmentDuration = document.getElementById("appointmentDuration") as HTMLInputElement;
const appointmentLocation = document.getElementById("appointmentLocation") as HTMLInputElement;
const appointmentExpire   = document.getElementById("appointmentExpire")   as HTMLInputElement;
const appointmentName     = document.getElementById("appointmentName")     as HTMLInputElement;
const appointmentDate     = document.getElementById("appointmentDate")     as HTMLInputElement;
const appointmentTime     = document.getElementById("appointmentTime")     as HTMLInputElement;
const appointmentComment  = document.getElementById("appointmentComment")  as HTMLInputElement;

//declaration of input elements used in the expired version of appointments
const expiredTitle    = document.getElementById("expiredTitle") as HTMLInputElement;
const expiredDuration = document.getElementById("expiredDuration") as HTMLInputElement;
const expiredLocation = document.getElementById("expiredLocation") as HTMLInputElement;
const expiredExpire   = document.getElementById("expiredExpire") as HTMLInputElement;

const list = document.getElementById("list") as HTMLDataListElement;

var data : any[];
var dates : string[] = [];

//removes all elements from the appointment list
function clearList()
{
    let elements = list.querySelectorAll("li");
    for(let i = 0; i < elements.length; i++)
    {
        list.removeChild(elements[i]);
    }
}

//clears all input elements for creating a new appointment
function clearNew()
{
    newTitle.value = "";
    newDate.value = "";
    newDuration.value = "";
    newExpire.value = "";
    newTime.value = "";
    newLocation.value = "";
}

//clears all elements for viewing the detailed version
function clearAppointment()
{
    appointmentName.value = "";
    appointmentTime.value = "";
    appointmentComment.value = "";
    //clears all generated options for the selector element
    const options = appointmentDate.querySelectorAll("option");
    for(let i = 1; i < options.length; i++)
    {
        appointmentDate.removeChild(options[i]);
    }
}

//generates appointment list elements from json data
function appendAppointments(data: any)
{
    clearList();
    for(let i = 0; i < data.length; i++)
    {
        //creates a list element with let to clear it once for scope reaches end
        let li = document.createElement("li");
        li.setAttribute("id", i.toString());

        for(let j = 0; j < 2; j++)
        {
            //every list elemented seperated into two divs with an input tag each
            let div = document.createElement("div");
            let input = document.createElement("input");
            input.setAttribute("class", "form-control-plaintext");
            input.setAttribute("type", "text");
            input.readOnly = true;

            switch(j)
            {
                case 0:
                    //first input element holds the title of the appointment
                    div.setAttribute("class", "appointmentTitle");
                    input.value = data[i].title;
                    break;
                case 1:
                    //second one holds the duration of the appointment
                    input.value = "Duration: " + data[i].duration + " hours";
            }

            div.appendChild(input);
            li.appendChild(div);
        }

        //each list element is set to open a detail modal window
        //when appointment is not expired the version in which can be voted is called
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

//function fetches json data from appointments.json and saves it to global data variable
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

//function sends post method to service handler.php to save new appointments
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

//function sends post method to service handler.php to save votes for appointments
function sendDataVote(url: string)
{
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `input1=${encodeURIComponent(appointmentName.value)}&input2=${encodeURIComponent(appointmentDate.value)}&input3=${encodeURIComponent(appointmentTime.value)}&input4=${encodeURIComponent(appointmentComment.value)}&input5=${encodeURIComponent(appointmentID)}`
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

//checks if all input elements are filled when creating a new appointment
function canSave(): boolean {
    return newTitle.value.trim() !== "" &&
           newExpire.value.trim() !== "" &&
           newTime.value.trim() !== "" &&
           newDuration.value.trim() !== "" &&
           newLocation.value.trim() !== "";
}

//checks if all input elements are filled when voting for appointment
function canSaveAppointment(): boolean {
    return appointmentName.value.trim() !== "" &&
           appointmentDate.value.trim() !== "" &&
           appointmentTime.value.trim() !== "" &&
           appointmentComment.value.trim() !== "";
}

//generates date options from json data
function generateAppointmentOptions(fetchedData: any[], id: number)
{
    //for each date entry check if appointment keys match and is an option
    for(let i = 0; i < fetchedData.length; i++)
    {
        if(fetchedData[i].isOption == 1)
        {
            if(fetchedData[i].appointment == data[id].Appo_ID)
            {
                //create option with inner text of date and append to select element
                let option = document.createElement("option");
                option.setAttribute("value", i.toString());
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
    expiredExpire.value    = data[id].date;
}

function loadVoteModal(id: number)
{
    appointmentTitle.innerHTML = data[id].title;
    appointmentDuration.value  = data[id].duration;
    appointmentLocation.value  = data[id].location;
    appointmentExpire.value    = data[id].expireDate;

    appointmentID = data[id].Appo_ID;

    //appointment detail modal holds select element for which options need to be dynamically generated
    //passes date.json data to generateAppointmentOptions
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

//sends appointment vote data to database when save button is clicked
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

//sends new appointment data to database when save button is clicked
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

//saves selected dates to array and resets input element
//that way infinite date options for single appointment can be selected
addDate?.addEventListener("click", function(){
    if(newDate.value != "")
    {
        dates.push(newDate.value);
    }
    console.log(dates);
    newDate.value = "";
})

//function gets id of clicked list element when list is clicked
list?.addEventListener("click", function(event){
    const target = event.target as HTMLElement;
    let li = target;
    //counts to the highest clicked list element
    while(li && li.nodeName !== 'LI')
    {
        li = li.parentNode as HTMLElement;
    }
    if(!li) return;
    //gets id of clicked list element
    const id = li.getAttribute('id');
    if(id)
    {
        if(data[parseInt(id)].expired == 1)
            loadExpireModal(parseInt(id));
        else
            loadVoteModal(parseInt(id));
    }
})

//loads list from appointment.json when page is loaded
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
            clearAppointment();
            if(modalIsClosedByUser) {
                clearNew();
            }
            modalIsClosedByUser = true;
        });
    }
});