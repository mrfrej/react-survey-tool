import React from 'react';
import { Link } from 'react-router-dom'
import '../common-styles/common-style.scss';

const StartSurvey = () => {

    return (
        <div className="background-cover">
            <div className="container">
                <div className="card">
                    <h1 className="title">
                        Welcome to the survey!
                    </h1>
                    <Link style={{ textDecoration: 'none', color: "white" }} to="/questions">
                        <button className="green-button">
                            Start Survey
                        </button>
                    </Link>
                </div>
            </div>
        </div>)
}

export default StartSurvey;

