import React from 'react';

import '../../../../assets/styles/datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Form, Col, InputGroup } from 'react-bootstrap';
import ptBR from 'date-fns/locale/pt-BR';
import Currency from '../../models/Currency';

registerLocale('pt-BR', ptBR);

interface IPerDayForm {
  currencies: Currency[],
  selectedCurrency: string,
  selectedDate: Date,
  dateChangeEvent: any,
  currencyChangeEvent: any,
  quotationClick: any,
}

const PerDayForm = (props: IPerDayForm) => {
  const { currencies } = props;
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} sm={5}>
          <InputGroup>
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="selectCurrencies">
                <FontAwesomeIcon icon="coins" />
              </label>
            </div>
            <Form.Control
              id="selectCurrencies"
              as="select"
              custom
              value={props.selectedCurrency}
              onChange={props.currencyChangeEvent}
            >
              {
                currencies.map(currency =>
                  <option key={currency.symbol} value={currency.symbol}>
                    { `${currency.symbol} - ${currency.formatedName}` }
                  </option>)
              }
            </Form.Control>
          </InputGroup>
        </Form.Group>
        <div id="groupDate" className="groupDate input-group form-group col-sm-5">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="date">
              <FontAwesomeIcon icon="calendar-alt" />
            </label>
          </div>
          <DatePicker
            id="date"
            locale="pt-BR"
            popperPlacement="bottom-start"
            autoComplete="off"
            popperModifiers={{
              flip: {
                enabled: false,
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
              },
            }}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            selected={props.selectedDate}
            onChange={props.dateChangeEvent}
            className="form-control"
          />
        </div>
        <div className="form-group col-sm-2">
          <button type="button" onClick={props.quotationClick} className="btn btn-secondary btn-block">
            enviar <FontAwesomeIcon icon="arrow-right" size="sm" />
          </button>
        </div>
      </Form.Row>
    </Form>
  );
};

export default PerDayForm;
