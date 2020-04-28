import timesTable from './datasets/times_table';
import { randomizeData } from './util/util'
import "./styles/index.scss";
import Drop from './drop'

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
const scoreBox = document.getElementById('score-box');
const questionText = document.getElementById('question-text');
let currentAnswer = '';
input.addEventListener('submit', handleSubmit);

var drops;
var num = 0;
// makeRain();
startSession();

function startSession(){
    dataset = randomizeData(timesTable, 30);
    dataset = dataset.slice(0, 30);
    setQuestion();
}

function setQuestion(){
    questionIndex++;
    questionText.innerHTML = dataset[questionIndex].question;
    currentAnswer = dataset[questionIndex].answer.toString();
}

function handleSubmit(e){
    e.preventDefault();
    let input = document.getElementById('answer');
    // let answer = e.srcElement.elements[0].form.elements[0].value;
    let answer = input.value;
    input.value = '';
    debugger;
    if(answer === currentAnswer){
        numCorrect ++;
        drops = makeDrops();
        makeRain();
    }else{
        //incorrect answer visual
    }

    //update current score

    let percent = Math.round(numCorrect/questionIndex*100);
    
    if(questionIndex < dataset.length){
        scoreBox.innerHTML = `${numCorrect} correct of ${questionIndex} (${percent}%) ${questionIndex}/${dataset.length}`;
        setQuestion();
    }else{
        scoreBox.innerHTML = `Final score: ${numCorrect} correct of ${questionIndex} (${percent}%)`;
        summarizeAndReset();
    }
}

function summarizeAndReset(){
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