// DOM
const previousValueDisplay = document.getElementById('previous-value');
const operatorDisplay = document.getElementById('operator');
const currentValueDisplay = document.getElementById('current-value');

const clearControlKeys = document.getElementById('clear-controls');
const numberKeys = document.getElementById('number-keys');
const operatorKeys = document.getElementById('operators');

const equalsKey = document.getElementById('equal-sign');

// State Variables

// Because odin wants that after the result is displayed, entering a new number should clear the previous value
let isEqualsUsed = false;

const calculator = {
    validNumbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
    validOperators: ['+', '-', '*', '/'],
    previousValue: previousValueDisplay.textContent,
    currentValue: currentValueDisplay.textContent,
    operator: operatorDisplay.textContent,
    operate() {
        switch (this.operator) {
            case '+':
            return this.add();
            
            case '-':
            return this.subtract();

            case '/':
            return this.divide();

            case '*':
            return this.multiply();
        }
    },
    add() {
        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum + currNum;
        
        return Math.round(diff * 100) / 100;
    },
    subtract() {
        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum - currNum;

        return Math.round(diff * 100) / 100;
    },
    divide() {
        if (Number(this.currentValue) === 0) {
            return Infinity;
        }

        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum / currNum;

        return Math.round(diff * 100) / 100;
    },
    multiply() {
        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum * currNum;

        return Math.round(diff * 100) / 100;
    },
    clearEntry() {
        const currVal = String(this.currentValue);
        const prevVal = String(this.previousValue);

        if (!currVal) {
            if (!prevVal) {
                return;
            }

            this.previousValue += this.operator;
            this.currentValue = this.previousValue;
            this.previousValue = '';
            this.operator = '';

            previousValueDisplay.textContent = this.previousValue;
            currentValueDisplay.textContent = this.currentValue;
            operatorDisplay.textContent = this.operator;
        }

        // Using "String here so clearEntry don't crash"
        const stringToArray = currVal.split('');
        stringToArray.pop();

        const arrayToString = stringToArray.join('');

        this.currentValue = arrayToString;
        currentValueDisplay.textContent = this.currentValue;
    },
    allClear() {
        this.previousValue = '';
        this.currentValue = '';
        this.operator = '';

        previousValueDisplay.textContent = this.previousValue;
        currentValueDisplay.textContent = this.currentValue;
        operatorDisplay.textContent = this.operator;
    },
    updateScreen() {
        previousValueDisplay.textContent = this.previousValue;
        operatorDisplay.textContent = this.operator;
        currentValueDisplay.textContent = this.currentValue;
    }
};

// Functions
function handleNumbers(e) {
    let numberKeyID;
    let numberKey;

    if (e.type === 'keydown') {
        numberKeyID = e.key;
    } else if (e.type === 'click') {
        numberKey = e.target.closest('button');
        numberKeyID = numberKey.id;
    }

    if (!numberKey) {
        if (!numberKeyID) {
            return;
        }
    }

    if (isEqualsUsed) {
        calculator.currentValue = '';
    }

    if (numberKeyID === '.' && calculator.currentValue.includes('.')) {
        return;
    }

    calculator.currentValue += numberKeyID;
    currentValueDisplay.textContent = calculator.currentValue;
    
    isEqualsUsed = false;
}

function handleOperators(e) {
    let operatorKey;
    let operatorKeyID;

    if (e.type === 'keydown') {
        operatorKeyID = e.key;
    } else if (e.type === 'click') {
        operatorKey = e.target.closest('button');
        operatorKeyID = operatorKey.id;
    }

    if (!operatorKey) {
        if (!operatorKeyID) {
            return;
        }
    }

    if (!calculator.previousValue) {
        if (!calculator.currentValue) {
            return;
        } else {
            calculator.previousValue = calculator.currentValue;
            calculator.operator = operatorKeyID;
            calculator.currentValue = '';

            calculator.updateScreen();
        }
    }

    if (calculator.currentValue) {
        const result = calculator.operate();

        calculator.previousValue = result;
        calculator.operator = operatorKeyID;
        calculator.currentValue = '';

        calculator.updateScreen();
    }
}

function handleEquals() {
    if (!calculator.previousValue || !calculator.currentValue || !calculator.operator) {
        return;
    }

    const result = calculator.operate();

    calculator.previousValue = '';
    calculator.operator = '';
    calculator.currentValue = result;
    isEqualsUsed = true;

    calculator.updateScreen();
}

function handleClearControls(e) {
    let clearControl;
    let clearControlID;

    if (e.type === 'keydown') {
        clearControlID = e.key;
    } else if (e.type === 'click') {
        clearControl = e.target.closest('button');
        clearControlID = clearControl.id;
    }

    if (!clearControl) {
        if (!clearControlID) {
            return;
        }
    }

    if (clearControlID === 'ac') {
        calculator.allClear();
    } else if (clearControlID === 'ce') {
        calculator.clearEntry();
    } else if (clearControlID === 'Backspace') {
        calculator.clearEntry();
    }
}

// Listeners
clearControlKeys.addEventListener('click', handleClearControls);

numberKeys.addEventListener('click', handleNumbers);

operatorKeys.addEventListener('click', handleOperators);

equalsKey.addEventListener('click', handleEquals);

window.addEventListener('keydown', (e) => {
    // Enter or Equals
    if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
    }
    
    // Operators
    if (calculator.validOperators.includes(e.key)) {
        handleOperators(e);
    }

    // Numbers
    if (calculator.validNumbers.includes(e.key)) {
        handleNumbers(e);
    }

    // Backspace
    if (e.key === 'Backspace') {
        handleClearControls(e);
    }
});