export const isValidName = (name) => {
    name = name.trim();
    if (name.length === 0) return false;
    let validChars = /^[a-zA-Z]+(?:['-]?[a-zA-Z]+)*$/;
    if (!validChars.test(name)) return false;
    if (name.length < 2 || name.length > 24) return false;
    let vowels = name.match(/[aeiou]/gi);
    let consonants = name.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    if (!vowels || !consonants || (vowels.length / name.length < 0.1 || consonants.length / name.length < 0.1)) {
        return false;
    }
    return true;
};

export const isValidEmail = (email) => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return emailRegex.test(email);
};

export const phoneNumberAutoFormat = (phoneNumber) => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, "");
    if (number.length < 4) return number;
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
    if (number.length < 11) return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
    return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const isAlphabetic = (str) => {
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        if (!(char > 64 && char < 91) && !(char > 96 && char < 123)) {
            return false;
        }
    }
    return true;
};