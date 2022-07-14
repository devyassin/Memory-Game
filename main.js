"use strict"

const start=document.querySelector('.control-buttons span');
const UserName=document.querySelector('.name span');
const blocksContainer=document.querySelector('.memory-game-blocks');
let duration=1000;

start.addEventListener('click',()=>{
    const value=prompt(`What's ur name ?`);
    if(value===null || value===''){
        UserName.innerHTML='Unknown';
    }else{
        UserName.innerHTML=value;
    }
    start.closest('.control-buttons').style.display='none';
});

let blocks=Array.from(blocksContainer.children);
console.log(blocks);