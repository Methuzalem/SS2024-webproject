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

function fetchData()
{
    console.log("test");
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

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})