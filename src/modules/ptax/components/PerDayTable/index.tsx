import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { format, parse } from 'date-fns';
import Rate from '../../models/Rate';
import '../../../../assets/styles/datepicker.css';
import { getBrCurrencySymbol } from '../../../../shared/utils/CurrencyUtils';

interface IPerDayTableProps {
  rates: Rate[],
  displayedCurrency: string,
  displayedDate: Date,
}

const PerDayTable = (props: IPerDayTableProps) => {
  return (
    <div className="per-day-table">
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
                        <td className="small">{rate.bulletin}</td>
                        <td className="text-primary">
                          {getBrCurrencySymbol(rate.date)}
                          {rate.buy}
                        </td>
                        <td>{rate.buyParity}</td>
                        <td className="text-success">
                          {getBrCurrencySymbol(rate.date)}
                          {rate.sell}
                        </td>
                        <td>{rate.sellParity}</td>
                        <td>
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
    </div>
  );
};

export default PerDayTable;
