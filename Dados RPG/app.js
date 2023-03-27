document.addEventListener("DOMContentLoaded", function () {
    const rollButton = document.getElementById("roll-button");
    const resultInput = document.getElementById("result");
    const diceOptions = document.getElementsByName("dice");

    rollButton.addEventListener("click", function () {
        const selectedDice = getSelectedDice(diceOptions);
        if (selectedDice) {
            const rollResult = rollDice(selectedDice);
            resultInput.value = rollResult;
        } else {
            alert("Por favor, selecione um dado antes de lançar.");
        }
    });
});

function getSelectedDice(diceOptions) {
    for (let i = 0; i < diceOptions.length; i++) {
        if (diceOptions[i].checked) {
            return parseInt(diceOptions[i].value);
        }
    }
    return null;
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}
