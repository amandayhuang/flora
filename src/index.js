import timesTable from './datasets/times_table';
import { randomizeData } from './util/util'
import "./styles/index.scss";

console.log(timesTable[0]);
console.log("hello!!");

window.addEventListener("DOMContentLoaded", () =>{
    const header = document.createElement("h1");
    // document.body.append(header);
    // header.innerHTML = "Hello friend";
});


// window.addEventListener("DOMContentLoaded", () => {
//     document.body.classList.add("center");
//     const card = document.createElement("div");
//     card.classList.add("card", "center");
//     card.innerHTML = `<h2>Hello World!</h2>`;
//     document.body.append(card);
//     const imgCard = document.createElement("div");
//     imgCard.classList.add("card", "center", "image-card");
//     document.body.appendChild(imgCard);
// });