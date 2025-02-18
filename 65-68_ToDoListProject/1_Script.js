document.addEventListener("DOMContentLoaded",function(){

    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((ele) => renderTask(ele));

    addTaskButton.addEventListener("click",function(){
        const taskText = todoInput.value.trim();//trim method removes extra spaces at the end 
        if(taskText === "")    return;
        
        const newTask = {
            id : Date.now(), //it gives unique string acc to date and time
            text : taskText,
            completed : false
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask)
        todoInput.value = "";//clear input
        console.log(tasks);
    });
    //for rendering tasks from the local storage
    function renderTask(ele){
        //console.log(ele.text);
        const li = document.createElement("li");
        li.setAttribute("data-id",ele.id);
        if (ele.completed) li.classList.add("completed");
        li.innerHTML = `
        <span>${ele.text}</span>
        <button>delete</button>
        `;
        li.addEventListener("click",function(e){
            if(e.target.tagName === "BUTTON")   return;
            ele.completed = !ele.completed;
            li.classList.toggle("completed");
            saveTasks();
        });
        li.querySelector("button").addEventListener("click",function(e){
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== e.id);
            li.remove();
            saveTasks();
        });
        todoList.appendChild(li);
        
    }
    // for storing tasks in local storage
    function saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
});