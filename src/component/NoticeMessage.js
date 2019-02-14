import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ObjectAssign from "object-assign";
import * as actions from '../action'

class NoticeMessage extends Component {
    constructor(props) {
        super(props)
        const {message} = this.props
        this.state = {
            closeNotice: (message && message !== '') ? false : true,
            noShow: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const {message} = nextProps
        this.setState({
            closeNotice: (message && message !== '') ? false : true,
            noShow: false
        })
    }

    render() {
        let {closeNotice, noShow} = this.state
        if (closeNotice || noShow) {
            return false
        } else {
            return (
                <div className={'cardNotice ' + (this.props.className ? this.props.className : '')}>
                    <span>
                        {(typeof this.props.message === 'string') && this.props.message.constructor === String ?
                            <span dangerouslySetInnerHTML={{__html: this.props.message}}/>
                            : <span >
                                {this.props.message}
                            </span>}
                    </span>
                    <span style={{float: 'right', padding: '0 10px', marginRight: '10px', cursor: 'pointer'}}
                          onClick={() => {
                              this.setState({closeNotice: true}, () => {
                                  this.props.closeOSMNotice();
                              })
                          }}>×</span>
                </div>
            )
        }
    }

    static propTypes = {
        closeAction: PropTypes.func,
        className: PropTypes.string
    }
}

const mapStateToProps = (state, ownProps) => {
    const {notice} = state;
    return {...notice}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(ObjectAssign({}, actions, {dispatch}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeMessage)
