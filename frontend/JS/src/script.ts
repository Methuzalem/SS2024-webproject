const modal = document.getElementById("newAppointmentModal") as HTMLElement;
const btn   = document.getElementById("newAppointment")      as HTMLInputElement;
const cls   = document.getElementById("close")               as HTMLInputElement;

btn?.addEventListener("click", e => {
    console.log("Modal Open");
    modal?.setAttribute("style", "display:block");
})

cls?.addEventListener("click", e => {
    console.log("Modal Close");
    modal?.setAttribute("style", "display:none");
})
