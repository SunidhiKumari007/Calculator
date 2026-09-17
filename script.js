const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let expression = "";

buttons.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
        expression = "";
        display.value = "0";
        return;
    }

    if (action === "cut") {
        expression = expression.slice(0, -1);
        display.value = expression || "0";
        return;
    }

    if (action === "calculate") {
        calculate();
        return;
    }

    if (value) {
        expression += value;
        display.value = expression;
    }
});

function calculate() {
    try {
        let calculation = expression
            .replace(/(\d+(?:\.\d+)?)%/g, "($1 / 100)")
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");

        const result = Function("return " + calculation)();

        display.value = result;
        expression = String(result);
    } catch {
        display.value = "Error";
        expression = "";
    }
}