"use strict"

const readText = document.getElementById("read-text")
const writeText = document.getElementById("write-text")
const inputText = document.getElementById("text")
writeText.addEventListener('keyup', keytracker)

let words = [] //Gives a list of randomized words
let wordCounter = 0 //Track the Word you have to write
let points = 0
let rightWords = 0 //For Counting the right words
let wrongWords = 0 //For Counting the wrong words
let wordMarker = null //For mark the words green or red if you write them right or wrong
let startTime = 0 
let neededTime = 0
let wpm = 0
let accuracy = 0
//readingTracker()
function keytracker (e) {
    let key = e.key;
    if (key === " ") {
        wordChecker(inputText.value)
        if (wordCounter === 10) {
            showTime()
            resetWords()
        }
        readingTracker()
        inputText.value = null
    } if (key === "Enter") {

    } if (startTime === 0) {
        startTime = Date.now()
    }
}

function getEnglishWords () {
    let e = fetch('https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt')
    .then(res => {return res.text()})
    .then(data => {
        let words = []
        for (let i = 0; i < 10; i++) {
            let randomnumber = getRandomInt(999)
            words.push(data.split('\n')[randomnumber])
        }
        return words
    })
    return e
}

function wordChecker (inputword) {
    const word = inputword.slice(0, inputword.length - 1)
    console.log(word)
    console.log(words[wordCounter])
    if (words[wordCounter] === word) {
        rightWords++
        wordMarker = true
    } else {
        wrongWords++
        wordMarker = false
    }
    wordCounter++
}

function randomizeWords() {
    const words = 'moin ich bin der eine oder keine vielleicht kann und'.split(" ")
    words.sort(() => {
        return Math.random() -0.5;
    })
    return words
}


async function giveWords () {
    const words = await getEnglishWords()

    displayTextElement.textContent = ""
    let html = ""
    html += `<span>`
    for (let i in words) {
        html += `<span id="focus-word${i}">${words[i]}</span> `
    }
    html += `</span>`
    displayTextElement.innerHTML += html
    console.log(html)
    readingTracker()
    return words
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function readingTracker () {
    if (wordCounter-1 >= 0) {
        let wordTracker = document.getElementById(`focus-word${wordCounter-1}`)
        wordTracker.classList.remove('text-focus')
        if (wordMarker === true) {
            wordTracker.classList.add('right-word')
        } else {
            wordTracker.classList.add('wrong-word')
        }
    }
    let wordTracker = document.getElementById(`focus-word${wordCounter}`)
    wordTracker.classList.add('text-focus')
    console.log(wordTracker)
}

function resetWords () {
    words = giveWords()
    wordCounter = 0
}

function showTime () {
    neededTime = (Date.now() - startTime) / 60000
    wpm = Math.floor(words.length / neededTime)
    console.log(wpm)
    let htmlwpm = document.getElementById('wpm')
    htmlwpm.textContent = wpm
    startTime = 0

    accuracy = rightWords * 10
    let htmlaccuracy = document.getElementById('accuracy')
    htmlaccuracy.textContent = `${accuracy}%`
    rightWords = 0
}

function start() {
    words = giveWords()
}

start()