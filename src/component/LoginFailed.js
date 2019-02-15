import React, {Component} from 'react'
import {Col} from 'react-bootstrap'
import OptimizeLogo from '../../images/optimize_server_manger_logo.png';

class LoginFailed extends Component {
    render() {
        return (
            <div className='padding0Px'>
                <Col xs={12} className='padding0Px loginFailed_header'>
                    <img src={OptimizeLogo} alt=""/>
                </Col>
                <Col xs={12} className={'loginFailed-title-line'}>
                <span className='paddingRight10 loginFailed-title'>
                 {'Login Error'}
                </span>
                </Col>
                <Col xs={12} className={'loginFailed-text-line' }>
                 <span className='paddingRight10 loginFailed-text'>
                   {'An error occurred logging you in to App.'}
                 </span>
                </Col>
                <Col xs={12} className={'loginFailed-text-line'}>
                 <span className='paddingRight10 loginFailed-text'>
                     {'Please reach out to @com or VoIP:  for further assistance.'}
                 </span>
                </Col>
            </div>
        )
    }

}
export default LoginFailed
