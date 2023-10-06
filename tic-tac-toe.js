((DOM) => {
  "use strict";
  const XEmoji = [
    "🍌",
    "🍉",
    "🍓",
    "🍒",
    "🍍",
    "🍇",
    "🍑",
    "🥭",
    "🍊",
    "🍎",
    "🥝",
  ];
  const OEmoji = [
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥒",
    "🥬",
    "🥕",
    "🌽",
    "🥔",
    "🧅",
    "🍄",
  ];
  let isXTurn;
  let X;
  let O;
  let chances;
  let winner;
  const playerXDOM = DOM.getElementById("player-X");
  const playerODOM = DOM.getElementById("player-O");
  const gridDOM = DOM.getElementById("grid");
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function onClickHandler(index, elm) {
    if (!elm.target.innerHTML) {
      elm.preventDefault();
      if (isWinnerDeclared() === false && isChanceLeft() == true) {
        chances--;
        fillBox(index);
        isXTurn = !isXTurn;
        highlightCurrentPlayer();
        checkWinner();
      }

      if (isChanceLeft() === false && isWinnerDeclared() === false) {
        clearPlayerSelection();
      }
    }
  }

  function fillBox(index) {
    const cell = DOM.getElementsByClassName("cell")[index];
    cell.innerHTML = getCurrentTurn();
  }

  function highlightCurrentPlayer() {
    clearPlayerSelection();
    if (isXTurn) {
      playerXDOM.classList.add("now");
      playerODOM.classList.remove("now");
    } else {
      playerXDOM.classList.remove("now");
      playerODOM.classList.add("now");
    }
  }

  function highlightWinner() {
    clearPlayerSelection();

    if (winner === X) {
      playerXDOM.classList.add("winner");
    } else {
      playerODOM.classList.add("winner");
    }
  }

  function clearPlayerSelection() {
    playerXDOM.className = "";
    playerODOM.className = "";
  }

  function checkWinner() {
    const boxes = DOM.getElementsByClassName("cell");
    for (let j = 0; j < winningPattern.length; j++) {
      const [a, b, c] = winningPattern[j];
      if (boxes[a].innerHTML && boxes[b].innerHTML && boxes[c].innerHTML) {
        if (
          boxes[a].innerHTML === boxes[b].innerHTML &&
          boxes[b].innerHTML === boxes[c].innerHTML
        ) {
          boxes[a].classList.add("winner");
          boxes[b].classList.add("winner");
          boxes[c].classList.add("winner");
          winner = boxes[a].innerHTML;
          highlightWinner();
          break;
        }
      }
    }
  }

  function getCurrentTurn() {
    return isXTurn ? X : O;
  }

  function isChanceLeft() {
    return chances > 0;
  }

  function isWinnerDeclared() {
    return winner !== null;
  }

  function Init() {
    //Set default values
    isXTurn = true;
    X = XEmoji[Math.floor(Math.random() * XEmoji.length)];
    O = OEmoji[Math.floor(Math.random() * OEmoji.length)];
    chances = 9;
    winner = null;

    // Generate cells and assign them onclick handler
    gridDOM.innerHTML = "";
    for (let index = 0; index < 9; index++) {
      const cell = DOM.createElement("div");
      cell.className = "cell";
      cell.onclick = onClickHandler.bind(cell, index);
      gridDOM.appendChild(cell);
    }
    playerXDOM.innerHTML = X;
    playerODOM.innerHTML = O;
    highlightCurrentPlayer();
  }

  DOM.getElementById("btn-restart").onclick = Init;

  Init(); //Begin
})(document);
