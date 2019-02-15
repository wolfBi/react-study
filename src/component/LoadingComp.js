import React, {Component} from 'react';
import Loading from 'react-loading';
import './LoadingComp.css';

export default class LoadingComp extends Component {
    render() {
        return (
            <div className="loadingOverlay">
                <Loading type="spinningBubbles" color="#ffffff" delay={1} height="40px" width="40px"
                         className="loadingComp"/>
            </div>
        );
    }
}
