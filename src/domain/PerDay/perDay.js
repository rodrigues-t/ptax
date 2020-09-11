import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { format } from "date-fns";
import { Row, Col, Card, Table } from 'react-bootstrap';

const PerDay = props => {
    let currencyOptions = props.currencyOptions;
    return (
        <div>
            <form className="form-horizontal">
                <div className="form-row">
                    <div className="input-group form-group col-sm-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text" htmlFor="selectCurrencies">
                                <FontAwesomeIcon icon="coins" />
                            </span>
                        </div>
                        <select id="selectCurrencies" className="custom-select"
                            value={props.selectedCurrency} onChange={props.currencyChangeEvent}>
                            {currencyOptions}
                        </select>
                    </div>
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
                </div>
            </form>
            {
                //console.log(props.rates, props.isPristine, props.isLoadingExchangeRate, props.isLastLoadingFail)
                props.rates.length === 0 && !props.isPristine && !props.isLoadingExchangeRate && !props.isLastLoadingFail &&
                <Row>
                    <Col className="text-center">
                        {/* <hr /> */}
                        <span className="text-danger">Não existe cotações para a data escolhida</span>
                    </Col>
                </Row>
            }
            {/* {
                props.isLoadingExchangeRate &&
                <Row>
                    <Col className="text-center">
                        <hr />
                        <FontAwesomeIcon icon="spinner" size="3x" color="red" spin />
                    </Col>
                </Row>
            }
            {
                props.rates.length > 0 &&
                <Card>
                    <Card.Header>
                        <span>
                            {
                                props.displayedCurrency + " - " + format(props.displayedDate, "dd/MM/yyyy")
                            }
                        </span>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table className="the-table" hover responsive striped>
                            <thead>
                                <tr>
                                    <th>Boletim</th>
                                    <th>Compra</th>
                                    <th>Venda</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.rates.map((rate, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="small td-table-day-ptax">{rate.tipoBoletim}</td>
                                            <td className="text-primary td-table-day-ptax">
                                                {moment(rate.dataHoraCotacao).isSameOrAfter(moment('01/07/1994', 'DD/MM/YYYY')) && "R$"}
                                                {rate.cotacaoCompra}
                                            </td>
                                            <td className="text-success td-table-day-ptax">
                                                {moment(rate.dataHoraCotacao).isSameOrAfter(moment('01/07/1994', 'DD/MM/YYYY')) && "R$"}{rate.cotacaoVenda}
                                            </td>
                                            <td className="td-table-day-ptax">{moment(rate.dataHoraCotacao).format('HH:mm:ss')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            } */}
        </div>
    );
}

export default PerDay;