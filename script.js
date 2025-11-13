// ✅ Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const studentRef = db.ref("students");

// ✅ Handle form submit
document.getElementById("StudentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("InputEmail").value;
  const rollno = document.getElementById("rollNo").value;

  const newStudent = studentRef.push();
  newStudent.set({ name, email, rollno });

  document.getElementById("StudentForm").reset();
});

// ✅ Fetch and display data
studentRef.on("value", (snapshot) => {
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const student = childSnapshot.val();
    const studentId = childSnapshot.key;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.rollno}</td>
      <td>
        <button class="edit-btn btn btn-sm btn-warning" data-id="${studentId}">Edit</button>
        <button class="delete-btn btn btn-sm btn-danger" data-id="${studentId}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
});

// ✅ Delete student
document.getElementById("studentTableBody").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const studentId = e.target.getAttribute("data-id");
    db.ref("students/" + studentId).remove();
  }
});

// ✅ Search student
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll("#studentTableBody tr");

  rows.forEach(row => {
    const name = row.children[0].textContent.toLowerCase();
    const email = row.children[1].textContent.toLowerCase();
    row.style.display = (name.includes(query) || email.includes(query)) ? "" : "none";
  });
});