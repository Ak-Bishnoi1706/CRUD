document.getElementById("StudentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stops Form from reloading itself

    // Taking data from FORM
    const name = document.getElementById("name").value;
    const email = document.getElementById("InputEmail").value;
    const rollno = document.getElementById("rollNo").value;

  // Send data to backend
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, rollno })
  })
  .then(res => res.text())
  .then(msg => console.log(" Server response:", msg))
  .catch(err => console.error("❌ Error sending data:", err));

  //Inserting data to table row
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${name}</td>
  <td>${email}</td>
  <td>${rollno}</td>
  <td>
    <button class="edit-btn btn btn-sm btn-warning">Edit</button>
    <button class="delete-btn btn btn-sm btn-danger">Delete</button>
  </td>`;

document.getElementById("studentTableBody").appendChild(row);

// Edit button
    row.querySelector(".edit-btn").addEventListener("click", function () {
        const cells = row.querySelectorAll("td");
        document.getElementById("name").value = cells[0].textContent;
        document.getElementById("InputEmail").value = cells[1].textContent;
        document.getElementById("rollNo").value = cells[2].textContent;
        row.remove(); // Optional: remove row while editing
    });

// Delete button with backend call
    row.querySelector(".delete-btn").addEventListener("click", async function () {
        const studentId = row.getAttribute("data-id");
        await fetch(`/api/student/${studentId}`, { method: "DELETE" });
        row.remove(); // Remove from table after successful delete
    });

// Form reset
    document.getElementById("StudentForm").reset();
});

// search button
document.getElementById("searchInput").addEventListener("click", function (e) {
      e.preventDefault();

  const query = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTableBody tr");

  rows.forEach(row => {
    const name = row.children[0].textContent.toLowerCase();
    const email = row.children[1].textContent.toLowerCase();

    row.style.display = (name.includes(query) || email.includes(query)) ? "" : "none";
  });
});