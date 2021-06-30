import { useState, useCallback, useRef } from 'react';
import './App.css';
import Card from './component/Card';
import CardForm from './component/CardForm';

const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false
}

function App() {
  const [state, setState] = useState(initialState);
  const [currentFocus, setCurrentFocus] = useState(null);

  const updateStateValues = useCallback(
    (KeyName, value) => {
      setState({
        ...state,
        [KeyName]: value || initialState[KeyName]
      });
    },
    [state]
  );  

  let formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef()
  }

  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key].current.focus();
  }, []);

  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef()
  };

  let onFocusCardInput = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocus(refByName);
  }

  let onBlurCardInput = useCallback(() => {
    setCurrentFocus(null);
  }, []);


  return (
    <div className="wrapper">
      <CardForm
        onUpdateState={updateStateValues}
        cardMonth={state.cardMonth}
        cardYear={state.cardYear}
        ref={formFieldsRefObj}
        onFocusCardInput={onFocusCardInput}
        onBlurCardInput={onBlurCardInput}
      >
        <Card
          cardNumber={state.cardNumber}
          cardHolder={state.cardHolder}
          cardMonth={state.cardMonth}
          cardYear={state.cardYear}
          cardCvv={state.cardCvv}
          isCardFlipped={state.isCardFlipped}
          ref={cardElementsRef}
          currentFocus={currentFocus}
          onCardClick={focusFormFieldByKey}
        ></Card>
      </CardForm>      
    </div>
  );
}

export default App;
