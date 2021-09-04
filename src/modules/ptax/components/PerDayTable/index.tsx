import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { format, parse } from 'date-fns';
import Rate from '../../models/Rate';
import '../../../../assets/styles/datepicker.css';
import { useMemo } from 'react';
import { getBrCurrencySymbol } from '../../../../shared/utils/CurrencyUtils';

interface IPerDayTableProps {
  rates: Rate[],
  displayedCurrency: string,
  displayedDate: Date,
}

const PerDayTable = (props: IPerDayTableProps) => {
  return (
    <>
      {
        props.rates.length > 0
        && (
          <Card>
            <Card.Header>
              <span>
                {'Cotação detalhada'}
              </span>
            </Card.Header>
            <Card.Body className="p-0">
              <Table className="the-table" hover responsive striped>
                <thead>
                  <tr>
                    <th>Boletim</th>
                    <th>Compra</th>
                    <th>Paridade</th>
                    <th>Venda</th>
                    <th>Paridade</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.rates.map((rate: Rate) => (
                      <tr key={rate.date.toString()}>
                        <td className="small td-table-day-ptax">{rate.bulletin}</td>
                        <td className="text-primary td-table-day-ptax">
                          {getBrCurrencySymbol(rate.date)}
                          {rate.buy}
                        </td>
                        <td className="td-table-day-ptax">
                          {rate.buyParity}
                        </td>
                        <td className="text-success td-table-day-ptax">
                          {getBrCurrencySymbol(rate.date)}
                          {rate.sell}
                        </td>
                        <td className="td-table-day-ptax">
                          {rate.sellParity}
                        </td>
                        <td className="td-table-day-ptax">
                          {format(parse(rate.date.toString(), 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), 'kk:mm:ss')}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )
      }
    </>
  );
};

export default PerDayTable;
