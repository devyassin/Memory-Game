"use strict";

// const start = document.querySelector(".control-buttons span");
const UserName = document.querySelector(".name span");
const blocksContainer = document.querySelector(".memory-game-blocks");
let triesElement = document.querySelector(".tries span");
let duration = 1000;

class Memory {
  blocks = Array.from(blocksContainer.children);
  constructor() {
    this._randomOrder();
  }

  // random order for cards (change the order randomly each time we reload the page)
  _randomOrder() {
    let orderRange = [...Array(this.blocks.length).keys()];
    let shuffle = orderRange.sort(() => Math.random() - 0.5);

    this.blocks.forEach((block, index) => {
      block.style.order = shuffle[index];

      block.addEventListener("click", () => this._flipBlock(block));
    });
  }

  _flipBlock(selectedBlock) {
    // we flipp the selected card
    selectedBlock.classList.add("is-flipped");

    // array of all selected cards (contains is-flipped class)
    let allFlippedBlocks = this.blocks.filter((flippedBlock) =>
      flippedBlock.classList.contains("is-flipped")
    );

    // if we have two cards we must stop clicking other cards for 1s and we check if the two slected card are matched
    if (allFlippedBlocks.length === 2) {
      this._stopClicking();
      this._checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
  }

  _stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => blocksContainer.classList.remove("no-clicking"), duration);
  }

  _checkMatchedBlock(firstBlock, secondBlock) {
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
}

const mem = new Memory();

// start.addEventListener("click", () => {
//   const value = prompt(`What's ur name ?`);
//   if (value === null || value === "") {
//     UserName.innerHTML = "Unknown";
//   } else {
//     UserName.innerHTML = value;
//   }
//   start.closest(".control-buttons").style.display = "none";
// });

