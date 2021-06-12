const showKeyBtn = document.querySelector('#showKey');

showKeyBtn.addEventListener('click', function (e) {
    // keyInput declared in randomKey.js which loaded before this JS
    
    if(keyInput.type === 'password') {
        keyInput.type = 'text';
    } else if (keyInput.type === 'text') {
        keyInput.type = 'password'
    }
})

const showKeyIndexBtns = document.querySelectorAll('[data-key-visibility]');

showKeyIndexBtns.forEach((key, i) => {
    key.addEventListener('click', (e) => {
        let input = document.querySelector(`#key${i}`)
        if(input.type === 'text') {
            input.type = 'password'
        } else if(input.type === 'password') {
            input.type = 'text'
        }
        else {
            return;
        }
    })
})

const showKeyEditBtns = document.querySelectorAll('[data-key-edit-show]');
showKeyEditBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        let input = document.querySelector(`#keyEdit${i}`)
        if(input.type === 'text') {
            input.type = 'password'
        } else if(input.type === 'password') {
            input.type = 'text'
        }
        else {
            return;
        }
    })
})