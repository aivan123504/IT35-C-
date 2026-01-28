let currentUser = "";

class TodoList {
    constructor() {
        this.editingIndex = -1;
        this.addButton = document.getElementById('addButton');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');

        this.addButton.addEventListener('click', () => this.addOrUpdateTask());
        this.todoList.addEventListener('click', (e) => {
            const item = e.target.closest('.todo-item');
            if (!item) return;

            if (e.target.classList.contains('removeButton')) this.removeTask(item);
            if (e.target.classList.contains('editButton')) this.editTask(item);
        });
    }

    addOrUpdateTask() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        this.editingIndex === -1 ? this.addTask(text) : this.updateTask(text);
        this.todoInput.value = '';
        this.resetEditing();
    }

    addTask(text) {
        const li = document.createElement('li');
        li.className = 'list-group-item todo-item';
        li.innerHTML = `
            <span class="task-text">${text}</span>
            <span class="timestamp" style="display:block; margin-top:0.5rem; color:gray;">
                ${new Date().toLocaleString()}
            </span>
            <div style="margin-top:0.5rem;">
                <button class="btn btn-warning btn-sm editButton">Edit</button>
                <button class="btn btn-danger btn-sm removeButton">Remove</button>
            </div>
        `;
        this.todoList.appendChild(li);
    }

    updateTask(text) {
        this.todoList.children[this.editingIndex].querySelector('.task-text').textContent = text;
    }

    removeTask(item) {
        this.todoList.removeChild(item);
    }

    editTask(item) {
        this.todoInput.value = item.querySelector('.task-text').textContent;
        this.editingIndex = Array.from(this.todoList.children).indexOf(item);
        this.addButton.textContent = 'Update';
    }

    resetEditing() {
        this.editingIndex = -1;
        this.addButton.textContent = 'Add';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => new TodoList());

// Welcome Modal
document.getElementById('submitName').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (!username) return alert("Please enter your name.");

    document.getElementById('welcomeMessage').textContent = `Welcome, ${username}!`;
    new bootstrap.Modal(document.getElementById('welcomeModal')).show();
});
