let InputText = document.getElementById("t");
let btn = document.getElementById("b");
let task = document.getElementById("p");
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function go(){
    let taskText = InputText.value.trim();
    if(taskText === "") return;

    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    showSavedTasks();
    InputText.value = "";
}

btn.onclick = go;

InputText.addEventListener("keydown" , (e) =>{
    if(e.key == "Enter"){
        go();
    }
});

function delet(element){
    let targetBox = element.parentElement;
    let allBoxes = Array.from(task.children);
    let index = allBoxes.indexOf(targetBox);
    
    if(index !== -1){
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    targetBox.remove();
}

function showSavedTasks() {
    task.innerHTML = '';
    tasks.forEach((taskText) => {
        task.innerHTML += ` <div class = "box"><p>${taskText}</p> <button onclick = "delet(this)" >Done</button></div> `;
    });
}

showSavedTasks();