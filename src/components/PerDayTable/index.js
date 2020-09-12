import React from 'react';

import './../../datepicker.css';

import { Card, Table } from 'react-bootstrap';
import { format, isAfter, parse } from "date-fns";

const PerDayTable = props => {

    const getBrCurrencySymbol = date => {
        return isAfter(
                    parse(date, 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), parse('30/06/1994 23:59:59.999', 'dd/MM/yyyy kk:mm:ss.SSS', new Date())
                ) ?
                'R$' : 
                '';
    }

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