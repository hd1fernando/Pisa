document.getElementById('generate')
    .addEventListener("click", () => {
        let iva = generateIVA();
        document.getElementById('fiscalCode').value = iva;
        copyToClipboard(iva);
    });

document.getElementById('generateFC')
    .addEventListener("click", () => {
        let fiscalCode = generateFiscalCode();
        document.getElementById('fiscalCode').value = fiscalCode;
        copyToClipboard(fiscalCode);
    });

document.getElementById('generatePhoneNumber')
    .addEventListener("click", () => {
        let phone = generatePhoneNumber();
        document.getElementById('fiscalCode').value = phone;
        copyToClipboard(phone);
    });

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

let map = {
    "0": 1,
    "1": 0,
    "2": 5,
    "3": 7,
    "4": 9,
    "5": 13,
    "6": 15,
    "7": 17,
    "8": 19,
    "9": 21,
    "A": 1,
    "B": 0,
    "C": 5,
    "D": 7,
    "E": 9,
    "F": 13,
    "G": 15,
    "H": 17,
    "I": 19,
    "J": 21,
    "K": 2,
    "L": 4,
    "M": 18,
    "N": 20,
    "O": 11,
    "P": 3,
    "Q": 6,
    "R": 8,
    "S": 12,
    "T": 14,
    "U": 16,
    "V": 10,
    "W": 22,
    "X": 25,
    "S": 24,
    "Z": 23,
};

let alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
]

function validateFiscalCode(e) {
    let fiscalCode = e;
    fiscalCode = fiscalCode.trim();

    let s = 0;
    if (fiscalCode.length != 16) {
        console.log('maior=', fiscalCode)
        return false;
    }

    for (let i = 0; i < 16; i = i + 2) {
        let number = fiscalCode[i];

        let element = map[number];
        s += element;
    }

    for (let i = 1; i < 15; i = i + 2) {
        let isNumber = Number(fiscalCode[i]) == fiscalCode[i];

        if (isNumber) {
            let element = parseInt(fiscalCode[i]);
            s += element;
        } else {
            let charNum = alphabet.indexOf(fiscalCode[i]);
            let element = parseInt(charNum);
            s += element;
        }
    }

    console.log('s=', s)

    let r = s % 26;
    console.log('r=', r);

    let c = alphabet[r];
    console.log('c=', c);

    if (fiscalCode[15] == c)
        console.log('valid');
    else
        console.log('invalid');
}

function generateFiscalCode() {

    let fiscalCode = '';

    let localAlphabet = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Z',
    ]
    // SSSSSS00S00S000S
    for (let i = 0; i < 6; i++) {
        let randon = Math.floor(Math.random() * (localAlphabet.length - 1));
        fiscalCode += localAlphabet[randon];
    }

    fiscalCode += Math.floor(Math.random() * 10);
    fiscalCode += Math.floor(Math.random() * 10);

    let randon = Math.floor(Math.random() * (localAlphabet.length - 1));
    fiscalCode += localAlphabet[randon];

    fiscalCode += Math.floor(Math.random() * 10);
    fiscalCode += Math.floor(Math.random() * 10);

    randon = Math.floor(Math.random() * (localAlphabet.length - 1));
    fiscalCode += localAlphabet[randon];

    for (let i = 0; i < 3; i++) {
        fiscalCode += Math.floor(Math.random() * 10);
    }

    fiscalCode = fiscalCode.trim();

    let s = 0;
    for (let i = 0; i <= 15; i = i + 2) {
        let number = fiscalCode[i];

        let element = map[number];
        s += element;
    }

    for (let i = 1; i < 15; i = i + 2) {
        let isNumber = Number(fiscalCode[i]) == fiscalCode[i];

        if (isNumber) {
            let element = parseInt(fiscalCode[i]);
            s += element;
        } else {
            let charNum = localAlphabet.indexOf(fiscalCode[i]);
            let element = parseInt(charNum);
            s += element;
        }
    }

    let r = s % 26;

    let c = alphabet[r];

    return fiscalCode + c;
}

function validateIVA(e) {

    let fiscalCode = e;
    console.log('fc=', fiscalCode)

    let s = 0;
    for (let i = 0; i < 10; i = i + 2) {
        s += parseInt(fiscalCode[i]);
    }


    for (let i = 1; i <= 10; i = i + 2) {
        let num = parseInt(fiscalCode[i]) * 2;
        if (num > 9)
            s += (num - 9);
        else
            s += num;
    }

    let r = s % 10;
    let c = parseInt(fiscalCode[10]);

    let result = 'invalid';
    if (r == 0 && c == 0)
        result = 'valid'
    else if (10 - r == c)
        result = 'valid'

    console.log('IVA: ', result);
}

function generateIVA() {

    let initial = '';

    for (let i = 0; i < 10; i++) {
        initial += Math.floor(Math.random() * 10);
    }

    initial = initial.trim();

    let s = 0;
    for (let i = 0; i < 10; i = i + 2) {
        s += parseInt(initial[i]);
    }

    for (let i = 1; i <= 10; i = i + 2) {
        let num = parseInt(initial[i]) * 2;
        if (num > 9)
            s += (num - 9);
        else
            s += num;
    }

    let r = s % 10;
    let c = 0;

    c = r == 0 ? 0 : 10 - r;

    let generateFiscalCode = initial + c;

    return generateFiscalCode;
}

function generatePhoneNumber() {
    let min = 111111111;
    let max = 999999999;
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    let newNumber = '393' + rand;
    return newNumber;
}