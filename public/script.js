// script.js

document.addEventListener("DOMContentLoaded", function () {
    createCalendar();
});

function createCalendar() {
    const calendarDiv = document.getElementById("calendar");
    for (let i = 1; i <= 31; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.setAttribute("data-day", i); // Add data-day attribute
        dayDiv.innerText = i;
        dayDiv.addEventListener("click", () => openInputForm(i));
        calendarDiv.appendChild(dayDiv);
    }
}


function openInputForm(day) {
    document.getElementById("selected-date").innerText = `Day ${day}`;
    document.getElementById("input-form").classList.remove("hidden");
}
async function savePillInfo() {
    const pillName = document.getElementById("pill-input").value;
    const selectedDate = document.getElementById("selected-date").innerText;

    if (pillName) {
        try {
            console.log("Attempting to save pill:", { selectedDate, pillName });

            const response = await fetch('http://localhost:3000/save-pill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: selectedDate, pillName: pillName })
            });

            const data = await response.text();
            alert(data);

            // Adding pill icon to the calendar after successful save
            console.log("Adding pill icon to calendar...");
            const dayNumber = selectedDate.split(" ")[1]; // Extract day number from "Day X"
            const dayDiv = document.querySelector(`#calendar .day[data-day='${dayNumber}']`);

            if (dayDiv) {
                // Add pill icon only if it does not already exist for that day
                if (!dayDiv.querySelector('.pill')) {
                    const pillDiv = document.createElement("div");
                    pillDiv.className = "pill";
                    dayDiv.appendChild(pillDiv);
                }
            } else {
                console.error("Day div not found!");
            }

            // Hide input form after saving
            document.getElementById("input-form").classList.add("hidden");

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save pill information.');
        }
    } else {
        alert("Please enter the pill name.");
    }
}

