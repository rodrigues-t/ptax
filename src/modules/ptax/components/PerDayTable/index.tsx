import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import Rate from '../../models/Rate';
import '../../../../assets/styles/datepicker.css';
import { BULLETIN } from '../../constants/rate';
import { useMemo } from 'react';
import { BulletinClosingCard, BulletinDefaultCard } from '../BulletinCard';

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
    () => props.rates.find((rate: Rate) => rate.bulletin === BULLETIN.CLOSING),
    [props.rates],
  );

  const opening = useMemo(
    () => props.rates.find((rate: Rate) => rate.bulletin === BULLETIN.OPENING),
    [props.rates],
  );

  const intermediates = useMemo(
    () => {
      const inter: Array<Rate | undefined> = props.rates.filter((rate: Rate) =>
        rate.bulletin === BULLETIN.INTERMEDIATE);
      while (inter.length < 3) {
        inter.unshift(undefined);
      }

      return inter;
    },
    [props.rates],
  );

  const getBulletinDefaultCard = (rate: Rate | undefined, key: string | number, options: unknown) => (
    <BulletinDefaultCard
      key={`pddc_${key}`}
      rate={rate}
      options={options}
    />
  );

  return (
    <>
      {
        props.rates.length > 0
        && (
          <Row>
            <Col xs={12} md={6}>
              <BulletinClosingCard
                rate={closing}
                headText={headerText}
                options={{ bg: 'dark', text: 'white' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Row>
                <Col className="per-day-table__default-section">
                  {
                    intermediates?.map((intermediate, i) => getBulletinDefaultCard(intermediate, i, { bg: 'light' }))
                  }
                  {/* { getBulletinDefaultCard(intermediates[0], { bg: 'light' } ) }                
                  { getBulletinDefaultCard(intermediates[1], { bg: 'light' } ) }                
                  { getBulletinDefaultCard(intermediates[2], { bg: 'light' } ) }                 */}
                  {getBulletinDefaultCard(opening, 'opening', { bg: 'light' })}
                </Col>
              </Row>
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
