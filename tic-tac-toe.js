((DOM) => {
  let isXTurn = true;
  const X = "❌";
  const O = "⭕";
  let chances = 9;
  let winner = null;
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

  function eventHandler(evt) {
    if (evt.target.classList.contains("cell") && !evt.target.innerHTML) {
      evt.preventDefault();
      if (isWinnerDeclared() === false && isChanceLeft() == true) {
        chances--;
        setValueToBox(evt);
        isXTurn = !isXTurn;
        setMessage(`${getCurrentTurn()}'s turn`);
        checkWinner();
      }

      if (isChanceLeft() === false && isWinnerDeclared() === false) {
        setMessage(`It's a tie!`);
      }
    }
  }

  function setValueToBox(evt) {
    const position = evt.target.dataset.position;
    const box = DOM.getElementsByClassName("cell")[position];
    box.innerHTML = getCurrentTurn();
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
    const elm = DOM.getElementsByClassName("message")[0];
    elm.innerHTML = `<p>${message}</p>`;
  }

  (() => {
    // Init
    window.addEventListener("click", eventHandler);
    setMessage(`${getCurrentTurn()}'s turn`);
  })();
})(document);
