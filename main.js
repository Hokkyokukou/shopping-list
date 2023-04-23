const myShoppingList = () => {
    const button = document.getElementById('enter');
    const input = document.getElementById('userinput');
    const ul = document.querySelector('ul');
    const btnClear = document.getElementById('clear');
    const li = document.querySelectorAll('li');

    const inputLength = () => {
        return input.value.length;
    };

    const createListElement = () => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(input.value));
        addDeleteButton(li);
        ul.appendChild(li);
        input.value = '';
    };

    const addListAfterClick = () => {
        if (inputLength() > 0) {
            createListElement();
        }
    };

    const addListAfterKeypress = (event) => {
        if (inputLength() > 0 && event.keyCode === 13) {
            createListElement();
        }
    };

    const clearList = () => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    };

    button.addEventListener('click', addListAfterClick);
    btnClear.addEventListener('click', clearList);
    input.addEventListener('keypress', addListAfterKeypress);

    li.forEach((element) => {
        addDeleteButton(element);
        element.addEventListener('click', toggleList); 
    });

    //function to add the 'line through' style
    function toggleList() {
        this.classList.toggle('done');
    }

    function removeList() {
        this.parentElement.remove();
    }

    function addDeleteButton(parent) {
        let button = parent.appendChild(document.createElement('button'));
        button.appendChild(document.createTextNode('delete'));
        button.id = 'btn_delete';
        button.onclick = removeList;
    }

    const updatedList = (listValue) => {
        const list = document.querySelector('#myList');
        list.textContent = listValue;
        if (typeof listValue === 'object' && listValue !== null) {
            localStorage.setItem('myList', JSON.stringify(listValue));
        } else {
            console.error('Invalid JSON string');
        }
    };

    const loadListValue = () => {
        const savedListValue = localStorage.getItem('myList');
        if (savedListValue !== undefined) {
            const parsedListValue = JSON.parse(savedListValue);
            document.querySelector('#myList').textContent = parsedListValue;
            document.querySelector('#saved_list').textContent = 'saved list';
        } else {
            console.error('Invalid JSON string');
        }
    };

    const loadButton = document.querySelector('#load_button');
    loadButton.onclick = loadListValue;
    loadButton.addEventListener('click', () => {
        const listValue = document.querySelector('#myList').value;
        updatedList(listValue);
    });
};
myShoppingList();
