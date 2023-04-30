const myShoppingList = () => {
    const button = document.getElementById('enter');
    const input = document.getElementById('userinput');
    const ul = document.querySelector('ul');
    const btnClear = document.getElementById('clear');
    const listItems = document.querySelectorAll('#myList li');
    const search = document.getElementById('userSearch');
    const btnSearch = document.getElementById('search');

    const inputLength = () => {
        return input.value.length;
    };

    const createListElement = () => {
        let createLi = document.createElement('li');
        createLi.appendChild(document.createTextNode(input.value));
        addDeleteButton(createLi);
        ul.appendChild(createLi);
        input.value = '';
        updatedList();
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

    const checkListFromItem = () => {
        checkList(listItems, search.value);
    };

    const clearList = () => {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    };

    const checkList = (list, lookingFor) => {
        for (let i = 0; i < list.length; i++) {
            let itemText = list[i].firstChild.textContent;
            if (itemText.toLowerCase() === lookingFor.toLowerCase()) {
                return console.log(itemText);
                // return `${lookingFor} is in your list`;
            }
        }
        return 'that does not exist in your list';
    };

    button.addEventListener('click', addListAfterClick);
    btnClear.addEventListener('click', clearList);
    input.addEventListener('keypress', addListAfterKeypress);
    btnSearch.addEventListener('click', checkListFromItem);

    const addDeleteButton = (parent) => {
        let button = parent.appendChild(document.createElement('button'));
        button.appendChild(document.createTextNode('delete'));
        button.id = 'btn_delete';
        button.onclick = removeList;
    };

    //function to add the 'line through' style
    const toggleList = (element) => {
        element.classList.toggle('done');
    };

    const removeList = (event) => {
        if (event.target.tagName === 'BUTTON') {
            event.target.parentElement.remove();
            updatedList();
        } else {
            console.error('Error');
        }
    };

    listItems.forEach((element) => {
        addDeleteButton(element);
        element.addEventListener('click', () => {
            if (element !== undefined) {
                toggleList(element);
            }
        });
    });

    const updatedList = () => {
        const listItems = document.querySelectorAll('#myList li');
        const listValues = Array.from(listItems).map(item => item.firstChild.textContent);
        localStorage.setItem('myList', JSON.stringify(listValues));
    };

    const loadListValue = () => {
        const savedListValue = localStorage.getItem('myList');
        if (savedListValue) {
            const parsedListValue = JSON.parse(savedListValue);

            const list = document.querySelector('#myList');

            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            parsedListValue.forEach(value => {
                let createLi = document.createElement('li');
                createLi.appendChild(document.createTextNode(value));
                addDeleteButton(createLi);
                list.appendChild(createLi);
            });
        } 
    };

    const loadButton = document.querySelector('#load_button');
    loadButton.onclick = loadListValue;
    loadButton.addEventListener('click', () => {
        const listValue = document.querySelector('#myList').value;
        updatedList(listValue);
    });
    window.onload = loadListValue;
};
myShoppingList();
