let search = document.querySelector("#search");
let employeeContainer = document.querySelector("#employeeContainer");
let turnRotate = 1;
let employeeDisplay;

async function getEmployees() {
  const res = await fetch("/company/employee/get");

  const { employees } = await res.json();
  employeeDisplay = sortArray(employees);
  displayEmployeeList(employeeDisplay);
}

function sortArray(array) {
  const sortedArray = array.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
  });
  return sortedArray;
}

search.addEventListener("input", filterArray);

function filterArray(e) {
  employeeContainer.innerHTML = "";
  const filter = e.target.value.toLowerCase().replace(/\s/g, "");
  const filteredArray = employeeDisplay.filter(
    (e) =>
      e.name.toLowerCase().includes(filter) ||
      e.lastname.toLowerCase().includes(filter) ||
      `${e.name + e.lastname}`
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(filter) ||
      `${e.lastname + e.name}`.toLowerCase().replace(/\s/g, "").includes(filter)
  );
  displayEmployeeList(filteredArray);
}

function displayEmployeeList(employeeList) {
  employeeList.forEach((employee) => {
    employeeConstructor(employee);
  });
  let deleteEmployee = document.querySelectorAll(".deleteEmployee");
  let showForm = document.querySelectorAll(".showForm");
  let hideForm = document.querySelectorAll(".hideForm");
  let Cards = document.querySelectorAll(".Cards");
  let arrow = document.querySelectorAll(".arrow");
  let addEMploye = document.querySelector(".addEMploye");
  let hidenEmploye = document.querySelector(".hidenEmploye");
  let hideEmploye = document.querySelector(".hideEmploye");
  let list = document.querySelectorAll(".list");
  let checkboxs = document.querySelectorAll(".checkbox");

  for (let j = 0; j < arrow.length; j++) {
    arrow[j].addEventListener("click", (event) => {
      openCard(event);
    });
  }

  for (let i = 0; i < deleteEmployee.length; i++) {
    deleteEmployee[i].addEventListener("click", (event) => {
      DeleteEmployees(event);
    });
  }
  for (let i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("click", (event) => {
      EmployeeCheck(arrayEMployees)
    });
    
}

  for (let i = 0; i < showForm.length; i++) {
    showForm[i].addEventListener("click", (event) => {
      show(event);
    });
  }

  for (let i = 0; i < hideForm.length; i++) {
    hideForm[i].addEventListener("click", (event) => {
      hide(event);
    });
  }



  function show(event) {
    let target = event.target;
    for (let j = 0; j < Cards.length; j++) {
      Cards[j].style.display = "none";
    }
    target.parentNode.parentNode.parentNode.nextSibling.style.display =
      "flex";
  }

  function hide(event) {
    let target = event.target;
    let parent = target.parentNode;
    for (let j = 0; j < Cards.length; j++) {
      Cards[j].style.display = "flex";
    }
    parent.style.display = "none";
  }

  function openCard(event) {
    let target = event.target;
    if (target.classList.contains("close")) {
      target.style.transform = "rotate(0deg)";
      target.style.transition = "0.2s ease-out";
      target.parentNode.nextSibling.nextSibling.style.display = "none";
      target.parentNode.nextSibling.nextSibling.style.height = "0px";
      target.classList.remove("close");
      target.classList.add("open");
      target.scrollIntoView(true); 
    } else if (target.classList.contains("open")) {
      target.style.transform = "rotate(180deg)";
      target.style.transition = "0.2s ease-out";
      target.parentNode.nextSibling.nextSibling.style.display = "flex";
      target.parentNode.nextSibling.nextSibling.style.height = "max-content";
      target.classList.remove("open");
      target.classList.add("close");
      target.scrollIntoView(true); 
    }
  }

  function showingEmploye(event) {
    let target = event.target;
    let parent = target.parentNode;
    hidenEmploye.style.display = "flex";
    for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
    }
  }
  
  addEMploye.addEventListener("click", (event) => {
    showingEmploye(event);
  });

  hideEmploye.addEventListener("click", (event) => {
    NoneEmploye(event);
  });

  function NoneEmploye(event) {
    let target = event.target;
    let parent = target.parentNode;
    parent.parentNode.style.display = "none";
    for (let i = 0; i < list.length; i++) {
      list[i].style.display = "flex";
    }
  }
}

function employeeConstructor(employee) {
  const list = document.createElement("div");
  list.classList.add("list");
  list.setAttribute("data-employee-id", employee._id);
  list.setAttribute("draggable", "true");
  list.setAttribute("ondragstart", "drag(event)");
  list.setAttribute("id", employee._id);



  employeeContainer.appendChild(list);
  const Cards = document.createElement("div");
  Cards.classList.add("Cards");
  list.appendChild(Cards);
  const img = document.createElement("img");
  img.src = `../images/arrow.png`;
  img.classList.add("arrow");
  img.classList.add("open");
  Cards.appendChild(img);
  const div = document.createElement("div");
  div.classList.add("infoList");
  Cards.appendChild(div);
  const ImageDiv = document.createElement("div");
  ImageDiv.classList.add("ImageDiv");
  ImageDiv.classList.add("flex1");
  div.appendChild(ImageDiv);
  const nameDiv = document.createElement("div");
  nameDiv.classList.add("nameDiv");
  nameDiv.classList.add("flex1");
  div.appendChild(nameDiv);
  const ImageforDiv = document.createElement("img");
  ImageforDiv.src = `../images/CompanyImages/${employee.image}`;
  ImageforDiv.classList.add("ImageforDiv");
  ImageDiv.appendChild(ImageforDiv);
  const lastnameDiv = document.createElement("div");
  lastnameDiv.classList.add("lastnameDiv");
  lastnameDiv.classList.add("flex1");
  div.appendChild(lastnameDiv);
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  p1.innerHTML = employee.name;
  p2.innerHTML = employee.lastname;
  nameDiv.appendChild(p1);
  lastnameDiv.appendChild(p2);
  const btn = document.createElement("button");
  btn.classList.add("flex1");
  div.appendChild(btn);
  const btn3 = document.createElement("button");
  btn3.classList.add("flex1");
  const a1 = document.createElement("a");
  a1.href = `/company/employee/blame/delete/${employee._id}`;
  btn3.appendChild(a1);
  const btnImg3 = document.createElement("img");
  btnImg3.classList.add("btnImg");
  btnImg3.src = "../images/BlameDelete.png";
  a1.appendChild(btnImg3);
  btn3.appendChild(a1);
  div.appendChild(btn3);

  const a = document.createElement("a");
  a.href = `/company/employee/blame/${employee._id}`;
  btn.appendChild(a);
  const btnImg = document.createElement("img");
  btnImg.classList.add("btnImg");
  btnImg.src = "../images/blame.png";
  a.appendChild(btnImg);
  const btn2 = document.createElement("button");
  btn2.classList.add("flex1");
  btn2.classList.add("borderNone");
  const btnImg2 = document.createElement("img");
  btnImg2.classList.add("btnImg");
  btnImg2.classList.add("showForm");
  btnImg2.src = "../images/modifier.png";
  btn2.appendChild(btnImg2);
  div.appendChild(btn2);
  
  const deleteEmployee = document.createElement("img");
  deleteEmployee.classList.add("deleteEmployee");
  deleteEmployee.value = employee._id;
  deleteEmployee.src = "../images/delete.png";
  Cards.appendChild(deleteEmployee);
  const btn4 = document.createElement("button");
  btn4.classList.add("flex1");
  const checkbox = document.createElement("div");
  checkbox.classList.add("checkbox");
  checkbox.classList.add("unChecked");
  checkbox.value = employee._id;
  btn4.appendChild(checkbox);
  div.appendChild(btn4);
  const hiden = document.createElement("div");
  hiden.classList.add("hiden");
  hiden.classList.add("containerForm");
  hiden.id = "hiden";

  list.appendChild(hiden);
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `/company/employee/update/${employee._id}`;
  form.enctype = "multipart/form-data";
  hiden.appendChild(form);
  const label1 = document.createElement("label");
  label1.htmlFor = "name";
  label1.innerHTML = "Nom :";
  form.appendChild(label1);
  const input1 = document.createElement("input");
  input1.type = "text";
  input1.name = "name";
  input1.value = employee.name;
  input1.id = "name";
  form.appendChild(input1);
  const label2 = document.createElement("label");
  label2.htmlFor = "lastname";
  label2.innerHTML = "Prenom :";
  form.appendChild(label2);
  const input2 = document.createElement("input");
  input2.type = "text";
  input2.value = employee.lastname;
  input2.name = "lastname";
  input2.id = "lastname";
  form.appendChild(input2);
  const label3 = document.createElement("label");
  label3.htmlFor = "phone";
  label3.innerHTML = "Téléphone :";
  form.appendChild(label3);
  const input3 = document.createElement("input");
  input3.type = "number";
  input3.value = employee.phone;
  input3.name = "phone";
  input3.id = "phone";
  form.appendChild(input3);
  const label4 = document.createElement("label");
  label4.htmlFor = "age";
  label4.innerHTML = "Age :";
  form.appendChild(label4);
  const input4 = document.createElement("input");
  input4.type = "number";
  input4.value = employee.age;
  input4.name = "age";
  input4.id = "age";
  form.appendChild(input4);
  const label5 = document.createElement("label");
  label5.htmlFor = "sexe";
  label5.innerHTML = "Sexe :";
  form.appendChild(label5);
  const input5 = document.createElement("input");
  input5.type = "text";
  input5.value = employee.sexe;
  input5.name = "sexe";
  input5.id = "sexe";
  form.appendChild(input5);
  const label7 = document.createElement("label");
  label7.htmlFor = "fonction";
  label7.innerHTML = "Fonction :";
  form.appendChild(label7);
  const input7 = document.createElement("input");
  input7.type = "text";
  input7.name = "fonction";
  input7.value = employee.fonction;
  input7.id = "fonction";
  form.appendChild(input7);
  const label8 = document.createElement("label");
  label8.htmlFor = "upload_file";
  label8.innerHTML = "Photo :";
  form.appendChild(label8);
  const input8 = document.createElement("input");
  input8.type = "file";
  input8.name = "image";
  input8.src = employee.name;
  input8.id = "image";
  form.appendChild(input8);
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.classList.add("submitForm")
  form.appendChild(submit);
  const buttonhide = document.createElement("button");
  buttonhide.classList.add("hideForm");
  buttonhide.innerHTML = "Fermer";
  hiden.appendChild(buttonhide);
  let cardsOpen = document.createElement("div");
  cardsOpen.classList.add("cardsOpen");
  cardsOpen.id = "cardsOpen";
  list.appendChild(cardsOpen);
  let photoContainer = document.createElement("div");
  photoContainer.classList.add("photoContainer");
  cardsOpen.appendChild(photoContainer);
  let employeePhoto = document.createElement("img");
  employeePhoto.src = `../images/CompanyImages/${employee.image}`;
  employeePhoto.classList.add("employeePhoto");
  photoContainer.appendChild(employeePhoto);
  let infoList = document.createElement("div");
  infoList.classList.add("infoList");
  cardsOpen.appendChild(infoList);
  let fonction = document.createElement("div");
  fonction.classList.add("info");
  infoList.appendChild(fonction);
  let telephone = document.createElement("div");
  telephone.classList.add("info");
  infoList.appendChild(telephone);
  let sexe = document.createElement("div");
  sexe.classList.add("info");
  infoList.appendChild(sexe);
  let age = document.createElement("div");
  age.classList.add("info");
  infoList.appendChild(age);
  let blame = document.createElement("div");
  blame.classList.add("info");
  infoList.appendChild(blame);
  const h1 = document.createElement("h3");
  const h2 = document.createElement("h3");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h3");
  const h5 = document.createElement("h3");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const p6 = document.createElement("p");
  const p7 = document.createElement("p");
  h1.innerHTML = "Fonction";
  h2.innerHTML = "Téléphone";
  h3.innerHTML = "Sexe";
  h4.innerHTML = "Age";
  h5.innerHTML = "Blame";
  p3.innerHTML = employee.fonction;
  p4.innerHTML = employee.phone;
  p5.innerHTML = employee.sexe;
  p6.innerHTML = employee.age;
  p7.innerHTML = employee.blame;
  fonction.appendChild(h1);
  fonction.appendChild(p3);
  telephone.appendChild(h2);
  telephone.appendChild(p4);
  sexe.appendChild(h3);
  sexe.appendChild(p5);
  age.appendChild(h4);
  age.appendChild(p6);
  blame.appendChild(h5);
  blame.appendChild(p7);
}

getEmployees();
