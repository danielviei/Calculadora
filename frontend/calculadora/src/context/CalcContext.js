import {createContext, useState} from 'react';

export const CalcContext = createContext ();

const CalcProvider = ({children}) => {
  const [calc, setCalc] = useState ({
    number: 0,
    operation: '',
    numbers: [],
    operators: [],
  });

  const providerValue = {
    calc,
    setCalc,
  };

  return (
    <CalcContext.Provider value={providerValue}>
      {children}
    </CalcContext.Provider>
  );
};

export default CalcProvider;
