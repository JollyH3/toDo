function loadAddToDo(){
    //reset main div
    document.getElementById("main").innerHTML = "";

    let addMain = `
    <div class="add-main">
        <div class="add-main__header">
              <h1>Add To Do</h1>
        </div>
        <div class="add-main__body">
            <input type="text" placeholder="Enter To Do" id="add-input">
            <label for="color">Color</label>
            <input type="color" id="color" name="color" value="#000000">
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
        color : document.getElementById("color").value,
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
            <li class="toDoList1">${toDoList(toDoDir[i].toDoList[0])}</li>
            <li class="toDoList2">${toDoList(toDoDir[i].toDoList[1])}</li>
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
    <h3 id="mainTitle">YOUR TO-DO LIST</h3>
    <div id="toDoContainer">${fillToDoContainer}</div>
    <button id="loadAddToDo" onclick="loadAddToDo()">Add To Do</button>
    <button id="delToDoList" onclick="delToDoList()">Delete To Do</button>
    `;

    document.getElementById("main").innerHTML = defaultMain;

    //set color
    if (toDoDir != null){
        for (let i = 0; i < toDoDir.length; i++) {
            document.getElementById("toDo" + i).style.backgroundColor = toDoDir[i].color;
        }
    }

    //set hash to nothing
    location.hash = "";
}

function toDoList(toDo){
    if (toDo == null){
        return "add to do";
    }else{
        return toDo;
    }
}

function delToDoList(){
    document.getElementById("mainTitle").innerHTML = "Press any To Do List to delete";
    let cancel = document.getElementById("loadAddToDo");
    cancel.innerHTML = "Cancel";
    cancel.setAttribute("onclick", "setDefaultPage()");

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    for (let i = 0; i < toDoDir.length; i++) {
        document.getElementById("toDo" + i).onclick = function () {
            toDoDir.splice(i, 1);
            localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
            setDefaultPage();
        }
        document.getElementById("#" + i).href = "";
    }
}

function getContent(id, callback){

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));

    let pages = {}

    for (let i = 0; i < toDoDir.length; i++) {
        pages[i] = `
        <div class="toDoListPage">
            <div class="toDoListPage__header">
                <h1 id="toDoListPageTitle">${toDoDir[i].title}</h1>
            </div>
            <div class="toDoListPage__body">
            <div class="everyToDo">${everyToDo(i)}</div>
                <input type="text" placeholder="Enter To Do" id="toDoListInput">
                <button id="add-button" onclick="addToDo(${i})">Add</button>
                <button id="delete-button" onclick="delToDo(${i})">Delete</button>
                <button id="cancel-button" onclick="setDefaultPage()">Cancel</button>
            </div>
        </div>
        `;
    }

    callback(pages[id]);

}

function everyToDo(id){
    let everyToDo = "";
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));

    for (let i = 0; i < toDoDir[id].toDoList.length; i++) {
        everyToDo += `
        <p id="${"toDoList" + id + "_item" + i}" onclick="doToDo()">${toDoDir[id].toDoList[i]}</p>
        `;
    }
    return everyToDo;
}
function loadContent(){
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let main = document.getElementById("main");
    let id = location.hash.substring(1);

    if (id == "" || id > toDoDir.length - 1){
        setDefaultPage();
    }else {
        getContent(id, function (content) {
            main.innerHTML = content;
        });
    }
}

function addToDo(id){
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let toDo = document.getElementById("toDoListInput").value;

    toDoDir[id].toDoList.push(toDo);

    localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
    loadContent();
}

function delToDo(){
    document.getElementById("toDoListPageTitle").innerHTML = "Press any To Do to delete";
    let cancel = document.getElementById("cancel-button");
    cancel.innerHTML = "Cancel";
    cancel.setAttribute("onclick", "loadContent()");
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let id = location.hash.substring(1);

    for (let i = 0; i < toDoDir[id].toDoList.length; i++) {
        document.getElementById("toDoList" + id + "_item" + i).onclick = function () {
            toDoDir[id].toDoList.splice(i, 1);
            localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
            loadContent();
        }
    }
}

function doToDo(){
    let toDo = event.target;
    toDo.style.textDecoration = "line-through";
    toDo.setAttribute("onclick", "removeDoToDo()");
    toDo.style.color = "red";
}

function removeDoToDo(){
    let toDo = event.target;
    toDo.style.textDecoration = "none";
    toDo.setAttribute("onclick", "doToDo()");
    toDo.style.color = "black";
}

window.addEventListener("hashchange", loadContent);