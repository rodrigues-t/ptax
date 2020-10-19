import React from 'react';

import '../../../../assets/styles/datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { Form, Col, InputGroup } from 'react-bootstrap';

const PerDayForm = props => {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} sm={6}>
                    <InputGroup>
                        <div className="input-group-prepend">
                            <span className="input-group-text" htmlFor="selectCurrencies">
                                <FontAwesomeIcon icon="coins" />
                            </span>
                        </div>
                        <Form.Control 
                            id="selectCurrencies" 
                            as="select" 
                            custom
                            value={props.selectedCurrency} 
                            onChange={props.currencyChangeEvent}
                        >
                            {props.currencyOptions}
                        </Form.Control>
                    </InputGroup>
                </Form.Group>
                <div id="groupDate" className="input-group form-group col-sm-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text" htmlFor="date">
                            <FontAwesomeIcon icon="calendar-alt" />
                        </span>
                    </div>
                    <DatePicker id="date"
                        popperPlacement="bottom-start"
                        autoComplete='off'
                        popperModifiers={{
                            flip: {
                                enabled: false
                            },
                            preventOverflow: {
                                enabled: true,
                                escapeWithReference: false
                            }
                        }}
                        dateFormat="dd/MM/yyyy"
                        selected={props.selectedDate}
                        onChange={props.dateChangeEvent}
                        className="form-control" />
                </div>
                <div className="form-group col-sm-2">
                    <button onClick={props.quotationClick} className="btn btn-secondary btn-block">enviar <FontAwesomeIcon icon="arrow-right" size="sm"></FontAwesomeIcon></button>
                </div>
            </Form.Row>
        </Form>
    )
}

export default PerDayForm;