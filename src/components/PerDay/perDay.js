import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
                            popperModifiers={{
                                flip: {
                                    enabled: false
                                },
                                preventOverflow: {
                                    enabled: true,
                                    escapeWithReference: false
                                }
                            }}
                            dateFormat="DD/MM/YYYY"
                            selected={props.selectedDate}
                            onChange={props.dateChangeEvent}
                            className="form-control" />
                    </div>                    
                    <div className="form-group col-sm-2">
                        <button onClick={props.quotationClick} className="btn btn-secondary btn-block">enviar <FontAwesomeIcon icon="arrow-right"></FontAwesomeIcon></button>
                    </div>                    
                </div>                    
            </form>
            {
                props.rates.length === 0 && !props.isPristine && !props.isLoadingExchangeRate && !props.isLastLoadingFail &&
                <div className="row">
                    <div className="col text-center">
                        <hr />
                        <span className="text-danger">Não existe cotações para a data escolhida</span>
                    </div>
                </div>
            }
            {
                props.isLoadingExchangeRate &&
                <div className="row">
                    <div className="col text-center">
                        <hr />                            
                        <FontAwesomeIcon icon="spinner" size="3x" color="red" spin />
                    </div>
                </div>
            }
            {
            props.rates.length > 0 &&
            <div className="card">
                <div className="card-header">
                    <span>{props.displayedCurrency + " - " + moment(props.displayedDate).format('DD/MM/YYYY')}</span>
                </div>
                <div className="card-body p-0">                        
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Compra</th>
                                <th>Venda</th>
                                <th className="d-none d-sm-block">Hora</th>
                                <th>Boletim</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.rates.map((rate, i) => {
                                return (

                                    <tr key={i}>
                                        <td className="text-primary">                                            
                                            {moment(rate.dataHoraCotacao).isSameOrAfter(moment('01/07/1994', 'DD/MM/YYYY')) && "R$"}
                                            {rate.cotacaoCompra}</td>
                                        <td className="text-success">
                                            {moment(rate.dataHoraCotacao).isSameOrAfter(moment('01/07/1994', 'DD/MM/YYYY')) && "R$"}{rate.cotacaoVenda}</td>
                                        <td className="d-none d-sm-block">{moment(rate.dataHoraCotacao).format('HH:mm:ss')}</td>
                                        <td className="elip small">{rate.tipoBoletim}</td>                                            
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>}            
        </div>
    );
} 

export default PerDay;