import React, {Component} from 'react';
import './result.scss';

class Result extends Component {

    constructor(props) {
        super(props);
        const result = JSON.parse(localStorage.getItem("result"));
        this.state = {
            result: result
        };
        this.retakeTest = this.retakeTest.bind(this);
    }

    retakeTest() {
        this.props.history.push(`/`);
        localStorage.clear();
    }

    getAnswerValue(question) {
        let answerValue;
        if (!question.choices) return question.answer
        answerValue = question.choices.filter((choice) => {
            return question.answer === choice.id
        })
        answerValue = answerValue[0] ? answerValue[0].value : question.answer;
        return answerValue
    }

    render() {

        const {result} = this.state;

        return (
            <div className="background-cover">
                <div className="container">
                    <div className="card">
                        <h1 className="title">
                            Thanks for your participation
                        </h1>
                        <button onClick={this.retakeTest} className="green-button">
                            Retake It
                        </button>
                        <div className="questions-and-anwers">
                            <h1 className="summary">Your Summary:</h1>
                            <ul>
                                {result.map((question, index) => {
                                    return (
                                        <li>
                                            <div className="summary-question">Q{index + 1}: {question.text}</div>
                                            <div>
                                                <div
                                                    className="summary-answer">
                                                    Your answer: {this.getAnswerValue(question)}</div>
                                            </div>
                                        </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;