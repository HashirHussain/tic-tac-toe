((DOM) => {
  "use strict";
  const XEmoji = ["🍌", "🍉", "🍓", "🍒", "🍍", "🍇", "🍑", "🥭"];
  const OEmoji = ["🍆", "🥑", "🥦", "🥝", "🥕", "🌽", "🍅", "🥔"];
  let isXTurn;
  let X;
  let O;
  let chances;
  let winner;
  const messageDOM = DOM.getElementById("message");
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
        setMessage(`${getCurrentTurn()}'s turn now`);
        checkWinner();
      }

      if (isChanceLeft() === false && isWinnerDeclared() === false) {
        setMessage(`It's a tie!`);
      }
    }
  }

  function fillBox(index) {
    const cell = DOM.getElementsByClassName("cell")[index];
    cell.innerHTML = getCurrentTurn();
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
          setMessage(`${winner} Won!`);
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

  function setMessage(message) {
    messageDOM.innerHTML = `<p>${message}</p>`;
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
    setMessage(`Click on any block to start with ${getCurrentTurn()}`);
  }

  DOM.getElementById("btn-restart").onclick = Init;

  Init(); //Begin
})(document);
