import React, {Component} from 'react';
import Question from './Question.js'
import '../../common-styles/common-style.scss';
import update from 'immutability-helper';
import mockQuestions from '../../mockQuestions.json';
import {Route,Switch} from 'react-router-dom'

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: mockQuestions,
            current: 0,
            quizLength: mockQuestions.length
        }
        this.back = this.back.bind(this);
        this.goToNext = this.goToNext.bind(this);
    }

    componentDidMount() {
        this.ifExistSetOldAnswersFromLocalStorage();
        this.setCurrentQuestionFromPath();
    }

    setCurrentQuestionFromPath() {
        let pathname = this.props.location.pathname;
        let lastIndex = pathname.split('/').length - 1
        let pathQuestionId = pathname.split('/')[lastIndex];
        pathQuestionId = !isNaN(pathQuestionId) ? Number(pathQuestionId) : 0;
        if (pathQuestionId !== this.state.current) {
            this.setState({
                current: pathQuestionId
            })
        }
    }

    ifExistSetOldAnswersFromLocalStorage() {
        const result = JSON.parse(localStorage.getItem("result"));
        if (result) {
            this.setState({
                questions: result
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.setCurrentQuestionFromPath();
    }

    goToNext(answer) {
        const current = this.state.current;
        if (current < this.state.questions.length - 1) {
            this.setState((state, props) => {
                const updateQuestions = update(state.questions, {[state.current]: {answer: {$set: answer}}});
                localStorage.setItem("result", JSON.stringify(updateQuestions));
                return {
                    current: state.current + 1,
                    questions: updateQuestions
                }
            }, this.props.history.push(`${this.props.match.path}/${this.state.current + 1}`));
        }
        else {
            const updateQuestions = update(this.state.questions, {[this.state.current]: {answer: {$set: answer}}});
            localStorage.setItem("result", JSON.stringify(updateQuestions));
            this.props.history.push('/result');
        }
    }

    back() {
        const current = this.state.current
        if (current > 0) {
            this.setState({
                current: current - 1
            }, this.props.history.push(`${this.props.match.path}/${this.state.current - 1}`));
        }
    }

    render() {

        const question = this.state.questions[this.state.current];
        const match = this.props.match;

        return (
            <div className="background-cover">
                <div className="background-cover">
                    <div className="container">
                        <div className="questions">
                            <Switch>
                                <Route exact path={`${match.path}/:current`}
                                       render={() => <Question selected={null} question={question} back={this.back} goToNext={this.goToNext} {...this.state} />}/>
                                <Route
                                    exact
                                    path={match.path}
                                    render={() => <Question question={question} back={this.back} goToNext={this.goToNext} {...this.state} />}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default QuestionList;