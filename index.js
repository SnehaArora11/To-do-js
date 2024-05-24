let form = document.querySelector('.add');
let list = document.querySelector('.tasks');
let noOfTasks = list.querySelectorAll('li').length; // Initial count of tasks

// Adding a new element to task list
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let input = form.task.value.trim();
    if (input.length !== 0) {
        let newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${input}</span>
            <i class="bi bi-calendar-x-fill delete"></i>
        `;
        list.appendChild(newTask);
        form.reset();
        noOfTasks++;
        updatenooftasks(noOfTasks);
        attachDeleteListener(newTask.querySelector('.delete'));
    }
});

// Deleting a task from the list
function attachDeleteListener(button) {
    button.addEventListener('click', () => {
        button.parentElement.remove();
        noOfTasks--;
        updatenooftasks(noOfTasks);
    });
}

// Attach delete listener to existing tasks
document.querySelectorAll('.delete').forEach(attachDeleteListener);

// Resetting the search box
let resetbutton = document.querySelector('.reset');
let searchbox = document.querySelector('.search');
resetbutton.addEventListener('click', () => {
    searchbox.reset();
    filtertask(''); // Clear the search and show all tasks
});

// Searching in the list
let searchform = document.querySelector('.search');
searchform.addEventListener('keyup', () => {
    let searchformvalue = searchform.task.value.trim().toLowerCase();
    filtertask(searchformvalue);
});

function filtertask(term) {
Array.from(list.children)
     .filter(task => {
     return !task.textContent.toLowerCase().includes(term);
     })
     .forEach(task => {
     task.classList.add('hide');
     });

Array.from(list.children)
     .filter(task => {
         return task.textContent.toLowerCase().includes(term);
     })
     .forEach(task => {
         task.classList.remove("hide");
     });
}

// Updating task count
function updatenooftasks(no) {
    let taskmessage = document.querySelector('.message span');
    taskmessage.textContent = `You have ${no} pending tasks`;
}

// Clear all tasks
let clearall = document.querySelector('.clearall');
clearall.addEventListener('click', () => {
    let taskitems = list.querySelectorAll('li');
    taskitems.forEach(element => element.remove());
    noOfTasks = 0;
    updatenooftasks(noOfTasks);
});

// Initial call to update the task count on page load
updatenooftasks(noOfTasks);
