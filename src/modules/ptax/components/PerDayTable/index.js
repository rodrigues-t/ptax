import React from 'react';

import '../../../../assets/styles/datepicker.css';

import {getBrCurrencySymbol} from '../../../../shared/utils/CurrencyUtils';

import { Card, Table } from 'react-bootstrap';
import { format, parse } from "date-fns";

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
                                                {getBrCurrencySymbol(rate.dataHoraCotacao)}
                                                {rate.cotacaoCompra}
                                            </td>
                                            <td className="text-success td-table-day-ptax">
                                                {getBrCurrencySymbol(rate.dataHoraCotacao)}
                                                {rate.cotacaoVenda}
                                            </td>
                                            <td className="td-table-day-ptax">
                                                {format(parse(rate.dataHoraCotacao, 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), 'kk:mm:ss')}
                                            </td>
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