document.addEventListener('DOMContentLoaded', () => {
    const ftList = document.getElementById('ft_list');
    const newBtn = document.getElementById('new-btn');

    load();

    newBtn.addEventListener('click', () => {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
        }
    });

    function addTodo(text) {
        const div = document.createElement('div');
        div.className = 'todo';
    
        const todoText = document.createElement('span');
        todoText.textContent = text;
        div.appendChild(todoText);
    
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'removeBTN';
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (confirm('Do you want to remove this to-do?')) {
                div.remove();
                saveTodos();
            }
        });
        div.appendChild(removeButton);
    
        ftList.insertBefore(div, ftList.firstChild);
        saveTodos();
    }
    

    function saveTodos() {
        const todos = Array.from(ftList.children).map(todo => todo.textContent);
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
});