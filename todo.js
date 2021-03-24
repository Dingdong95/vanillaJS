const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


function deleteToDo(event) {
    const btn = event.target;                                                     //btn에 event가 발생하면 target해줌
    const li = btn.parentNode;                                                   //li는 btn의 parentNode임 (id가 parentNode인 list에 추가되기때문)
    toDoList.removeChild(li);                                                    //toDoList의 child인 event가 발생한 li를 지움
    const cleanToDos = toDos.filter(function(toDo){                              //toDos array의 element를 filter함 
                                                                                 //그중 toDo
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDos;                                                          //toDos
    saveToDos(); 
}

function saveToDos () {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
    const li= document.createElement("li");                           //li를 생성 
    const delBtn = document.createElement("button");                  //delete button을 생성
    const span = document.createElement("span");                      //span을 생성 
    const newId = toDos.length+1;                                     // newID는 toDos array의 길이 +1 임
    delBtn.innerText = "✔";                                          //delete button의 innertext에 이모지 추가 
    delBtn.addEventListener("click", deleteToDo);                    //delete버튼에 click event를 감지하고 deleteToDo함수 실행 
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {                                            //loadToDos 함수
    const loadedToDos = localStorage.getItem(TODOS_LS);           //loadedToDos는 localStorage에 ToDOS_LS를 가져옴 
    if (loadedToDos !== null) {                                   //loadedToDos 가 null이 아니라면 
        const parsedToDos = JSON.parse(loadedToDos);              //parsedToDos는 loadedToDos를 parsing하는 함수임. 
       parsedToDos.forEach(function(toDo){                        //parsedToDos는 parsing된 TODOS_LS array의 element하나마다 toDo에 관하여 
           paintToDo(toDo.text);                                  //paintToDo를 실행 
       });
    }
}

function init() {                                                  //init은 loadToDos함수와 toDoForm.addEventListener로 이루어짐 
    loadToDos();                                                   // loadToDos함수를 실행 
    toDoForm.addEventListener("submit", handleSubmit);             // toDoform.addEventListener함수를 실행 
}

init();                                                            //init함수를 실행 
