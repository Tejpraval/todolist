let todoItemsContainer = document.getElementById("todoItemsContainer");
let add_btn_element = document.getElementById("add_btn");
let saveBtnElement = document.getElementById("savebtn");

// let todoList = [{
//         text: "Learn html",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn editing",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn Js",
//         uniqueNo: 3
//     }
// ];


function getElementsFromLocalStorege() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getElementsFromLocalStorege();
let todocount = todoList.length;

saveBtnElement.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// function ontodostatuschange(checkbox_id, taskid, todoid) {
//     let checkbox_element = document.getElementById(checkbox_id);
//     let taskid_element = document.getElementById(taskid);
//     taskid_element.classList.toggle("checked");
//     let todoObjecIndex = todoList.findIndex(function(eachTodo) {
//         let eachTodoid = "todoiscomment" + eachTodo.uniqueNo;
//         if (eachTodoid === todoid) {
//             return true;
//         } else {
//             return false;

//         }
//     });
//     let todoObject = todoList[todoObjecIndex];
//     if (todoObject.ischecked === true) {
//         todoObject.ischecked = false;
//     } else {
//         todoObject = true;
//     }

// }
function ontodostatuschange(checkbox_id, taskid, todoid) {
    let checkbox_element = document.getElementById(checkbox_id);
    let taskid_element = document.getElementById(taskid);
    taskid_element.classList.toggle("checked");

    let todoObjecIndex = todoList.findIndex(function(eachTodo) {
        return "todo" + eachTodo.uniqueNo === todoid;
    });

    if (todoObjecIndex !== -1) {
        let todoObject = todoList[todoObjecIndex];
        todoObject.ischecked = checkbox_element.checked; // Update ischecked
        localStorage.setItem("todoList", JSON.stringify(todoList)); // Save to localStorage
    }
}

function onDeleteTodo(todoid) {
    let todoElement = document.getElementById(todoid);
    todoItemsContainer.removeChild(todoElement);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoid = "todo" + eachTodo.uniqueNo;
        if (eachTodoid === todoid) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElementIndex);

}

function createAndAppendTodo(todo) {

    let checkbox_id = "checkbox" + todo.uniqueNo;
    let taskid = "task" + todo.uniqueNo;
    let todoid = "todo" + todo.uniqueNo;
    let todoItemContainer = document.createElement("li");
    todoItemContainer.classList.add("todoItemContainer", "d-flex", "flex-row");
    todoItemContainer.id = todoid;
    todoItemsContainer.appendChild(todoItemContainer);

    let checkbox_input = document.createElement("input");
    checkbox_input.type = "checkbox";
    checkbox_input.id = checkbox_id;
    checkbox_input.checked = todo.ischecked;
    checkbox_input.classList.add("checkbox_input");
    todoItemContainer.appendChild(checkbox_input);
    checkbox_input.onclick = function() {
        ontodostatuschange(checkbox_id, taskid, todoid);
    };

    let label_container = document.createElement("div");
    label_container.classList.add("label_container", "d-flex", "flex-row");
    todoItemContainer.appendChild(label_container);

    let task = document.createElement("label");
    task.htmlFor = checkbox_id;
    task.classList.add("task");
    task.id = taskid;
    task.textContent = todo.text;
    if (todo.ischecked === true) {
        task.classList.add("checked");
    }
    label_container.appendChild(task);

    let delete_icon_container = document.createElement("div");
    delete_icon_container.classList.add("delete_icon_container");
    label_container.appendChild(delete_icon_container);

    let delete_icon = document.createElement("i");
    delete_icon.classList.add("delete_icon", "far", "fa-trash-alt");
    delete_icon_container.appendChild(delete_icon);
    delete_icon.onclick = function() {
        onDeleteTodo(todoid);
    };
}
for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddtodo() {
    let userInputelement = document.getElementById("todo_user_input");
    let userInputvalue = userInputelement.value;
    if (userInputvalue === "") {
        alert("enter valid text");
        return;
    }
    todocount = todocount + 1;
    let newtodolistobj = {
        text: userInputvalue,
        uniqueNo: todocount,
        ischecked: false
    };
    todoList.push(newtodolistobj);
    userInputelement.value = "";
    createAndAppendTodo(newtodolistobj);
}
add_btn_element.onclick = function() {
    onAddtodo();
};