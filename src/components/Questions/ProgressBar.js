import React from 'react';
import './css/progress-bar.scss';

const ProgressBar = (progressInPercent) => {
    return (<div className="progress-wrapper">
        <div className="progress-background-bar">
            <div className="progress-bar" style={{"width": progressInPercent}}></div>
        </div>
    </div>)
}

export default ProgressBar;