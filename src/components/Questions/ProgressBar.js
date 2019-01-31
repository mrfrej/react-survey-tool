import React from 'react';
import './css/progress-bar.scss';

const ProgressBar = (props) => {
    return (<div className="progress-wrapper">
        <div className="progress-background-bar">
            <div className="progress-bar" style={{"width": props.progressInPercent}}></div>
        </div>
    </div>)
}

export default ProgressBar;