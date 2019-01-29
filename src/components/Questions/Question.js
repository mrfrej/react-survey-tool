import React, {Component} from 'react';
import './css/questions.scss';
import './css/input.scss';
import RadioGroup from './RadioGroup.js'
import ProgressBar from './ProgressBar.js'
import DropDown from './DropDown'

const Input = (value, onUpdateInputValue) => {
    return <div><label className="input-label">Your Answer:</label>
        <textarea className="input" type="text" maxLength="250" value={value} onChange={onUpdateInputValue}/>
    </div>
}

const BackButton = (current, onClickBack) => {
    return (current >= 1 ? <button className="back-button" onClick={onClickBack}>BACK</button> : null)
}

const NextButton = (hasAnswered, onClickNext) => {
    return (hasAnswered ? <button className="back-button next" onClick={onClickNext}>NEXT</button> : null)
}

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonEnabled: false,
            hasAnswered: false,
            id: 0,
            inputValue: null
        }
        this.onSelectRadioValue = this.onSelectRadioValue.bind(this);
        this.onUpdateInputValue = this.onUpdateInputValue.bind(this);
        this.onSelectDropDownItem = this.onSelectDropDownItem.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        this.ifExistSetOldAnswer(prevState);
    }

    ifExistSetOldAnswer(prevState) {
        let type = this.props.question.type;
        if (prevState[type + 'Value'] == null && this.props.question.answer != null) {
            this.setState({
                [type + 'Value']: this.props.question.answer,
                hasAnswered: true
            })
        }
    }

    onClickNext(e) {
        e.preventDefault();
        let state = this.state;
        let values = [state.inputValue, state.radioValue, state.dropDownValue];
        let value = values.filter((item) => item != null)[0];
        this.props.goToNext(value);
        this.setState({
            hasAnswered: false,
            radioValue: null,
            inputValue: null,
            dropDownValue: null
        })
    }

    onSelectRadioValue(e) {
        e.preventDefault();
        this.setState({
            hasAnswered: true,
            radioValue: Number(e.target.value)
        })
    }

    onClickBack(e) {
        this.props.back();
        this.setState({
            radioValue: null,
            inputValue: null,
            dropDownValue: null
        });
    }

    onUpdateInputValue(evt) {
        if (evt.target.value.length > 0) {
            this.setState({
                inputValue: evt.target.value,
                hasAnswered: true
            });
        }
        else {
            this.setState({
                hasAnswered: false,
                inputValue: evt.target.value,

            });
        }
    }

    onSelectDropDownItem(id) {
        this.setState({
            dropDownValue: Number(id),
            hasAnswered: true
        })
    }

    render() {

        const {hasAnswered, radioValue, inputValue, dropDownValue} = this.state;
        const {question, quizLength, current} = this.props;
        const type = question.type;
        const progressInPercent = ((current + 1) / quizLength) * 100 + '%';

        return (
            <div className="card">
                <h5 className="question-number">Question {current + 1} of {quizLength}</h5>

                {ProgressBar(progressInPercent)}

                <h1 className="question-text">{question.text}</h1>

                {type === 'radio' ? RadioGroup(question, radioValue, hasAnswered, this.onSelectRadioValue) : null}
                {type === 'input' ? Input(inputValue, this.onUpdateInputValue) : null}
                {type === 'dropDown' ? <DropDown dropDownValue={dropDownValue}
                                                 choices={this.props.question.choices}
                                                 onSelectDropDownItem={this.onSelectDropDownItem}/> : null}
                <div>
                    {BackButton(current, this.onClickBack)}
                    {NextButton(hasAnswered, this.onClickNext)}
                    <br style={{clear:"both"}}/>
                </div>
            </div>
        )
    }
}
export default Question;