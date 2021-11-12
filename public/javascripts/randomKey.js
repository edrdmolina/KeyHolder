const randomKeyBtn = document.querySelector('#randomKey');
const keyInput = document.querySelector('#key');

randomKeyBtn.addEventListener('click', function (e) {
    keyInput.value = '';
    let key = generateKey();
    keyInput.value = key;
})

const keyEditRandomBtns = document.querySelectorAll('[data-key-edit-randomize]')
keyEditRandomBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        let input = document.querySelector(`#keyEdit${i}`)
        input.value = ''
        let newKey = generateKey();
        input.value = newKey;
    })
})

// determines the length of password
const passwordLength = 32;

// Returns a random ASCII character suitable for passwords
const getRandomASCII = () => {
    // random suitable character digit
    let r = Math.floor(Math.random() * 89) + 33;
    // if not suitable callback function
    if (r === 34 || r === 37 || r === 39 ||
        r === 92 || r === 95 ||
        r >= 44 && r <= 47) {
        return getRandomASCII();
    } else {
        // if suitable convert number to ASCII and return
        return String.fromCharCode(r);
    }
}

const generateKey = () => {
    // initializes empty string for password storage
    let password = '';
    // generates password
    for (let i = 0; i < passwordLength; i++) {
        password += getRandomASCII();
    }
    return password;
}
