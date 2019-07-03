// Buttons
let addTaskBTN = document.querySelector("#addTaskBTN"),
  deleteTaskBTN = document.querySelectorAll(".deleteTaskBTN");


// Inputs
let addTaskInput = document.querySelector("#addTask");

// DOM

let listBox = document.querySelector("#todo-list"),
  addTaskForm = document.querySelector("#addForm");

// ----------------- EVENTS --------------------------------
window.addEventListener('DOMContentLoaded', function () {
  showTaskData();
  
  // Add data from LocalStorage to HTML 
});

// On clicking Add task BTN
addTaskForm.addEventListener('submit', addToList);

// On clicking delete Btn on task
listBox.addEventListener('click', deleteTask);
// ---------------------------- Functions ---------------------------------------
function addTaskToUI(task,id) {
  
  let element = document.createElement('div');
  element.className = 'list-item';
  element.innerHTML = `
          <h2 class="task">${task}</h2>
          <div class="controls">
            <button class="deleteTaskBTN"><i class="material-icons del-task id${id}">
                delete
                </i></button>
          </div>
          `;
  listBox.append(element);
  
}
function addTaskToLS(input){
  if (input !== '') {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let listObj={
      id:new Date().getTime(),
      task:input
    };
    tasks.push(listObj);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add to UI
    addTaskToUI(input,listObj.id);
    addTaskInput.value = '';
  }
}
function addToList(e) {
  e.preventDefault();

  addTaskInput.value;
  // add to local storage DB
  addTaskToLS(addTaskInput.value);
  listBox.scrollTop = listBox.scrollHeight;
}

function showTaskData(e) {

  if (localStorage.getItem('tasks') !== null) {

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (task) {
      
     addTaskToUI(task.task,task.id);
      
    });
  } else {
  }
}


function deleteTask(e){
  e.preventDefault();
  
  if(e.target.classList.contains('del-task')){
    
    // delete from LS


    let targetId=e.target.classList[e.target.classList.length-1]; // get the classname of id* (* = actual id of that list item)
    targetId= targetId.slice(2,targetId.length); // removeing the prefix 'id' from the targetId variable
    targetId=Number(targetId); // converting it to umber

    let dataLS=JSON.parse(localStorage.getItem('tasks')); // getting the data from local storage
   
    // loop until we find the matching task having id similar to targetId variable
    for(let i=0;i<=dataLS.length;i++){
      if(dataLS[i].id == targetId){
        
        dataLS.splice(i,1);// delete the list item from the array
        localStorage.setItem('tasks', JSON.stringify(dataLS)); //update the array
        break;

      }
    }
    // delete from UI
    e.path[3].remove();
  }
 
}
