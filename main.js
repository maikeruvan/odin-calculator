// DOM
const DOM = (() => {
    const previousValue = document.getElementById('previous-value');
    const currentValue = document.getElementById('current-value');
    const operator = document.getElementById('operator');
    const clearControl = document.getElementById('clear-controls');
    const numberKey = document.getElementById('number-keys');
    const operatorKey = document.getElementById('operators');
    const equalKey = document.getElementById('equal-sign');

    return {
         previousValue,
         currentValue,
         operator,
         clearControl,
         numberKey,
         operatorKey,
         equalKey
    };
})();

const CALCULATOR = (() => {
    const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const validOperators = ['+', '-', '*', '/'];
    
    const previousValue = DOM.previousValue.textContent;
    const currentValue = DOM.currentValue.textContent;
    const operator = DOM.operator.textContent;

    function operate() {
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
    }

    function add() {
        const prevNum = Number(this.previousValue); 
        const currNum = Number(this.currentValue);
        const diff = prevNum + currNum;
        
        return Math.round(diff * 100) / 100;
    }

    function subtract() {
        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum - currNum;

        return Math.round(diff * 100) / 100;
    }

    function divide() {
        if (Number(this.currentValue) === 0) {
            return Infinity;
        }

        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum / currNum;

        return Math.round(diff * 100) / 100;
    }

    function multiply() {
        const prevNum = Number(this.previousValue);
        const currNum = Number(this.currentValue);
        const diff = prevNum * currNum;

        return Math.round(diff * 100) / 100;
    }

    // This method clears the currentValue
    function clearEntry() {
        const currVal = String(this.currentValue);
        const prevVal = String(this.previousValue);

        // If both are empty
        if (!currVal && !prevVal) {
            return;
        }

        // If there is no currentValue
        // Then I am sure there is a previous value
        if (!currVal) {
            // merge
            this.previousValue += this.operator;
            // reassign to currentValue
            this.currentValue = this.previousValue;
            // Erase
            this.previousValue = '';
            this.operator = '';
        }

        const arrayedCurrentValue = String(this.currentValue).split('');

        arrayedCurrentValue.pop();

        const stringedCurrValArray = arrayedCurrentValue.join('');

        this.currentValue = stringedCurrValArray;

        DOM.previousValue.textContent = this.previousValue;
        DOM.currentValue.textContent = this.currentValue;
        DOM.operator.textContent = this.operator;
    }

    function allClear() {
        this.previousValue = '';
        this.currentValue = '';
        this.operator = '';

        DOM.previousValue.textContent = this.previousValue;
        DOM.currentValue.textContent = this.currentValue;
        DOM.operator.textContent = this.operator;
    }

    function updateScreen() {
        DOM.previousValue.textContent = this.previousValue;
        DOM.operator.textContent = this.operator;
        DOM.currentValue.textContent = this.currentValue;
    }

    return {
        operate,
        add,
        subtract,
        divide,
        multiply,
        allClear,
        updateScreen,
        clearEntry,
        validNumbers,
        currentValue,
        validOperators,
        operator,
        previousValue
    };
})();

let isEqualsUsed = false;

console.log(`curr: ${CALCULATOR.currentValue}`);
console.log(`opr: ${CALCULATOR.operator}`);
console.log(`prev: ${CALCULATOR.previousValue}`);

// Functions
function handleNumbers(e) {
    let numberKeyID;
    let numberKey;

    if (e.type === 'keydown') {
        numberKeyID = e.key;
    } else if (e.type === 'click') {
        numberKey = e.target.closest('button');

        if (!numberKey) {
            return;
        }

        numberKeyID = numberKey.id;
    }


    if (!numberKeyID) {
        return;
    }

    // Odin's requirements that when equals trigger the result
    // The moment user enter a new number, it removes the old result
    if (isEqualsUsed) {
        CALCULATOR.currentValue = '';
        isEqualsUsed = false;
    }

    if (numberKeyID === '.' && CALCULATOR.currentValue.includes('.')) {
        return;
    }

    CALCULATOR.currentValue += numberKeyID;
    DOM.currentValue.textContent = CALCULATOR.currentValue;

    console.log(`curr: ${CALCULATOR.currentValue}`);
    console.log(`opr: ${CALCULATOR.operator}`);
    console.log(`prev: ${CALCULATOR.previousValue}`);
}

function handleOperators(e) {
    let operatorKey;
    let operatorKeyID;

    if (e.type === 'keydown') {
        operatorKeyID = e.key;
    } else if (e.type === 'click') {
        operatorKey = e.target.closest('button');

        if (!operatorKey) {
            return;
        }

        operatorKeyID = operatorKey.dataset.symbol;
    }

    if (!operatorKeyID) {
        return;
    }

    if (!CALCULATOR.previousValue) {
        if (!CALCULATOR.currentValue) {
            return;
        } else {
            CALCULATOR.previousValue = CALCULATOR.currentValue;
            CALCULATOR.operator = operatorKeyID;
            CALCULATOR.currentValue = '';

            CALCULATOR.updateScreen();
            // Was suggested by AI to use return
            // So only one operator is used
            return;
        }
    }

    if (CALCULATOR.currentValue) {
        const result = CALCULATOR.operate();

        CALCULATOR.previousValue = result;
        CALCULATOR.operator = operatorKeyID;
        CALCULATOR.currentValue = '';

        CALCULATOR.updateScreen();
    }

    console.log(`curr: ${CALCULATOR.currentValue}`);
    console.log(`opr: ${CALCULATOR.operator}`);
    console.log(`prev: ${CALCULATOR.previousValue}`);
}

function handleEquals() {
    if (!CALCULATOR.previousValue || !CALCULATOR.currentValue || !CALCULATOR.operator) {
        return;
    }

    const result = CALCULATOR.operate();

    CALCULATOR.previousValue = '';
    CALCULATOR.operator = '';
    CALCULATOR.currentValue = result;
    isEqualsUsed = true;

    CALCULATOR.updateScreen();
}

function handleClearControls(e) {
    let clearControl;
    let clearControlID;

    if (e.type === 'keydown') {
        clearControlID = e.key;
    } else if (e.type === 'click') {
        clearControl = e.target.closest('button');

        if (!clearControl) {
            return;
        }

        clearControlID = clearControl.id;
    }

    if (!clearControlID) {
        return;
    }

    if (clearControlID === 'ac') {
        CALCULATOR.allClear();
    } else if (clearControlID === 'ce') {
        CALCULATOR.clearEntry();
    } else if (clearControlID === 'Backspace') {
        CALCULATOR.clearEntry();
    }
}

// Listeners
DOM.clearControl.addEventListener('click', handleClearControls);

DOM.numberKey.addEventListener('click', handleNumbers);

DOM.operatorKey.addEventListener('click', handleOperators);

DOM.equalKey.addEventListener('click', handleEquals);

window.addEventListener('keydown', (e) => {
    // Enter or Equals
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
    }
    
    // Operators
    if (CALCULATOR.validOperators.includes(e.key)) {
        handleOperators(e);
    }

    // Numbers
    if (CALCULATOR.validNumbers.includes(e.key)) {
        handleNumbers(e);
    }

    // Backspace
    if (e.key === 'Backspace') {
        handleClearControls(e);
    }
});

const test = (() => {
    const a = 1;
    const b = '';
    const c = '1';

    return {
        a: a,
        b: b,
        c: c
    };
})();

console.log(test);
test.b = 'haha';
console.log(test);