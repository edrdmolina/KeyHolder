const copyKeyBtns = document.querySelectorAll('[data-key-copy]');

copyKeyBtns.forEach((key, i) => {
    key.addEventListener('click', (e) => {
        let input = document.querySelector(`#key${i}`);
        console.log(input);
        navigator.clipboard.writeText(input.value);
    });
});
