import React, { useState } from 'react';
import './CardForm.css'

const monthsArr = Array.from({length: 12}, (_, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const currentYear = new Date().getFullYear();
const yearsArr = Array.from({length: 9}, (_, i) =>  currentYear + i );

const CardForm = React.forwardRef((props, ref) => {
    const {
        onUpdateState,
        cardMonth,
        cardYear,
        onFocusCardInput,
        onBlurCardInput,
        children
    } = props;
    const [cardNumber, setCardNumber] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    function onChangeHandle(event) {
        const { name, value } = event.target;
        onUpdateState(name, value);
    }

    function onChangeCardNumber(event) {
        let { name, value } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^\d{0,16}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(cardNumber.trim());
        onUpdateState(name, cardNumber);
    }

    function onChangeCardCVV(event) {
        let { name, value } = event.target;
        let cardCvv = value.replace(/\D/g, '');

        setCardCvv(cardCvv.trim());
        onUpdateState(name, cardCvv);
    }

    function onFocusCvv(event) {
        onUpdateState('isCardFlipped', true);
    }

    function onBlurCvv(event) {
        onUpdateState('isCardFlipped', false);
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
    }

    return (
        <div className="card-form">
            <div className="credit-card">{children}</div>
            <form className="card-form-inner" onSubmit={onSubmitForm}>
                <div className="card-input">
                    <label 
                        htmlFor="cardNumber" 
                        className="card-input-label"
                    >
                        Card Number
                    </label>
                    <input
                        id="cardNumber"
                        type="tel"
                        autoComplete="off"
                        name="cardNumber"
                        className="card-input-input"
                        maxLength="19"
                        value={cardNumber}
                        ref={ref.cardNumber}
                        onChange={onChangeCardNumber}
                        onFocus={ (e) => { onFocusCardInput(e, 'cardNumber')}}
                        onBlur={onBlurCardInput}
                    />
                </div>

                <div className="card-input">
                    <label 
                        htmlFor="cardHolder" 
                        className="card-input-label"
                    >
                        Card Name
                    </label>
                    <input 
                        type="text"
                        autoComplete="off"
                        name="cardHolder"
                        className="card-input-input"
                        ref={ref.cardHolder}
                        onChange={onChangeHandle}
                        onFocus={ (e) => { onFocusCardInput(e, 'cardHolder')}}
                        onBlur={onBlurCardInput}
                    />
                </div>

                <div className="card-form-row">
                    <div className="card-form-col">
                        <div className="card-form-group">
                            <label 
                                htmlFor="cardMonth" 
                                className="card-input-label"
                            >
                                Expiration Date
                            </label>
                            <select
                                name="cardMonth"
                                className="card-input-input"
                                ref={ref.cardDate}
                                value={cardMonth}
                                onChange={onChangeHandle}
                                onFocus={ (e) => { onFocusCardInput(e, 'cardDate')}}
                                onBlur={onBlurCardInput}
                            >
                                 <option value="">Month</option>
                                 {monthsArr.map(
                                     (val, index) => (
                                        <option key={index} value={val}>{val}</option>
                                     )
                                 )}
                            </select>
                            <select
                                name="cardYear"
                                className="card-input-input"
                                value={cardYear}
                                onChange={onChangeHandle}
                                onFocus={ (e) => { onFocusCardInput(e, 'cardDate')}}
                                onBlur={onBlurCardInput}
                            >
                                <option value="">Year</option>
                                {yearsArr.map(
                                    (val, index) => (
                                        <option key={index} value={val}>{val}</option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="card-form-col cvv">
                        <div className="card-input">
                            <label 
                                htmlFor="cardCvv"
                                className="card-input-label"
                            >
                                CVV
                            </label>
                            <input
                                id="cardCvv"
                                type="tel"
                                autoComplete="off"
                                className="card-input-input"
                                name="cardCvv"
                                maxLength="4"
                                onChange={onChangeCardCVV}
                                onFocus={onFocusCvv}
                                onBlur={onBlurCvv}
                                ref={ref.cardCvv}
                                value={cardCvv}
                                
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn-card-submit">Submit</button>
            </form>
        </div>
    );
})

export default CardForm;