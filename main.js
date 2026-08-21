// DOM
const numbers = document.querySelector('.numbers');
const clearing = document.querySelector('.clearing');
const operators = document.querySelector('.operators');
const inputDisplay = document.getElementById('screen-display');

// State Variables
const calculator = {
    validOperators: ['*', '/', '+', '-', '='],
    previousNumber: '',
    currentNumber: '',
    operator: '',
    display() {
        inputDisplay.value = calculator.previousNumber + ' ' + calculator.operator + ' ' + calculator.currentNumber;
    },
    add() {
        return Number(this.previousNumber) + Number(this.currentNumber);
    },
    subtract() {
        return Number(this.previousNumber) - Number(this.currentNumber);
    },
    multiply() {
        return Number(this.previousNumber) * Number(this.currentNumber);
    },
    divide() {
        if (this.currentNumber === 0) {
            this.clearAll();
            return 'invalid operation';
        }

        return Number(this.previousNumber) / Number(this.currentNumber);
    },
    operate() {
        switch (this.operator) {
            case '*':
                return this.multiply();
            case '/':
                return this.divide();
            case '+':
                return this.add();
            case '-':
                return this.subtract();
        }
    },
    clearAll() {
        this.previousNumber = '';
        this.currentNumber = '';
        this.operator = '';
        this.display.value = '';
    },
    erase() {

    }
};

// Functions`
function checkOperable(targetBtn) {
    const operator = targetBtn.id;

    // Check previousNumber
    if (calculator.previousNumber === '') {
        calculator.previousNumber = calculator.currentNumber;
        calculator.currentNumber = '';
        calculator.operator = operator;
        calculator.display();
    } else if (calculator.previousNumber && calculator.currentNumber) {
        const result = calculator.operate();

        calculator.previousNumber = result;
        calculator.currentNumber = '';
        calculator.operator = operator;
        calculator.display();
    }
}

// Listeners
numbers.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('button');

    if (!targetBtn) {
        return;
    }
    
    if (targetBtn.id === '.' && calculator.currentNumber.includes('.')) {
        return;
    } else if (targetBtn.id === '.' && calculator.currentNumber === '') {
        calculator.currentNumber = '0';
    }

    calculator.currentNumber += targetBtn.id;
    calculator.display();
});

operators.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('button');

    checkOperable(targetBtn);
});

clearing.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('button');

    if (targetBtn.id === 'clear-all') {
        calculator.clearAll();
    } else if (targetBtn.id === 'erase') {
        calculator.erase();
    } else if (targetBtn.id === '=') {
        // operate
    }
});