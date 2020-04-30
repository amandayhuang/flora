import timesTable from './datasets/times_table';
import stateCapitals from './datasets/state_capitals';
import periodicTable from './datasets/periodic_table';
import { randomizeData } from './util/util'
import "./styles/index.scss";
import Drop from './drop'
import Cloud from './cloud'
import Bolt from './bolt'
import Sun from './sun'
import Result from './result'

let sets = {
    "timesTable": timesTable,
    "stateCapitals": stateCapitals,
    "periodicTable": periodicTable
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
var bolts;
var sun;
var result;

// set up plant
let pots = ['pot_1','pot_2','pot_3','pot_4'];
let plants = [
    { "name": 'fiddle', 'caption': 'Figure 1: Ficus lyrata' },
    { "name": 'snake', 'caption': 'Figure 1: Dracaena trifasciata' },
    { "name": 'monstera', 'caption': 'Figure 1: Monstera deliciosa'}
];
let potImage = document.getElementById('pot');
let l1 = document.getElementById('l1');
let l2 = document.getElementById('l2');
let l3 = document.getElementById('l3');
let l4 = document.getElementById('l4');
let caption = document.getElementById('caption');

var pot = pots[Math.floor(Math.random() * pots.length)];
var plant = plants[Math.floor(Math.random() * plants.length)];
caption.innerHTML = plant.caption;
l1.classList.add(`${plant.name}-l1`);
l2.classList.add(`${plant.name}-l2`);
l3.classList.add(`${plant.name}-l3`);
l4.classList.add(`${plant.name}-l4`);
potImage.src = `src/images/${pot}.png`;
l1.src = `../src/images/${plant.name}_2.png`;
l2.src = `../src/images/${plant.name}_2.png`;
l3.src = `../src/images/${plant.name}_1.png`;
l4.src = `../src/images/${plant.name}_1.png`;
let firstSession = true;

function startSession(datasetName){
    if(firstSession === false){
        l1.classList.remove(`${plant.name}-l1`);
        l2.classList.remove(`${plant.name}-l2`);
        l3.classList.remove(`${plant.name}-l3`);
        l4.classList.remove(`${plant.name}-l4`);
        l2.classList.remove('appear');
        l3.classList.remove('appear');
        l4.classList.remove('appear');
        pot = pots[Math.floor(Math.random() * pots.length)];
        plant = plants[Math.floor(Math.random() * plants.length)];
        caption.innerHTML = plant.caption;
        l1.classList.add(`${plant.name}-l1`);
        l2.classList.add(`${plant.name}-l2`);
        l3.classList.add(`${plant.name}-l3`);
        l4.classList.add(`${plant.name}-l4`);
        potImage.src = `../src/images/${pot}.png`;
        l1.src = `../src/images/${plant.name}_2.png`;
        l2.src = `../src/images/${plant.name}_2.png`;
        l3.src = `../src/images/${plant.name}_1.png`;
        l4.src = `../src/images/${plant.name}_1.png`;
        let firstSession = true;
    }
    firstSession = false;
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
        if(numCorrect === 2){
            l3.classList.add('appear');
        }
        if (numCorrect === 4) {
            l2.classList.add('appear');
        }
        if (numCorrect === 7) {
            l4.classList.add('appear');
        }
        drops = makeDrops();
        sun = new Sun(-80,-80,1,1,c);
        makeRain();
    }else{
        previousAnswer.innerHTML = `${currentQuestion} ✖ ${currentAnswer}`;
        bolts = makeBolts();
        clouds = makeClouds();
        result = new Result(canvas.width / 2-50, canvas.height / 2-50, 0, 0, c, 'src/images/incorrect.png');
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
    drops = [];
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

function makeBolts() {
    let bolts = [];
    for (let i = 0; i < 3; i++) {
        let x = Math.random() * 50;
        let y = Math.random() * 50;
        let xVel = (Math.random() + 0.5) * 7;
        let yVel = (Math.random() + 0.5) * 7;
        let bolt = new Bolt(x, y, xVel, yVel, c);
        bolts.push(bolt);
    }
    return bolts;
}

function makeRain(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    if(num < 200){
        c.fillStyle = '#daffc4';
        c.fillRect(0, 0, window.innerWidth, window.innerHeight);
        num +=1;
        requestAnimationFrame(makeRain);
        sun.update();
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
    if (cloudNum < 230) {
        c.fillStyle = '#ff9191';
        c.fillRect(0,0,window.innerWidth,window.innerHeight);
        cloudNum += 1;
        requestAnimationFrame(makeCloudsAppear);
        for (let i = 0; i < clouds.length; i++) {
            const cloud = clouds[i];
            cloud.update();
        }
        for (let i = 0; i < bolts.length; i++) {
            const bolt = bolts[i];
            bolt.update();
        }
        // result.update();
    } else {
        c.clearRect(0, 0, canvas.width, canvas.height);
        cloudNum = 0;
    }
}