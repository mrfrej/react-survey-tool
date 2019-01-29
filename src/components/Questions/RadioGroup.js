import React from 'react';
import './css/radio-group.scss';

const RadioGroup = (question, radioValue, hasAnswered, onSelectRadioValue) => {
    return question.choices.map((choice) => {
        return (
            <ul>
                <li className="" key={choice.id}>
                    <div className="selected">{radioValue === choice.id ?
                        <i className="icon-style check fas fa-check"></i> : null}</div>
                    <button
                        className={`button-question ${hasAnswered === choice.id ? "selected" : null}`}
                        type="submit"
                        onClick={onSelectRadioValue} name={question.id}
                        value={choice.id}>
                        {choice.value}</button>
                </li>
            </ul>)
    })
}

export default RadioGroup;
