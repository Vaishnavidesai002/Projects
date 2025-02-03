function getAppointments() {
    return JSON.parse(localStorage.getItem("appointments")) || [];
}
function saveAppointments(appointments) {
    localStorage.setItem("appointments", JSON.stringify(appointments));
}
function displayAppointments(appointments) {
    const container = document.getElementById("appointments");
    container.innerHTML = ""; 

    if (appointments.length === 0) {
        container.innerHTML = "<p>No appointments available.</p>";
        return;
    }

    appointments.forEach((app, index) => {
        container.innerHTML += `
            <div class="appointment">
                <p><strong>Name:</strong> ${app.name}</p>
                <p><strong>Date:</strong> ${app.date}</p>
                <p><strong>Description:</strong> ${app.description}</p>
                <button onclick="editAppointment(${index})">Edit</button>
                <button onclick="deleteAppointment(${index})">Delete</button>
            </div>`;
    });
}
function addAppointment() {
    const name = document.getElementById("customerName").value;
    const date = document.getElementById("appointmentDate").value;
    const description = document.getElementById("customerDescription").value;

    if (!name || !date || !description) {
        alert("All fields are required!");
        return;
    }

    const appointments = getAppointments();
    appointments.push({ name, date, description });
    saveAppointments(appointments);
    displayAppointments(appointments);
    document.getElementById("customerName").value = "";
    document.getElementById("appointmentDate").value = "";
    document.getElementById("customerDescription").value = "";
}
function deleteAppointment(index) {
    let appointments = getAppointments();
    appointments.splice(index, 1); 
    saveAppointments(appointments);
    displayAppointments(appointments);
}
function editAppointment(index) {
    let appointments = getAppointments();
    const app = appointments[index];

    document.getElementById("customerName").value = app.name;
    document.getElementById("appointmentDate").value = app.date;
    document.getElementById("customerDescription").value = app.description;

    deleteAppointment(index);
}

function filterAppointments() {
    const filterDate = document.getElementById("filterDate").value;
    const appointments = getAppointments();
    const filtered = appointments.filter(app => app.date === filterDate);

    document.getElementById("totalCount").innerText = `Total: ${filtered.length}`;
    displayAppointments(filtered);
}

window.onload = () => displayAppointments(getAppointments());

