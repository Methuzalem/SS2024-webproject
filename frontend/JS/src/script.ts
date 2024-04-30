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

//create JSON-files on load
document.addEventListener('DOMContentLoaded', function () {
    fetch('../backend/servicehandler.php');
    fetchData();
});

function clearNew()
{
    newTitle.value = "";
    newDuration.value = "";
    newDate.value = "";
}

function fetchData()
{
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    const url: string = ".../backend/JSON/Appointments.json";

    xhr.onreadystatechange = function()
    {
        console.log();
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
        else
        {
            console.error("Error loading JSON file");
        }
    }
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