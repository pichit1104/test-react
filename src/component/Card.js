import React, { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import './card.css';

const Card = React.forwardRef((props, ref) => {
    const {
        cardNumber,
        cardHolder,
        cardMonth,
        cardYear,
        cardCvv,
        isCardFlipped,
        currentFocus,
        onCardClick
    } = props;

    const [style, setStyle] = useState(null);

    const outlineStyle = (elem) => {
        return elem
            ? {
                width: `${elem.offsetWidth}px`,
                height: `${elem.offsetHeight}px`,
                transform: `translateX(${elem.offsetLeft}px) translateY(${elem.offsetTop}px)`
            }
            : null;
    } 

    useEffect(() => {
        if ( currentFocus ) {
            const style = outlineStyle(currentFocus.current);
            setStyle(style);
        }
    }, [currentFocus]);

    return (
        <div className={`card-item ${isCardFlipped ? 'active': ''}`}>

            <div className="card-item-side front">
                <div 
                    className={`card-item-focus ${currentFocus ? 'active': ''}`}
                    style={style}
                />
                <div className="card-item-cover">
                    <img 
                        src="/bg-card.jpeg" 
                        alt="" 
                        className="card-item-bg"
                    />
                </div>
                <div className="card-item-wrapper">
                    <div className="card-item-top">
                        <img 
                            src="/chip.png"
                            alt=""
                            className="card-item-chip"
                        />
                        <img 
                            src="/visa.png"
                            alt=""
                            className="card-item-typeCard"
                        />
                    </div>
                    <label 
                        className="card-item-number"
                        ref={ref.cardNumber}
                        onClick={() => onCardClick('cardNumber')}
                    >
                        <TransitionGroup
                            className="slide-fade-up"
                            component="div"
                        >
                            {cardNumber ? (
                                cardNumber.split('').map((val, index) => (
                                    <CSSTransition
                                        classNames="slide-fade-up"
                                        timeout={250}
                                        key={index}
                                    >
                                        <div className="card-item-numberItem">{val}</div> 
                                    </CSSTransition>
                                ))
                            ) : (
                                <CSSTransition
                                    classNames="slide-fade-up"
                                    timeout={250}
                                >
                                    <div className="card-item-numberItem">#</div> 
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </label>
                    <div className="card-item-content">
                        <label 
                            className="card-item-info"
                            ref={ref.cardHolder}
                            onClick={() => onCardClick('cardHolder')}
                        >
                            <div className="card-item-holder">Card Holder</div>
                            <div className="card-item-name">
                                <TransitionGroup 
                                    component="div"
                                    className="slide-fade-up"
                                >
                                    {cardHolder === 'FULL NAME' ? (
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={250}
                                        >
                                            <div className="card-item-nameItem">FULL NAME</div>
                                        </CSSTransition>
                                    ) : (
                                        cardHolder.split('').map((val, index) => (
                                            <CSSTransition 
                                                classNames="slide-fade-right"
                                                timeout={250}
                                                key={index}
                                            >
                                                <span className="card-item-nameItem">{val}</span>
                                            </CSSTransition>
                                        ))
                                    )}
                                    
                                </TransitionGroup>
                            </div>
                        </label>
                        <div 
                            className="card-item-date"
                            ref={ref.cardDate}
                            onClick={() => onCardClick('cardDate')}
                        >
                            <label className="card-item-dateTitle">Expires</label>
                            <label className="card-item-dateItem">
                                <SwitchTransition in-out>
                                    <CSSTransition 
                                        classNames="slide-fade-up"
                                        timeout={250}
                                        key={cardMonth}
                                    >
                                        <span>
                                            {!cardMonth ? 'MM' : cardMonth }
                                        </span>
                                    </CSSTransition>
                                </SwitchTransition>
                            </label>
                            /
                            <label className="card-item-dateItem">
                                <SwitchTransition out-in>
                                    <CSSTransition
                                        classNames="slide-fade-up"
                                        timeout={250}
                                        key={cardYear}
                                    >
                                        <span>
                                            {!cardYear ? 'YY' : cardYear.toString().substr(-2)}
                                        </span>
                                    </CSSTransition>
                                </SwitchTransition>
                                
                            </label>
                        </div>                        
                    </div>
                </div>
            </div>

            <div className="card-item-side back">
                <div className="card-item-cover">
                    <img 
                        src="/bg-card.jpeg"
                        alt=""
                        className="card-item-bg"
                    />
                </div>
                <div className="card-item-band"/>
                <div className="card-item-cvv">
                    <div className="card-item-cvvTitle">CVV</div>
                    <div className="card-item-cvvBand">
                        <TransitionGroup>
                            {cardCvv.split('').map((val, index) => (
                                <CSSTransition
                                    classNames="zoom-in-out"
                                    key={index}
                                    timeout={250}
                                >
                                    <span>*</span>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                    <img 
                        src="/visa.png" 
                        alt="" 
                        className="card-item-typeCard"
                    />
                </div>
            </div>

        </div>
    );
})

export default Card;