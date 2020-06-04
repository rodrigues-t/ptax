import React from 'react';
import {Modal,Button} from 'react-bootstrap'

class ModalError extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {bodyText: this.props.bodyText};
    }

    render(){
        let {bodyText, ...rest} = this.props;
        return (            
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Erro
                    </Modal.Title>                    
                </Modal.Header>
                <Modal.Body>
                    <span className="text-danger">
                        {bodyText}
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalError;