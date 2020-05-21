window.addEventListener('load', start);

let globalNames = ['Kaka', 'Tata', 'Dudu'];
let globalInputName = null;
let isEditing = false;
let currentIndex = null;

function start() {
    globalInputName = document.querySelector('input');
    preventFormSubmit();
    acitvateInput();
    render();
}

function preventFormSubmit() {
    const form = document.querySelector('form');

    form.addEventListener('submit', handleFormSubimit);

    function handleFormSubimit(event) {
        event.preventDefault();
    }

}

function acitvateInput() {
    globalInputName.focus();
    globalInputName.addEventListener('keyup', handleTyping);

    function updateName(newName) {
        globalNames[currentIndex] = newName;
    }

    function handleTyping(event) {
        let content = event.target.value;
        if (event.key === 'Enter' && content.trim() !== '') {
            if (isEditing) {
                updateName(content);
            } else {
                globalNames.push(content);
            }

            isEditing = false;
            clearInput();
            render();
        }
    }
}

function render() {
    let divNames = document.querySelector('#names');
    let ul = createElems('ul');
    divNames.innerHTML = '';

    function createButton(index) {
        let button = createElems('button', 'x', 'delete');

        button.addEventListener('click', deleteName);

        function deleteName() {
            globalNames.splice(index, 1);
            render();
        }

        return button;
    }

    function createSpan(name, index) {

        function editName() {
            globalInputName.value = name;
            globalInputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        let span = createElems('span', name, 'clickable');

        span.addEventListener('click', editName);

        return span;
    }

    for (let i = 0; i < globalNames.length; i++) {
        let li = createElems('li');
        let button = createButton(i);
        let currentName = createSpan(globalNames[i], i);

        li.appendChild(button);
        li.appendChild(currentName);
        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

function createElems(element, content, className) {
    let elem = document.createElement(element);
    elem.textContent = content;
    elem.classList.add(className);

    return elem;
}



function clearInput() {
    globalInputName.value = '';
    globalInputName.focus();
}
