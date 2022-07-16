"use strict";

// const start = document.querySelector(".control-buttons span");
const UserName = document.querySelector(".name span");
const blocksContainer = document.querySelector(".memory-game-blocks");
let triesElement = document.querySelector(".tries span");
let duration = 1000;

// start.addEventListener("click", () => {
//   const value = prompt(`What's ur name ?`);
//   if (value === null || value === "") {
//     UserName.innerHTML = "Unknown";
//   } else {
//     UserName.innerHTML = value;
//   }
//   start.closest(".control-buttons").style.display = "none";
// });

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

let shuffle = orderRange.sort(() => Math.random() - 0.5);

blocks.forEach((block, index) => {
  block.style.order = shuffle[index];

  block.addEventListener("click", () => flipBlock(block));
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => blocksContainer.classList.remove("no-clicking"), duration);
}

function checkMatchedBlock(firstBlock, secondBlock) {
  if (firstBlock.dataset.technologie === secondBlock.dataset.technologie) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-much");
    secondBlock.classList.add("has-much");

    document.getElementById("success").play();

  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}
