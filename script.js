// Load all users or search results
async function loadUsers(query = "") {
  let url = "http://localhost:3000/users";
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url);
  const users = await response.json();

  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ""; // clear old rows

  users.forEach(user => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", user._id); // store MongoDB ID for delete
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.rollno}</td>
      <td>
        <button class="edit-btn btn btn-sm btn-warning">Edit</button>
        <button class="delete-btn btn btn-sm btn-danger">Delete</button>
      </td>`;
    tableBody.appendChild(row);

    // Edit button
    row.querySelector(".edit-btn").addEventListener("click", function () {
      const cells = row.querySelectorAll("td");
      document.getElementById("name").value = cells[0].textContent;
      document.getElementById("InputEmail").value = cells[1].textContent;
      document.getElementById("rollNo").value = cells[2].textContent;
      row.remove();
    });

    // Delete button
    row.querySelector(".delete-btn").addEventListener("click", async function () {
      const studentId = row.getAttribute("data-id");
      await fetch(`http://localhost:3000/users/${studentId}`, { method: "DELETE" });
      row.remove();
    });
  });
}

// Handle form submission
document.getElementById("StudentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("InputEmail").value;
  const rollno = document.getElementById("rollNo").value;

  const response = await fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, rollno })
  });

  const result = await response.json();
  alert(result.message);

  document.getElementById("StudentForm").reset();
  loadUsers(); // refresh table
});

// Search listener (outside submit)
document.getElementById("searchBox").addEventListener("input", function(e) {
  const query = e.target.value;
  loadUsers(query);
});

// Load table on page start
loadUsers();