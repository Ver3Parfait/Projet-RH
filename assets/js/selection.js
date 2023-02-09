let checkboxs = document.querySelectorAll(".checkbox");
let arrayEMployees = [];
let trash = document.querySelector('.trashAll')
let trashGen = document.querySelector('.trashGen')



function EmployeeCheck(array) {
    let target = event.target;
    if (target.classList.contains("unChecked")) {
        target.classList.remove("unChecked");
        target.classList.add("checked");
        target.style.backgroundColor = "blue";
        arrayEMployees.push(`${target.value}`);
                trash.href = `/company/employee/deletes/${arrayEMployees}`;
        console.log(arrayEMployees);
    }else if(target.classList.contains("checked")) {
        target.classList.remove("checked");
        target.classList.add("unChecked");
        target.style.backgroundColor = "grey";
       let index = arrayEMployees.indexOf(`${target.value}`);
        arrayEMployees.splice(index, 1);
        trash.href = `/company/employee/deletes/${arrayEMployees}`;
        console.log(arrayEMployees);
    }
}


