$(document).ready(() => {
    'use strict';
    views.displayTodos();
    views.toggleAll();
    views.addTodo();
});
const todoList = {
    todos: [],
    displayTodos() {
        if (this.todos.length > 0) {
                this.todos.forEach(todo => {
                    const { todoText, completed } = todo;
                    console.log(todoText, completed);
                });
        } else {
            console.log('Empty!');
        }
    },
    addTodo(todoText = null) {
        this.todos.push({
            todoText,
            completed: false
        });
        this.displayTodos();
    },
    editTodo(position = null, todoText = null) {
        this.todos[position].todoText = todoText;
        this.displayTodos();
    },
    deleteTodo(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    toggleCompleted(position) {
        // destructure array; obj
        let { completed } = this.todos[position];
        this.todos[position].completed = !(completed);
        this.displayTodos();
    },
    toggleAll() {
        // Case 1: .toggleAll: If everything is true; Make everything false
        const isAllTrue = this.todos.every(todo => todo.completed);
        if (isAllTrue) {
            this.todos.forEach(todo => todo.completed = false);
        } else {
            // Case 2: .toggleAll: Otherwise, make everything true
            this.todos.forEach(todo => todo.completed = true);
        }
        this.displayTodos();
    }
}; // end: todoList
const views = {
    displayTodos() {
        const displayTodosButton = $('#displayTodosButton').click(() => {
            todoList.displayTodos();
        });
    },
    toggleAll() {
        const toggleAllButton = $('#toggleAllButton').click(() => {
            todoList.toggleAll();
        });
    },
    addTodo() {
        const addTodoButton = document.getElementById('addTodoButton');
        addTodoButton.addEventListener('click', () => {
            const todoText = document.getElementById('addTodoTextInput');
            console.log(`Todotext.value ${todoText.value}`);
            todoList.addTodo(todoText.value);
        });
    }
    addTodo: function() {
        const addTodoButton = document.getElementById('addTodoButton');
        addTodoButton.addEventListener('click', () => {
            const addTodoTextInput = document.getElementById('addTodoTextInput');

            todoList.addTodo(addTodoTextInput.value);
        });
        // addTodoTextInput.value = '';
    }
}; // end: views
