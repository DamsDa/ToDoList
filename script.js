document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const todoEntryBox = document.getElementById('todo-entry-box');
    const clearCompletedButton = document.getElementById('clear-completed-button');
    const emptyButton = document.getElementById('empty-button');
    const saveButton = document.getElementById('save-button');

    let itemsArray = [];

    // Save items array to local storage
    function saveList() {
        // if save button is clicked save that list
        if(saveButton.onclick){
            window.localStorage.setItem("items", JSON.stringify(itemsArray));
        }
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
    }

    // Load items array from local storage
    function loadList() {
        itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || [];
        itemsArray.forEach(item => addToDoItemToList(item));
    }

    // Add new item to list
    function addToDoItemToList(text) {
        const listItem = document.createElement('li');
        listItem.innerText = text;
        listItem.ondblclick = function () {
            markToDoItemCompleted(listItem);
        };
        todoList.appendChild(listItem);
    }

    // Add new item to the list when the 'add-button' is clicked
    addButton.onclick = function () {
        if (todoEntryBox.value !== '') {
            addToDoItemToList(todoEntryBox.value);
            itemsArray.push(todoEntryBox.value);
            todoEntryBox.value = '';
            saveList();
        }
    };

    // Clear the completed to-do items from the list
    clearCompletedButton.onclick = function () {
        let itemsToRemove = [];
        todoList.childNodes.forEach(function (item) {
            if (item.style.textDecoration === 'line-through') {
                itemsToRemove.push(item);
            }
        });
        itemsToRemove.forEach(function (item) {
            todoList.removeChild(item);
            itemsArray.splice(itemsArray.indexOf(item.innerText), 1);
        });
        saveList();
    };

    // Empty the list and clear items from local storage
    emptyButton.onclick = function () {
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }
        itemsArray = [];
        localStorage.removeItem('itemsArray');
    };

    // Mark the to-do item as completed by crossing it out
    function markToDoItemCompleted(item) {
        if (item.style.textDecoration === 'line-through') {
            item.style.textDecoration = 'none';
        } else {
            item.style.textDecoration = 'line-through';
        }
        saveList();
    }

    loadList();
});