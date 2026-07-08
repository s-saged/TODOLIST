let InputText = document.getElementById("t");
let btn = document.getElementById("b");
let task = document.getElementById("p");

function go(){
      task.innerHTML += ` <div class = "box"><p>${InputText.value}</p> <button onclick = "delet(this)" >Done</button></div> `
    InputText.value = ""
}
InputText.addEventListener("keydown" , (e) =>{
    if(e.key == "Enter"){
        go()
    }

});
function delet(element){
    // element.parentElement معناه الـ div الأب اللي شايل الزرار ده بالظبط
    let targetBox = element.parentElement;
    targetBox.remove(); // بيمسحه هو لوحده من الشاشة تماماً
}