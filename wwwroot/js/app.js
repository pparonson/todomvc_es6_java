$(document).ready(() => {
    console.log('READY');
    views.displayTodos();
    views.toggleAll();
    views.addTodo();
    views.editTodo();
    views.deleteTodo();
    views.toggleCompleted();
    views.displayTodos();
});
const todoList = {
    todos: [],
    // displayTodos() {
    //     if (this.todos.length > 0) {
    //             this.todos.forEach(todo => {
    //                 const { todoText, completed } = todo;
    //                 console.log(todoText, completed);
    //             });
    //     } else {
    //         console.log('Empty!');
    //     }
    // },
    addTodo(todoText = null) {
        if (!(todoText)) {
            alert('Enter a value');
        } else {
            this.todos.push({
                todoText,
                completed: false
            });
            views.displayTodos();
        }
    },
    editTodo(position = null, todoText = null) {
        this.todos[position].todoText = todoText;
        views.displayTodos();
    },
    deleteTodo(position) {
        this.todos.splice(position, 1);
        views.displayTodos();
    },
    toggleCompleted(position) {
        // destructure array; obj
        let { completed } = this.todos[position];
        this.todos[position].completed = !(completed);
        views.displayTodos();
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
        views.displayTodos();
    }
}; // end: todoList
const views = {
    toggleAll() {
        const toggleAllButton = $('#toggleAllButton').click(() => {
            todoList.toggleAll();
        });
    },
    addTodo() {
        const addTodoButton = $('#addTodoButton');
        $(addTodoButton).click(() => {
            const addTodoTextInput = $('#addTodoTextInput');
            todoList.addTodo(addTodoTextInput.val());
            addTodoTextInput.val(null);
        });
    },
    editTodo() {
        const editTodoButton = $('#editTodoButton');
        $(editTodoButton).click(() => {
            const editTodoPositionInput = $('#editTodoPositionInput');
            const editTodoTextInput = $('#editTodoTextInput');
            todoList.editTodo(editTodoPositionInput.val(),
                editTodoTextInput.val());
            editTodoPositionInput.val(null);
            editTodoTextInput.val(null);
        });
    },
    deleteTodo() {
        const deleteTodoButton = $('#deleteTodoButton');
        $(deleteTodoButton).click(() => {
            const deleteTodoPositionInput = $('#deleteTodoPositionInput');
            todoList.deleteTodo(deleteTodoPositionInput.val());
            deleteTodoPositionInput.val(null);
        });
    },
    toggleCompleted() {
        const toggleCompletedButton = $('#toggleCompletedButton');
        $(toggleCompletedButton).click(() => {
            const toggleCompletedPositionInput =
                $('#toggleCompletedPositionInput');
            todoList.toggleCompleted(toggleCompletedPositionInput.val());
            toggleCompletedPositionInput.val(null);
        });
    },
    displayTodos() {
        // There should be an li tag element for every todo item
        const todosUl = $('ul');
        todosUl.addClass('todosUl');
        $('.todosUl').html('');
        todoList.todos.forEach(todo => {
            const todoLi = $("<li></li>");
            const { todoText, completed } = todo;
            $(todoLi).attr('id', todoList.todos.indexOf(todo));
            let todoTextWithCompletion = '';
            if (todo.completed) {
                todoTextWithCompletion = `(X) ${ todo.todoText }`;
            } else {
                todoTextWithCompletion = `( ) ${ todo.todoText }`;
            }
            console.log(todoTextWithCompletion);
            $(todosUl).append(todoLi.text(todoTextWithCompletion));
            $(todoLi).append(this.createDeleteTodoButton());
        });
    },
    createDeleteTodoButton() {
        const deleteTodoButton = $('<button></button>');
        deleteTodoButton.addClass('deleteTodoButton btn btn-default')
            .text('Delete');
        return deleteTodoButton;
    }

}; // end: views
