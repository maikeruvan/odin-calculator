// DOM
const previousValueDisplay = document.getElementById('previous-value');
const operatorDisplay = document.getElementById('operator');
const currentValueDisplay = document.getElementById('current-value');

const clearControlKeys = document.getElementById('clear-controls');
const numberKeys = document.getElementById('number-keys');
const operatorKeys = document.getElementById('operators');

const equalsKey = document.getElementById('equal-sign');

// State Variables
const calculator = {
    previousValue: '',
    currentValue: '',
    operator: '',
    validOperators: ['+', '-', '*', '/'],
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
        return this.previousValue + this.currentValue;
    },
    subtract() {
        return this.previousValue - this.currentValue;
    },
    divide() {
        if (this.currentValue === 0) {
            return Infinity;
        }

        return this.previousValue / this.currentValue;
    },
    multiply() {
        return this.previousValue * this.currentValue;
    },
    clearEntry() {
        if (!this.currentValue) {
            if (!this.previousValue) {
                return;
            }

            this.currentValue = this.previousValue;
            this.operator = '';
            this.previousValue = '';

            previousValueDisplay.textContent = this.previousValue;
            currentValueDisplay.textContent = this.currentValue;
            operatorDisplay.textContent = this.operator;
        }

        const stringToArray = this.currentValue.split('');
        stringToArray.pop();

        const arrayToString = stringToArray.join('');

        calculator.currentValue = arrayToString;
        currentValueDisplay.textContent = this.currentValue;
    },
    allClear() {
        this.previousValue = '';
        this.currentValue = '';
        this.operator = '';

        previousValueDisplay.textContent = this.previousValue;
        currentValueDisplay.textContent = this.currentValue;
        operatorDisplay.textContent = this.operator;
    }
};

calculator.currentValue = currentValueDisplay.textContent;
calculator.previousValue = previousValueDisplay.textContent;

// Functions

// Listeners
clearControlKeys.addEventListener('click', (e) => {
    const clearControl = e.target.closest('button');

    if (!clearControl) {
        return;
    }

    if (clearControl.id === 'ac') {
        calculator.allClear();
    } else if (clearControl.id === 'ce') {
        calculator.clearEntry();
    }
});

numberKeys.addEventListener('click', (e) => {
    
});

operatorKeys.addEventListener('click', (e) => {
    
});

equalsKey.addEventListener('click', (e) => {
    
});