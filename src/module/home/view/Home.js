import React, {Component} from "react";
import ObjectAssign from "object-assign";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../action";
import {showOSMNoticeMsg} from "../../../action";
import { Grid } from "../component";
import "./Home.css";

class Home extends Component {
    render() {
        let {user,application, dispatch} = this.props
        return (
            <div id="page-container">
               <Grid {...user} application = {application} dispatch={dispatch}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let {user, application, ajax} = state;
    return {user, application, ajax};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(ObjectAssign({}, actions, {showOSMNoticeMsg, dispatch}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
