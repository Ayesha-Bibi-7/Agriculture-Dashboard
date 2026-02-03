// Statis Cards
const dashboardStats = {
  crops: 16,
  farms: 4,
  farmers: 20,
  yield: 1200
};
document.getElementById("statCrops").textContent = dashboardStats.crops;
document.getElementById("statFarms").textContent = dashboardStats.farms;
document.getElementById("statFarmers").textContent = dashboardStats.farmers;
document.getElementById("statYield").textContent = dashboardStats.yield;

// User Profile
const user = {
  name: "Gojo Satoru",
  role: "Member Of TJH",
  avatar: "Image/Gojo-Avatar.png"
};
document.getElementById("userName").textContent = user.name;
document.getElementById("userRole").textContent = user.role;
document.getElementById("userAvatar").src = user.avatar;


// Pie, Bar and Line Chart
document.addEventListener("DOMContentLoaded", function () {

  const labels = ["Wheat", "Rice", "Corn", "Sugarcane"];
  const values = [200, 300, 150, 400];
  const greenColors = ["#016f4c", "#2e8b57", "#4CAF50", "#81c784"];

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Crop Yield",
        data: values,
        backgroundColor: "#2e8b57"
      }]
    },
    options: commonOptions
  });

  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: greenColors
      }]
    },
    options: commonOptions
  });

  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Production Trend",
        data: values,
        borderColor: "#016f4c",
        backgroundColor: "rgba(1,111,76,0.1)",
        fill: true,
        tension: 0.4
      }]
    },
    options: commonOptions
  });

});

//Crop Table
var form = document.getElementById("myForm"),
    userName = document.getElementById("showName"),
    email = document.getElementById("showEmail"),
    role = document.getElementById("showRole"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modalTitle = document.querySelector("#userForm .modal-title");
    newUserBtn = document.querySelector(".newUser")
    
let getData = localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile"))
    : [];

let isEdit = false, editId;
showInfo();

function showInfo() {
    userInfo.innerHTML = "";

    getData.forEach((element, index) => {
        let createElement = `
        <tr class="employeeDetails">
            <td>${element.employeeName}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeeRole}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.employeeName}','${element.employeeEmail}','${element.employeeRole}')" data-bs-toggle="modal" data-bs-target="#readData">
                    <i class="bi bi-eye"></i>
                </button>

                <button class="btn btn-success" onclick="editInfo(${index})" data-bs-toggle="modal" data-bs-target="#userForm">
                    <i class="bi bi-pencil-square"></i>
                </button>

                <button class="btn btn-success" onclick="deleteInfo(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
        `;
        userInfo.innerHTML += createElement;
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (userName.value === "" || email.value === "" || role.value === "") {
        alert("All fields are required!");
        return;
    }

    const information = {
        employeeName: userName.value,
        employeeEmail: email.value,
        employeeRole: role.value,
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        getData[editId] = information;
        isEdit = false;
    }

    localStorage.setItem("userProfile", JSON.stringify(getData));

    form.reset();
    modalTitle.innerText = "Fill the Form";
    submitBtn.innerText = "Submit";

    showInfo();
});

function editInfo(index) {
    isEdit = true;
    editId = index;
    userName.value = getData[index].employeeName;
    email.value = getData[index].employeeEmail;
    role.value = getData[index].employeeRole;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update the Form";
}

function readInfo(name, email, role) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("role").value = role;
}

function deleteInfo(index) {
    if (confirm("Are you sure you want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});