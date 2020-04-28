import timesTable from './datasets/times_table';
import stateCapitals from './datasets/state_capitals';
import { randomizeData } from './util/util'
import "./styles/index.scss";
import Drop from './drop'
import Cloud from './cloud'

let sets = {
    "timesTable": timesTable,
    "stateCapitals": stateCapitals
}

//set up canvas
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c = canvas.getContext('2d');

// set up vars
var questionIndex = 0;
var numCorrect = 0;
var dataset = [];
const input = document.getElementById('answer-form');
const picker = document.getElementById('picker-form');
const scoreBox = document.getElementById('score-box');
const previousAnswer = document.getElementById('previous-answer');
const questionText = document.getElementById('question-text');
const previousBox = document.getElementById('previous');
const answerForm = document.getElementById('answer-form');
let currentAnswer = '';
let currentQuestion = '';
input.addEventListener('submit', handleSubmit);
picker.addEventListener('submit', handlePicker);

// canvas
var drops;
var num = 0;
var clouds;
var cloudNum = 0;


function startSession(datasetName){
    answerForm.classList.add('active');
    numCorrect = 0;
    questionIndex = 0;
    dataset = randomizeData(sets[datasetName]);
    dataset = dataset.slice(0, 10);
    scoreBox.innerHTML = '';
    previousAnswer.innerHTML = '';
    previousBox.classList.remove('active');
    setQuestion();
}

function setQuestion(){
    questionIndex++;
    currentQuestion = dataset[questionIndex-1].question;
    currentAnswer = dataset[questionIndex-1].answer.toString();
    questionText.innerHTML = `${currentQuestion} (${questionIndex} of ${dataset.length})`;
}

function handlePicker(e){
    e.preventDefault();
    const dropdown = document.getElementById('dropdown');
    if(sets[dropdown.value] !== undefined){
        startSession(dropdown.value);
    }
}

function handleSubmit(e){
    e.preventDefault();
    let input = document.getElementById('answer');
    previousBox.classList.add('active');
    // let answer = e.srcElement.elements[0].form.elements[0].value;
    let answer = input.value;
    input.value = '';
    if(answer.toLowerCase() === currentAnswer.toLowerCase()){
        previousAnswer.innerHTML = `${currentQuestion} ✓ ${currentAnswer}`;
        numCorrect ++;
        drops = makeDrops();
        makeRain();
    }else{
        previousAnswer.innerHTML = `${currentQuestion} ✖ ${currentAnswer}`;
        //incorrect answer visual
        clouds = makeClouds();
        makeCloudsAppear();
    }

    
    let percent = Math.round(numCorrect/questionIndex*100);
    if(questionIndex < dataset.length){
        scoreBox.innerHTML = `${numCorrect} correct of ${questionIndex} (${percent}%)`;
        setQuestion();
    }else{
        scoreBox.innerHTML = `Final score: ${numCorrect} correct of ${questionIndex} (${percent}%)`;
        summarizeAndReset();
    }
}

function summarizeAndReset(){
    answerForm.classList.remove('active');
    questionText.innerHTML = "Good studying! Your plant is grown :)";
    const summary = document.getElementById('summary');
}

function makeDrops(){
    let drops = [];
    for (let i = 0; i < 60; i++) {
        let x = Math.random()*canvas.width;
        let y = Math.random() - Math.random() * 400;
        let xVel = (Math.random() + 0.5) * 7;
        let yVel = (Math.random() + 0.5) * 7;
        let drop = new Drop(x, y, xVel, yVel, 10,c);
        drops.push(drop);
    }
    return drops;
}

function makeClouds() {
    let clouds = [];
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let xVel = (Math.random() + 0.5) * 3;
        let yVel = (Math.random() + 0.5) * 3;
        let cloud = new Cloud(x, y, xVel, yVel, c);
        clouds.push(cloud);
    }
    return clouds;
}

function makeRain(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    if(num < 270){
        num +=1;
        requestAnimationFrame(makeRain);
        console.log(num);
        c.beginPath();
        c.arc(0, 0, 130, 0, Math.PI * 2, false);
        c.strokeStyle = 'orange';
        c.fillStyle = 'orange';
        c.stroke();
        c.fill();
        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];
            drop.update();
        }
    }else{
        c.clearRect(0, 0, canvas.width, canvas.height);
        num = 0;
    }
    
}

function makeCloudsAppear() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (cloudNum < 310) {
        cloudNum += 1;
        requestAnimationFrame(makeCloudsAppear);
        for (let i = 0; i < clouds.length; i++) {
            const cloud = clouds[i];
            cloud.update();
        }
    } else {
        c.clearRect(0, 0, canvas.width, canvas.height);
        cloudNum = 0;
    }
}




// window.addEventListener("DOMContentLoaded", () => {
//     const header = document.createElement("h1");
//     let canvas = document.querySelector('canvas');
//     const c = canvas.getContext('2d');
//     c.fillStyle = "pink";
//     c.fillRect(100,100,50,50);
//     c.fillRect(10, 10, 30, 30);
//     c.fillRect(20, 20, 30, 30);
//     c.fillRect(30, 30, 30, 30);
//     c.beginPath();
//     c.moveTo(50,80);
//     c.lineTo(80,190);
//     c.strokeStyle = "pink";
//     c.stroke();
//     document.body.append(header);
//     header.innerHTML = "Hello friend";
// });