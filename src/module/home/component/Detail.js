import React from "react";
import {Col, ControlLabel, Form, FormControl, Modal, OverlayTrigger, Popover} from "react-bootstrap";


export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        let downloadApiUrl = window.global['API_BASE'];
        if (downloadApiUrl.endsWith('/rest')) {
            downloadApiUrl = downloadApiUrl.substr(0, downloadApiUrl.length - 5);
        }

        this.state = {
            downloadApiUrl,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={ this.closeModal } dialogClassName="custom-modal">
                <Modal.Header closeButton className="commonBackground ">
                    <h4 className="modal-title text-left buyerCardTabHeader">Reconcile Buyer Card Charge</h4>
                </Modal.Header>
                <Modal.Body style={{paddingBottom: '0px'}}>

                </Modal.Body>
                <Modal.Footer >
                    <span className="marginLeft10px" style={this.props.canEdit ? {} : {display: 'none'}}>
                        <button type="button" className="formButton submit" onClick={this.handleSave}>Submit</button>
                        <button type="button" className="formButton clear" onClick={()=>{this.handleClear(false)}}>Clear</button>
                    </span>
                </Modal.Footer>
            </Modal>
        );
    }
}