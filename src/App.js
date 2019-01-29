import React, { Component } from 'react';
import QuestionList from './components/Questions/QuestionList.js'
import StartSurvey from './components/StartSurvey.js'
import Result from './components/Result.js'
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Route render={({ location }) => (
                    <div>
                    <Switch>
                        <StartRoute exact path="/" component={StartSurvey}/>
                        <Route path="/questions" component={QuestionList}/>
                        <Route exact path="/result" component={Result}/>
                    </Switch>
                    </div>
                    )}
                />
            </BrowserRouter>
        )
    }

}

function StartRoute({component: Component}) {
    return (
        <Route
            render={() => getPathIfExist() ? <Redirect to={getPathIfExist()} />: <Component /> }
        />
    );
}

function getPathIfExist() {
    if (localStorage.getItem("result") !== null) {
        const result = JSON.parse(localStorage.getItem("result"));
        var next = result.filter(item => item.answer != null);
        if (next.length === result.length) {
            return {pathname: "/result"}
        }
        return {pathname: `/questions/${next.length}`}
    }
    else {
        return false
    }
}

export default App;