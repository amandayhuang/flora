import timesTable from './datasets/times_table';
import { randomizeData } from './util/util'
import "./styles/index.scss";
import Drop from './drop'

let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const c = canvas.getContext('2d');


let drops = makeDrops();
makeRain(drops);



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
    requestAnimationFrame(makeRain);
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