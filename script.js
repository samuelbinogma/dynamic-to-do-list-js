// Wait for thr DOM to fully load before running any code
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Get and trim the input value if taskText is not provided
        taskText = taskText || taskInput.value.trim();

        // Check if input in empty
        if (taskText === ''){
            alert('Please enter a task!');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click event to remove button to remove the list item and update Local Storage
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage after removal
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Appemd remove button to list item and list item to task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if adding via input
        if (taskInput.value) {
            taskInput.value = '';
        }
    }

    // Function to load tasks from Local Storage
    function loadTask() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't save when loading
    }

    // Load tasks on page load
    loadTask();

    // Add event listener to the Add Task button
    addButton.addEventListener('click', () => addTask());

    // Add event listener for Enter key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});