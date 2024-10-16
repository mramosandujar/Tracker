document.addEventListener("DOMContentLoaded", function () {
    createCalendar();
});

function createCalendar() {
    const calendarDiv = document.getElementById("calendar");
    for (let i = 1; i <= 31; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerText = i;
        dayDiv.addEventListener("click", () => openInputForm(i));
        calendarDiv.appendChild(dayDiv);
    }
}

function openInputForm(day) {
    document.getElementById("selected-date").innerText = `Day ${day}`;
    document.getElementById("input-form").classList.remove("hidden");
}

function savePillInfo() {
    const selectedDate = document.getElementById("selected-date").innerText;
    const pillName = document.getElementById("pill-input").value;

    if (pillName) {
        alert(`${pillName} saved for ${selectedDate}`);
        document.getElementById("pill-input").value = "";
        document.getElementById("input-form").classList.add("hidden");
    } else {
        alert("Please enter the pill name.");
    }
}
