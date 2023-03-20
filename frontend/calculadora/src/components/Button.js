import axios from 'axios';
import {useContext} from 'react';
import {CalcContext} from '../context/CalcContext';

const mathSigns = '+*-xX/%';

const getStyleName = btn => {
  const className = {
    '=': 'equal',
    x: 'opt',
    X: 'opt',
    '-': 'opt',
    '+': 'opt',
    '/': 'opt',
  };
  return className[btn];
};

const MyButton = ({value}) => {
  const {calc, setCalc} = useContext (CalcContext);
  const handleButtonClick = () => {
    if (mathSigns.includes (value)) {
      if (
        mathSigns.includes (calc.operation[calc.operation.length - 1]) &&
        calc.number === 0
      ) {
        calc.operation =
          calc.operation.slice (0, calc.operation.length - 1) + value;
        calc.operators.pop ();
        calc.operators.push (value);
      } else {
        calc.operation = calc.operation + String (calc.number) + value;
        calc.operators.push (value);
        calc.numbers.push (calc.number);
        calc.number = 0;
      }
      setCalc ({...calc});
    } else if (typeof value === 'string' && value.toLowerCase () === 'c') {
      calc.number = 0;
      calc.numbers = [];
      calc.operators = [];
      calc.operation = '';
      setCalc ({...calc});
    } else if (value === '+-') {
      calc.number = calc.number * -1;
      setCalc ({
        ...calc,
      });
    } else if (value === '.') {
      if (
        calc.number % 1 === 0 &&
        calc.operation[calc.operation.length - 1] !== '.'
      ) {
        calc.operation = calc.operation + String (calc.number) + value;
        calc.operators.push (value);
        calc.numbers.push (calc.number);
        calc.number = 0;
        setCalc ({
          ...calc,
        });
      }
    } else if (value === '=') {
      let expresionToEvaluate = '';
      if (/^[+xX\-/*0-9%.]*$/.test (expresionToEvaluate)) {
        //create operation to evaluate
        if (calc.operators.length > 0) {
          calc.operators.forEach ((operator, i) => {
            expresionToEvaluate += String (calc.numbers[i]) + operator;
          });
        }
        expresionToEvaluate += String (calc.number);

        // get result
        expresionToEvaluate = expresionToEvaluate.replace (/x/g, '*');
        expresionToEvaluate = expresionToEvaluate.replace (/X/g, '*');
        expresionToEvaluate = expresionToEvaluate.replace (/%0/g, '/100');
        expresionToEvaluate = expresionToEvaluate.replace (/%/g, '/100');
        expresionToEvaluate = expresionToEvaluate.replace (/--/g, '+');
        const result = String (eval (expresionToEvaluate));

        // send to back to save the operations
        calc.operation = calc.operation + calc.number;
        axios.post ('http://127.0.0.1:8000/history/', {
          operation: calc.operation,
          result: result,
        });

        //show result to user
        calc.operation = '';
        calc.number = result;
        calc.numbers = [];
        calc.operators = [];
        setCalc ({...calc});
      }
    } else {
      if (calc.number % 1 !== 0) {
        const oper = String (calc.number).split ('.');
        console.log (Number (oper[1]));
        calc.operation = oper[0] + '.';
        calc.operators.push ('.');
        calc.numbers.push (Number (oper[1]));
        calc.number = Number (oper[1]);
      }
      calc.number = calc.number * 10;
      if (calc.number < 0) calc.number = calc.number - Number (value);
      else calc.number = calc.number + Number (value);
      setCalc ({
        ...calc,
      });
    }
  };
  return (
    <button
      className={`${getStyleName (value)} button`}
      onClick={handleButtonClick}
    >
      {value}
    </button>
  );
};

export default MyButton;
