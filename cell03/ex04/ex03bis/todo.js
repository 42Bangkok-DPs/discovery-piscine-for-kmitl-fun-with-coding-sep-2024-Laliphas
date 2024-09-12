$(document).ready(function(){

    load();

    $('#new-btn').on('click', function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
        }
    });

    function addTodo(text) {
        const div = $('<div>').addClass('todo');
        const todoText = $('<span>').text(text);
        const removeButton = $('<button>').text('X').addClass('removeBTN');

        removeButton.on('click', function(event) {
            event.stopPropagation();
            if (confirm('Do you want to remove this to-do?')) {
                div.remove();
                saveTodos();
            }
        });

        div.append(todoText,removeButton);
        $('#ft_list').prepend(div);
        saveTodos();
    }
    
    function saveTodos() {
        const todos = $.map($('#ft_list').children(),function(todo){
            return $(todo).find('span').text();
        })
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
    }


    function load() {
        const cookies = document.cookie.split('; ');
        const todosCookie = cookies.find(cookie => cookie.startsWith('todos='));
        if (todosCookie) {
            const todos = JSON.parse(decodeURIComponent(todosCookie.split('=')[1]));
            todos.forEach(todo => addTodo(todo));
        }
    }
})