export default function makeUUID() {
    //generate an 8 digit random hexadecimal number and append 'v' to the beginning
    return 'V' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
}