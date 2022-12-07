function addToDo(){
    //reset main div
    document.getElementById("main").innerHTML = "";

    let addMain = `
    <div class="add-main">
        <div class="add-main__header">
              <h1>Add To Do</h1>
        </div>
        <div class="add-main__body">
            <input type="text" placeholder="Enter To Do" id="add-input">
            <button id="add-button" onclick="addToDoList()">Add</button>
            <button id="cancel-button" onclick="setDefaultPage()">Cancel</button>
        </div>
    </div>
    `;

    document.getElementById("main").innerHTML = addMain;
}

function addToDoList(){

    let toDo = {
        title : document.getElementById("add-input").value,
        toDoList: []
    };

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));

    if (toDoDir == null) {
        toDoDir = [];
    }

    toDoDir.push(toDo);
    localStorage.setItem("toDoDir", JSON.stringify(toDoDir));

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
            fillToDoContainer += `
            <div id="toDo${i}" class="toDoPackage">
            <a id="#${i}" href="#${i}" class="toDoPackageLink">
            <div id="toDoInternalPackage">
            <p class="toDoListTitle">${toDoDir[i].title}</p>
            <ul class="toDoList">
            <li class="toDoList1">${prova(toDoDir[i].toDoList[0])}</li>
            <li class="toDoList2">${prova(toDoDir[i].toDoList[1])}</li>
            <li class="toDoList3">...</li>
            </li>
            </ul>
            <p></p>
            </div>
            </a>
            </div>
    `;
        }
    }

    let defaultMain = `
    <h3>YOUR TO-DO</h3>
    <div id="toDoContainer">${fillToDoContainer}</div>
    <button id="addToDo" onclick="addToDo()">add To Do</button>
    <button id="delToDo" onclick="delToDo()">delete To Do</button>
    `;

    document.getElementById("main").innerHTML = defaultMain;
}

function prova(toDo){
    if (toDo == null){
        return "add to do";
    }else{
        return toDo;
    }
}
function delToDo(){

}