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

            const todoLi = $('<li class="input-group"></li>');
            const todoLiInputDiv = $('<div></div>');
            const spanToggleCompletedButton =
                $('<span class="input-group-btn"></span>');
            const spanDeleteTodoButton =
                $('<span class="input-group-btn"></span>');
            const todoLiInput =
                $('<input type="text" class="todoTextInput form-control">');

            const { todoText, completed } = todo;
            $(todoLi).attr('id', todoList.todos.indexOf(todo));
            let todoTextWithCompletion = '';

            if (todo.completed) {
                todoTextWithCompletion = todoLiInput
                    .val(todo.todoText)
                    .css('text-decoration', 'line-through');
                // logic to add checkmark to toggleCompleted === true button

            } else {
                todoTextWithCompletion = todoLiInput
                    .val(todo.todoText);
            }

            todosUl.append(todoLi.append(todoLiInputDiv
                .append(todoTextWithCompletion)));



            // todoLi.prepend(this.createEditTodoTextInput());
            todoLi.prepend(spanToggleCompletedButton
                .append(this.createToggleCompletedButton()));
            todoLi.append(spanDeleteTodoButton.append(this.createDeleteTodoButton()));
        });
    },
    createToggleCompletedButton() {
        const toggleCompletedButton = $('<button></button>');
        const fontAwesomeIcon =
            $('<i class="fa fa-square-o" aria-hidden="true"></i>');
        toggleCompletedButton
            .addClass('toggleCompletedButton btn');
        toggleCompletedButton.append(fontAwesomeIcon);
        return toggleCompletedButton;
    },
    createDeleteTodoButton() {
        const deleteTodoButton = $('<button></button>');
        const fontAwesomeIcon =
            ('<i class="fa fa-trash-o" aria-hidden="true"></i>');

        deleteTodoButton.addClass("deleteTodoButton btn");
        deleteTodoButton.append(fontAwesomeIcon);
        return deleteTodoButton;
    },
    createEditTodoButton() {
        const editTodoButton = $('<button></button>');
        editTodoButton.addClass(
            "editTodoButton btn btn-warning").text('Edit');
        return editTodoButton;
    },
    // createEditTodoTextInput() {
    //     const editTodoTextInput = $('<input type="text">');
    //     editTodoTextInput.addClass("editTodoTextInput form-control");
    //     return editTodoTextInput;
    // },
    setUpEventListeners() {
        const todoUl = $('ul');
        todoUl.click(event => {
            // use destructuring to obtain target and id prop of event obj
            const { target } = event;
            const { target: { parentNode: parentNode} } = event;
            const { target: {parentNode: {id: id } } } = event;

            if ( $(target).hasClass('toggleCompletedButton') ) {
                console.log('target: ', target);
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

// scratch
const el = $('button.deleteTodoButton');
const indexFromElement = (el) => {

};
