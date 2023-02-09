let body = document.querySelector("body");
let popup;
let button;
let button2;
let popupContainer;




function DeleteEmployees(event) {
  let target = event.target ? event.target.parentNode.parentNode : event;
  popup = document.createElement("div");
  popup.classList.add("popup");
  body.appendChild(popup);
  popupContainer = document.createElement("div");
  popupContainer.classList.add("popupContainer");
  popup.appendChild(popupContainer);
  button = document.createElement("a");
  button.classList.add("button");
  button.innerHTML = "Oui";
  button.href = `/company/employee/delete/${target.getAttribute("data-employee-id")}`;
  popupContainer.appendChild(button);

  button2 = document.createElement("a");
  button2.classList.add("button");
  button2.innerHTML = "Non";
  popupContainer.appendChild(button2);
  popupContainer.style.transition = "all 0.3s ease-in-out";
  popup.style.transition = "all 0.3s ease-in-out";
  button2.addEventListener("click", () => {
    popup.remove();
    popupContainer.remove();
  })
}

function allowDrop(ev){
ev.preventDefault();
}


function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let elem = document.getElementById(data);
  DeleteEmployees(elem)
}