$(document).ready(() => {
    console.log('READY');
    views.toggleAll();
    views.addTodo();
    views.setUpEventListeners();
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
        const { completed } = this.todos[position];
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
        // $('form').submit(() => {
        //     const addTodoTextInput = $('#addTodoTextInput');
        //     todoList.addTodo(addTodoTextInput.val());
        //     console.log(addTodoTextInput.val());
        //     addTodoTextInput.val(null);
        // });
    },
    editTodo(position, todoText) {

        todoList.editTodo(position, todoText);
    },
    deleteTodo(position) {
        todoList.deleteTodo(position);
    },
    toggleCompleted(position) {
        todoList.toggleCompleted(position);
    },
    displayTodos() {
        // There should be an li tag element for every todo item
        const todosUl = $('ul');
        todosUl.addClass('todosUl');
        $('.todosUl').html('');
        todoList.todos.forEach(todo => {
            // const divInputGroup = $('<div></div>');
            // divInputGroup.addClass('input-group');

            const todoLi = $('<li></li>');
            todoLi.addClass('input-group');


            const { todoText, completed } = todo;
            $(todoLi).attr('id', todoList.todos.indexOf(todo));
            let todoTextWithCompletion = '';
            if (todo.completed) {
                todoTextWithCompletion = `(X) ${ todo.todoText }`;
            } else {
                todoTextWithCompletion = `( ) ${ todo.todoText }`;
            }
            $(todosUl).append(todoLi.text(todoTextWithCompletion));
            // $(todosUl).append(todoLi);

            $(todoLi).prepend(this.createEditTodoTextInput());
            $(todoLi).prepend(this.createToggleCompletedButton());
            $(todoLi).append(this.createEditTodoButton());
            $(todoLi).append(this.createDeleteTodoButton());
        });
    },
    createToggleCompletedButton() {
        const toggleCompletedButton = $('<button></button>');
        toggleCompletedButton.addClass(
            "toggleCompletedButton btn btn-info input-group-button")
            .text('Toggle');

        // const toggleCompletedSpan = $('<span></span>');
        // toggleCompletedSpan.hasClass('input-group-button');
        // const toggleCompletedButton = $('<button></button>');
        // toggleCompletedButton.addClass("toggleCompletedButton btn btn-info")
        //     .text('Toggle');
        //
        // const toggleCompleted = $(toggleCompletedSpan)
        //     .append(toggleCompletedButton);
        return toggleCompletedButton;
        // return toggleCompleted;
    },
    createDeleteTodoButton() {
        const deleteTodoButton = $('<button></button>');
        deleteTodoButton.addClass(
            "deleteTodoButton btn btn-danger")
            .text('Delete');
        return deleteTodoButton;
    },
    createEditTodoButton() {
        const editTodoButton = $('<button></button>');
        editTodoButton.addClass(
            "editTodoButton btn btn-warning").text('Edit');
        return editTodoButton;
    },
    createEditTodoTextInput() {
        const editTodoTextInput = $('<input type="text">');
        editTodoTextInput.addClass("editTodoTextInput form-control");
        return editTodoTextInput;
    },
    setUpEventListeners() {
        const todoUl = $('ul');
        todoUl.click(event => {
            // use destructuring to obtain target and id prop of event obj
            const { target } = event;
            const { target: { parentNode: parentNode} } = event;
            const { target: {parentNode: {id: id } } } = event;

            if ($(target).hasClass('toggleCompletedButton')) {
                console.log(target);
                this.toggleCompleted(parseInt(id));
            } else if ($(target).hasClass('deleteTodoButton')) {
                console.log(id);
                this.deleteTodo(parseInt(id));
            } else if ($(target).hasClass('editTodoTextInput')) {
                $(parentNode).append(this.createEditTodoTextInput());

            } else if ($(target).hasClass('editTodoButton')) {
                // need a positon and todoText to pass to this.editTodo();


                // this.editTodo(parseInt(id), editTodoTextInput);

            } else {
                console.log(event);
                console.log(event.target);
            }
        });
    }
}; // end: views
