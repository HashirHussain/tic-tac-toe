((DOM) => {
  let isXTurn = true;
  const X = "❌";
  const O = "⭕";
  let chances = 9;
  let winner = null;
  const messageDOM = DOM.getElementById("message");
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
          setMessage(`<p>${winner} Won!<p>`);
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

  // Initialization
  (() => {
    // Generate cells and assign them onclick handler
    for (let index = 0; index < 9; index++) {
      const cell = DOM.createElement("div");
      cell.className = "cell";
      cell.onclick = onClickHandler.bind(cell, index);
      DOM.getElementById("grid").appendChild(cell);
    }
    setMessage(`Click on any block to start with ${getCurrentTurn()}`);
  })();
})(document);
