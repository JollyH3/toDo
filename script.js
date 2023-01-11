function loadAddToDo(){
    //reset main div
    document.getElementById("main").innerHTML = "";

    let addMain = `
    <div class="add-main">
        <div class="add-main__header">
              <h1>Add To Do List</h1>
        </div>
        <div class="add-main__body">
            <input type="text" placeholder="Enter To Do" id="add-input">
            <label for="color">Color</label>
            <input type="color" id="color" name="color" value="#FFFFFF">
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
        cDate : today.toLocaleDateString(),
        lastUpdate : today.toLocaleDateString(),
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
            <p id="cDate">Created: ${toDoDir[i].cDate}</p>
            <p id="lastUpdate">last update: ${toDoDir[i].lastUpdate}</p>
            </div>
            </a>
            </div>
    `;
        }
    }

    let defaultMain = `
    <h3 id="mainTitle">YOUR TO-DO LIST</h3>
    <button id="loadAddToDo" onclick="loadAddToDo()">Add To Do List</button>
    <button id="delToDoList" onclick="delToDoList()">Delete To Do List</button>
    <div class="clear"></div>
    <div id="toDoContainer">${fillToDoContainer}</div>
    <div class="clear"></div>
    `;

    document.getElementById("main").innerHTML = defaultMain;

    //set hash to nothing
    location.hash = "";

    //set color
    if (toDoDir != null){
        for (let i = 0; i < toDoDir.length; i++) {
            document.getElementById("toDo" + i).style.backgroundColor = toDoDir[i].color;
        }
    }
    for (let i = 0; i < toDoDir.length; i++) {
        if (toDoDir[i].toDoList != null){
            if (toDoDir[i].toDoList[0].done == true){
                document.getElementsByClassName("toDoList1")[i].style.textDecoration = "line-through";
            }
            if (toDoDir[i].toDoList[1].done == true){
                document.getElementsByClassName("toDoList2")[i].style.textDecoration = "line-through";
            }
        }
    }
}

function toDoList(toDo){
    if (toDo == null){
        return "add to do";
    }else{
        return toDo.text;
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
                <input type="text" placeholder="Enter To Do" id="toDoListInput"><br>
                <button id="add-button" onclick="addToDo(${i})">Add</button>
                <button id="delete-button" onclick="delToDo(${i})">Delete</button>
                <button id="back-button" onclick="setDefaultPage()">Back</button>
            <div class="everyToDo">${everyToDo(i)}</div>
            </div>
        </div>
        `;
    }

    callback(pages[id]);
}

function setColor(id){
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    for (let i = 0; i < toDoDir[id].toDoList.length; i++) {
        if (toDoDir[id].toDoList[i].done == true){
            document.getElementById("toDoList" + id + "_item" + i).style.textDecoration = "line-through";
            document.getElementById("toDoList" + id + "_item" + i).style.color = "red";
        }else{
            document.getElementById("toDoList" + id + "_item" + i).style.textDecoration = "none";
            document.getElementById("toDoList" + id + "_item" + i).style.color = "black";
        }
    }
}
function everyToDo(id){
    let everyToDo = "";
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));

    for (let i = 0; i < toDoDir[id].toDoList.length; i++) {
        everyToDo += `
        <p class="List" id="${"toDoList" + id + "_item" + i}" onclick="doToDo()" >${toDoDir[id].toDoList[i].text}</p>
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
            setColor(id);
        });
    }
}

function addToDo(id){
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let toDoText = document.getElementById("toDoListInput").value;

    let toDo = {
        text: toDoText,
        done: false
    }
    toDoDir[id].toDoList.push(toDo);
    toDoDir[id].lastUpdate = today.toLocaleDateString();
    localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
    loadContent();
}

function delToDo(){
    document.getElementById("toDoListPageTitle").innerHTML = "Press any To Do to delete";
    let cancel = document.getElementById("back-button");
    cancel.innerHTML = "Cancel";
    cancel.setAttribute("onclick", "loadContent()");
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let id = location.hash.substring(1);
    toDoDir[id].lastUpdate = today.toLocaleDateString()

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
    let n = toDo.getAttribute("id").slice(14, 15);

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let id = location.hash.substring(1);
    toDoDir[id].lastUpdate = today.toLocaleDateString()
    toDoDir[id].toDoList[n].done = true;
    localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
}

function removeDoToDo(){
    let toDo = event.target;
    toDo.style.textDecoration = "none";
    toDo.setAttribute("onclick", "doToDo()");
    toDo.style.color = "black";

    let n = toDo.getAttribute("id").slice(14, 15);

    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    let id = location.hash.substring(1);
    toDoDir[id].lastUpdate = today.toLocaleDateString()
    toDoDir[id].toDoList[n].done = false;
    localStorage.setItem("toDoDir", JSON.stringify(toDoDir));
}

function updateDate(id){
    let toDoDir = JSON.parse(localStorage.getItem("toDoDir"));
    toDoDir[id].lastUpdate = today.toLocaleDateString()
}

window.addEventListener("hashchange", loadContent);

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
