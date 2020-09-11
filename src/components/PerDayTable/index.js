import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { Card, Table } from 'react-bootstrap';
import moment from 'moment';
import { format } from "date-fns";

const PerDayTable = props => {
    return (
        <>
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
            }
        </>
    )
}

export default PerDayTable;