import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { format, parse } from 'date-fns';
import Rate from '../../models/Rate';
import '../../../../assets/styles/datepicker.css';
import { getBrCurrencySymbol } from '../../../../shared/utils/CurrencyUtils';
import { BULLETIN } from '../../constants/rate';
import { useMemo } from 'react';
import BulletinCard from '../BulletinCard';

interface IPerDayTableProps {
  rates: Rate[],
  displayedCurrency: string,
  displayedDate: Date,
}

const PerDayTable = (props: IPerDayTableProps) => {
  const headerText = useMemo(
    () => `${props.displayedCurrency} - ${format(props.displayedDate, 'dd/MM/yyyy')}`,
    [props.displayedCurrency, props.displayedDate]
  );

  const closing = useMemo(
    () => props.rates.find((rate: Rate) => rate.bulletin == BULLETIN.CLOSING),
    [props.rates]
  );

  return (
    <>
      {
        props.rates.length > 0
        && (
          <Row>
            <Col>
              <BulletinCard
                rate={closing}
                headText={headerText}
                options={{ bg: "dark", text: "white" }}
              />
            </Col>
            <Col>
              <Row>
                <Card>
                  <Card.Body>

                  </Card.Body>
                </Card>
              </Row>
              <Row></Row>
            </Col>
          </Row>
        )
        // <Card>
        //   <Card.Header>
        //     <span>
        //       {getHeaderText()}
        //     </span>
        //   </Card.Header>
        //   <Card.Body className="p-0">
        //     <Table className="the-table" hover responsive striped>
        //       <thead>
        //         <tr>
        //           <th>Boletim</th>
        //           <th>Compra</th>
        //           <th>Venda</th>
        //           <th>Hora</th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {
        //           props.rates.map((rate: Rate) => (
        //             <tr key={rate.date.toString()}>
        //               <td className="small td-table-day-ptax">{rate.bulletin}</td>
        //               <td className="text-primary td-table-day-ptax">
        //                 {getBrCurrencySymbol(rate.date)}
        //                 {rate.buy}
        //               </td>
        //               <td className="text-success td-table-day-ptax">
        //                 {getBrCurrencySymbol(rate.date)}
        //                 {rate.sell}
        //               </td>
        //               <td className="td-table-day-ptax">
        //                 {format(parse(rate.date.toString(), 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), 'kk:mm:ss')}
        //               </td>
        //             </tr>
        //           ))
        //         }
        //       </tbody>
        //     </Table>
        //   </Card.Body>
        // </Card>)
      }
    </>
  );
};

export default PerDayTable;
