const charRange = document.getElementById('charRange')
const charNumber = document.getElementById('charNumber')
const balance = document.getElementById('balance')
const lowercase = document.getElementById('lower')
const uppercase = document.getElementById('upper')
const numbers = document.getElementById('numbers')
const symbols = document.getElementById('symbols')
const form = document.getElementById('generate')
const display = document.getElementById('display')

charNumber.addEventListener('input', syncCharacterAmount)
charRange.addEventListener('input', syncCharacterAmount)

const hub = {
    lower: getRandomLower,
    upper: getRandomUpper,
    num: getRandomNumber,
    sym: getRandomSymbol
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const charAmount = charNumber.value
    const bal = balance.checked
    const lower = lowercase.checked
    const upper = uppercase.checked
    const num = numbers.checked
    const sym = symbols.checked
    display.innerText = generatePassword(charAmount, bal, lower, upper, num, sym)
})

function generatePassword(charAmount, bal, lower,  upper, num, sym) {
    let password = ''

    // if balance enable we run a foreach loop
    if (bal) {
        let typeArray = [{lower}, {upper}, {num}, {sym}].filter(
            item => Object.values(item)[0]
        )

        if (typeArray.length == 0) return ''

        // make sure each rotation add one of each kind asked by the user
        for (let i = 0; i < charAmount; i += typeArray.length) {
            typeArray.forEach(type => {
                const funcType = Object.keys(type)[0]
                password += hub[funcType]()
            })
        }
        // because on the for loop we increment i up to 4
        // there's risk of passing the number of chars asked
        // that's why we slice the password to the desired amount
        password.slice(0, charAmount);
    } else {
        let codes = []
        if (lower) codes = codes.concat(formArray(97, 122))
        if (upper) codes = codes.concat(formArray(65, 90))
        if (num) codes = codes.concat(formArray(48, 57))
        if (sym) codes = codes.concat(formArray(33, 47)).concat(formArray(58, 63)).concat(formArray(91, 96)).concat(formArray(123, 126))

        for (let i = 0; i < charAmount; i++) {
            password += String.fromCharCode(codes[Math.floor(Math.random() * codes.length)])
        }
    }

    // shuffle password just to make things more irregular
    password = shuffle(password)
    return password
}

function shuffle(array) {
    let curInd = array.length, randInd;

    while (curInd != 0) {
        randInd = Math.floor(Math.random() * curInd);
        curInd--;
    
        // And swap it with the current element.
        [array[curInd], array[randInd]] = [
        array[randInd], array[curInd]];
      }
    
      return array;
}

function formArray(low, high) {
    let array = []
    for (let i = low; i <= high; i++) {
        array[i-low] = i
    }
    return array
}

function syncCharacterAmount(e) {
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    let range = formArray(33, 47).concat(formArray(58, 63)).concat(formArray(91, 96)).concat(formArray(123, 126))
    return String.fromCharCode(range[Math.floor(Math.random() * range.length)])
}
