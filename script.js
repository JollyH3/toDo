function addToDo(){
    //reset main div
    document.getElementById("main").innerHTML = "";

    let p = document.createElement("p");
    p.innerHTML = "Add a new To Do";
    document.getElementById("main").appendChild(p);

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "title");
    document.getElementById("main").appendChild(input);

    let button = document.createElement("button");
    button.setAttribute("id", "button");
    button.setAttribute("onclick", "addToDoList()");
    button.innerHTML = "Add";
    document.getElementById("main").appendChild(button);
}

function addToDoList(){
    let title = document.getElementById("title").value;

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));

    if(toDoDir == null){
        toDoDir = [];
    }else{
        toDoDir.push(title);
        localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
    }

    setDefaultPage();
}

function setDefaultPage(){
    //reset main div
    document.getElementById("main").innerHTML = "";

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));

    let fillToDoContainer = "";

    if (toDoDir == null){
      fillToDoContainer = "No To Do's";
    }else {
        for (let i = 0; i < toDoDir.length; i++) {
            fillToDoContainer += `<div id="toDo${i}" class="toDoPackage">${toDoDir[i]}</div>`;
        }
    }

    let defaultMain = `
    <h3>YOUR TO-DO</h3>
    <div id="toDoContainer"><a href="#1">${fillToDoContainer}</a></div>
    <button id="addToDo" onclick="addToDo()">add To Do</button>
    <button id="delToDo" onclick="delToDo()">delete To Do</button>
    `;

    document.getElementById("main").innerHTML = defaultMain;
}

function delToDo(){

}