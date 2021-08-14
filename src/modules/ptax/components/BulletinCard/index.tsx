import React, { useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { BULLETIN } from "../../constants/rate";
import Rate from "../../models/Rate";
import { format, parse } from 'date-fns';
import { getBrCurrencySymbol } from "../../../../shared/utils/CurrencyUtils";

export interface IBulletinCardProps {
  rate?: Rate;
  headText?: string;
  options?: any;
}

const BulletinCard = ({ headText, rate, options }: IBulletinCardProps) => {
  const time = useMemo(
    () => rate ? format(parse(rate.date.toString(), 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), 'kk:mm:ss') : '-',
    [rate]
  );

  const getPrice = (value: Number, date: Date) => (
    <>
      <span>{getBrCurrencySymbol(date)}</span>
      {value}
    </>
  );

  return (
    <Card {...options} className="per-day-table__card">
      {
        headText
          ? (
            <Card.Header>
              <span>{headText}</span>
            </Card.Header>
          )
          : null
      }
      <Card.Body className="per-day-table__card-body">
        <Row>
          <Col xs={5} className="per-day-table__info">
            <div>{BULLETIN.CLOSING}</div>
            <div>
              {time}
            </div>
          </Col>
          <Col className="per-day-table__rate">
            <div>
              <span className="per-day-table__rate-price-title">Compra</span>
              <div className="per-day-table__rate-price-value buy-color">
                { rate ? getPrice(rate.buy, rate.date) : '-' }
              </div>
            </div>
            <div>
              <span className="per-day-table__rate-price-title">Venda</span>
              <div className="per-day-table__rate-price-value sell-color">
                { rate ? getPrice(rate.sell, rate.date) : '-' }
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BulletinCard;
