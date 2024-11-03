// Task array to hold the tasks
let tasks = [];
let usernamef = document.getElementById('username')
let passwordf = document.getElementById('password')
let tasklist = document.getElementById('tasklist')
let loginc=document.querySelector('.login-container')
let task=document.querySelector('.task')
let sort=document.querySelector('.sort')

// Task constructor function
function Task(description, priority) {
    this.description = description;
    this.priority = priority;
}

// Quick Sort function to sort tasks based on priority
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[0];
    let left = arr.slice(1).filter(task => task.priority <= pivot.priority);
    let right = arr.slice(1).filter(task => task.priority > pivot.priority);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Handle login and logout
document.getElementById('loginBtn').addEventListener('click', function () {
  let  username=usernamef.value
  let  password=passwordf.value

    // Simulate login (Replace this with an actual API call to your server)
    if (username === 'admin' && password === 'admin') { // Dummy check
        alert('Login successful');
        // Show task input section and buttons
          loginc.style.display='none'
          usernamef.value=""
          passwordf.value=""
          task.style.display="block"
          sort.style.display="block"
        document.getElementById('taskInputSection').style.display = 'block';
        document.getElementById('sortBtn').style.display = 'inline-block';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        

    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('logoutBtn').addEventListener('click', function () {
    // Clear task input and hide relevant sections
    alert('Logout successful');
    loginc.style.display="block"
    task.style.display="none"
    sort.style.display="none"
     

    document.getElementById('taskInputSection').style.display = 'none';
    document.getElementById('sortBtn').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('logoutBtn').style.display = 'none';
    tasks = []; // Clear tasks on logout
    displayTasks();
});

// Add task to the task array
document.getElementById('addTaskBtn').addEventListener('click', function () {
    let description = document.getElementById('taskDescription').value;
    let priority = parseInt(document.getElementById('taskPriority').value);

    if (description && priority) {
        tasks.push(new Task(description, priority));
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskPriority').value = '';
        displayTasks();
    }
});

// Function to display the tasks in the task list
function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear current list
    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = `${task.description} (Priority: ${task.priority})`;

        // Edit button
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', function () {
            editTask(index);
        });

        // Delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            deleteTask(index);
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to display sorted tasks
function displaySortedTasks(sortedTasks) {
    let sortedTaskList = document.getElementById('sortedTaskList');
    sortedTaskList.innerHTML = '';  // Clear current sorted list
    sortedTasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = `${task.description} (Priority: ${task.priority})`;
        sortedTaskList.appendChild(li);
    });
}

// Sort button functionality
document.getElementById('sortBtn').addEventListener('click', function () {
    let sortedTasks = quickSort(tasks);
    displaySortedTasks(sortedTasks);
});

// Edit a task
function editTask(index) {
    let newDescription = prompt("Edit task description:", tasks[index].description);
    let newPriority = prompt("Edit task priority:", tasks[index].priority);

    if (newDescription && newPriority) {
        tasks[index].description = newDescription;
        tasks[index].priority = parseInt(newPriority);
        displayTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}
