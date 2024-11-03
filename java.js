var myModalEdit = document.getElementById("myModalEdit");
var myModalAdd = document.getElementById("myModalAdd");


var btn_edit = document.getElementById("editBtn");
var btn_edit_ok = document.getElementById("edit_ok");
var btn_edit_cancel = document.getElementById("edit_cancel");


var btn_add = document.getElementById("addBtn");
var btn_add_ok = document.getElementById("add_ok");
var btn_add_cancel = document.getElementById("add_cancel");

var btn_delete = document.getElementById("deleteBtn");

const taskList = document.getElementById('taskList');


function load () {
    var add = document.getElementById("add");
    const taskText = add.value.trim();
    let tabl = []
     tabl = JSON.parse(localStorage.getItem('lista'));
     for (let elem of tabl) {
        addTask(elem);

     }

}
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    taskList.appendChild(li);
}

taskList.onclick = function (event) {
    let isSameNode = false;
    if (event.target.tagName != "LI") return;
    let selected = taskList.querySelectorAll('.selected');
    for (let elem of selected) {
        if(elem.isSameNode(event.target))
        {
            isSameNode = true;
        }
    }
    if (isSameNode) {
        removeSelect();
    } else {
        singleSelect(event.target);
    }

}
taskList.onmousedown = function () {
    return false;
};
function removeSelect () {
    let selected = taskList.querySelectorAll('.selected');
    for (let elem of selected) {           
        elem.classList.remove('selected');        
    }
    btn_delete.disabled = true;
    btn_edit.disabled = true;
}
function singleSelect(li) {
    let selected = taskList.querySelectorAll('.selected');
    for (let elem of selected) {
        elem.classList.remove('selected');
    }
    li.classList.add('selected');
    btn_edit.disabled = false;
    btn_delete.disabled = false;
}

function save() {
    let savelist = [];
    
    let items = taskList.querySelectorAll('li');
    for (let elem of items) {
        savelist.push(elem.textContent);
    }
    localStorage.setItem('lista',JSON.stringify(savelist));
}
btn_add.onclick = function () {
    myModalAdd.style.display = "block";
}
btn_add_ok.onclick = function () {
    var add = document.getElementById("add");
    const taskText = add.value.trim();
    if (taskText) {
        console.log('btn_add_ok_else1');
        addTask(taskText);
        add.value = '';
        myModalAdd.style.display = "none";
        save(); 
    }
    else {
        alert('nie mozna dodac pustego zadania');
    }

}
btn_add_cancel.onclick = function () {
    myModalAdd.style.display = "none";
}
btn_edit.onclick = function () {
    var edit = document.getElementById("edit");
    let selected = taskList.querySelectorAll('.selected');
    for (let elem of selected) {
        edit.value = elem.textContent;
    }
    myModalEdit.style.display = "block";

}


btn_edit_ok.onclick = function () {

    var edit = document.getElementById("edit");
    if (edit.value) {
        let selected = taskList.querySelectorAll('.selected');
        for (let elem of selected) {
            elem.textContent = edit.value;
        }
        myModalEdit.style.display = "none";
        save(); 
        edit.value="";
    }
    else {
        alert('tresc zadania nie moze byc pusta');
    }


}

btn_edit_cancel.onclick = function () {
    var edit = document.getElementById("edit");
    myModalEdit.style.display = "none";
    edit.value="";
}
btn_delete.onclick = function () {
    let selected = taskList.querySelectorAll('.selected');

    for (let elem of selected) {
        taskList.removeChild(elem);
    }
    btn_delete.disabled = true;
    btn_edit.disabled = true;
    save(); 
}
load();