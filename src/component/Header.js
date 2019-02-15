import React, {Component} from "react";
import ObjectAssign from "object-assign";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OptimizeLogo from "../assets/images/logo-main-blue.svg";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header id="main_header">
                <span id="logo_link" tabIndex="-1">
                    <img id="global-logo" alt="..." src={OptimizeLogo} width="240" height="26"/>
                </span>
                <span className="s-menu-topLink uppercase nameClass">{this.props.name}</span>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let {user} = state;
    return {...user.userProfile};
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(ObjectAssign({}, {dispatch}), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
