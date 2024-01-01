const getStudentInfo = () => {
  let studentId = document.getElementById("student-id").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let math = document.getElementById("math").value;
  let physic = document.getElementById("physic").value;
  let chemical = document.getElementById("chemical").value;
  let newStudent = new Student(studentId, name, email, math, physic, chemical)

  return newStudent;
}

const renderStudents = (students) => {
  let contentHTML = "";
  for (let i = 0; i < students.length; i++) {
    let currentStudent = students[i];
    let contentTr = `
      <tr>
        <td>${currentStudent.id}</td>
        <td>${currentStudent.name}</td>
        <td>${currentStudent.email}</td>
        <td>${(currentStudent.math * 1 + currentStudent.physic * 1 + currentStudent.chemical * 1) / 3}</td>
        <td>
          <button id="edit-btn" onclick="editStudent(${i})" >Edit</button> 
          <button id="delete-btn" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
    
    contentHTML += contentTr;
  }
  document.getElementById("table-body").innerHTML = contentHTML;


  // CREATE EDIT - BUTTON
  let editButtons = document.getElementsByClassName("edit-btn");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function () {
      editStudent(i);
    });
  }
}


//  EDIT 
const editStudent = (index) => {
  let student = students[index];
  document.getElementById("student-id").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("math").value = student.math;
  document.getElementById("physic").value = student.physic;
  document.getElementById("chemical").value = student.chemical;
  students.splice(index, 1);
  renderStudents();
}


// DELETE
const deleteStudent = (index) => {
  students.splice(index, 1);
  renderStudents(students);
}


const setLocalStudents = (students) => {
  let jsonStudents = JSON.stringify(students);
  localStorage.setItem(STUDENT_LOCAL_STORAGE, jsonStudents)
}

let getLocalStudents = () => {
  let jsonStudents = localStorage.getItem(STUDENT_LOCAL_STORAGE);
  return JSON.parse(jsonStudents)
}

