if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

let InputText = document.getElementById("t");
let btn = document.getElementById("b");
let task = document.getElementById("p");

// نقوم بتخزين المهام كـ Objects تحتوي على النص والحالة (completed)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function go(){
    let taskText = InputText.value.trim();
    if(taskText === "") return;

    // إضافة المهمة كـ Object
    tasks.push({ text: taskText, completed: false });
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

// دالة الحذف المعدلة
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

// دالة Done المعدلة لتشطب النص وتحفظ الحالة
function done(element){
    let targetBox = element.parentElement;
    let allBoxes = Array.from(task.children);
    let index = allBoxes.indexOf(targetBox);
    
    if(index !== -1){
        // عكس حالة الاكتمال (إذا كانت true تصبح false والعكس)
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // إعادة عرض المهام لتطبيق الشطب
        showSavedTasks();
    }
}

// دالة العرض المعدلة لتظهر الشطب بناءً على حالة المهمة
function showSavedTasks() {
    task.innerHTML = '';
    tasks.forEach((taskObj) => {
        // إذا كانت المهمة مكتملة، نضع خطاً فوق النص (line-through)
        let textStyle = taskObj.completed ? "text-decoration: line-through; color: gray;" : "";
        
        task.innerHTML += `
            <div class="box">
                <p style="${textStyle}">${taskObj.text}</p> 
                <button onclick="done(this)" style= "margin = 2.5px;">Done</button> 
                <button onclick="delet(this)" style= "margin = 2.5px;">delete</button> 
            </div>`;
    });
}

// تشغيل العرض عند فتح الصفحة أول مرة
showSavedTasks();