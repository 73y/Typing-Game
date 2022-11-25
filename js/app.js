
const englishWordList = 'https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt'
const displayTextElement = document.getElementById("displayText")
const inputTextElement = document.getElementById("text")

inputTextElement.addEventListener('keyup', (e) => {
    inputChecker()
    if (e.key === " ") return inputTextElement.value = null
})

function getRandomWords (WordList) {
    return fetch(WordList)
        .then(res => {return res.text()})
        .then(data => {
            return getSentence(data)
    })
}

async function renderNewWords () {
    const randomWords = await getRandomWords(englishWordList)
    displayTextElement.innerHTML = ""
    randomWords.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        displayTextElement.appendChild(characterSpan)
    })
    //readText.innerText = randomWords
}

renderNewWords()


//Small functions

function inputChecker() {
    const textArray = displayTextElement.querySelectorAll('span')
    const inputArray = inputTextElement.value.split('')
    textArray.forEach((characterSpan, index) => {
        const character = inputArray[index]
        console.log(index)
        if (character === characterSpan.innerText) return characterSpan.classList.add('right-word')
        //inputTextElement.value.length
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getSentence (data) {
    let words = ""
    const totalWords = data.split("\n").length
    for (let i = 0; i < 10; i++) {
        words += `${data.split('\n')[getRandomInt(totalWords)]} `
    }
    return words
}