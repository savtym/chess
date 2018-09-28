import React from 'react';
import './cancelConfirmComponent.scss';
import { Button } from 'react-bootstrap';

const CancelConfirmComponent = ({ cancel, confirm }) => {
    return (
        <div className="cancel-confirm-component">
            <Button bsStyle="warning" {...cancel} >Cancel</Button>
            <Button bsStyle="success" {...confirm} >Confirm</Button>
        </div>
    )
};
export default CancelConfirmComponent;

