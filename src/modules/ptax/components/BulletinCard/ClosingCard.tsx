import React, { useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Rate from "../../models/Rate";
import { format, parse } from 'date-fns';
import RatePrice from "./RatePrice";

export interface IBulletinClosingCardProps {
  rate?: Rate;
  headText?: string | null;
  options?: any;
}

const BulletinClosingCard = ({ headText, rate, options }: IBulletinClosingCardProps) => {
  const time = useMemo(
    () => rate ? format(parse(rate.date.toString(), 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), 'kk:mm:ss') : '-',
    [rate]
  );

  const getHeader = (text: string) => (
    <Card.Header>
      <span>{text}</span>
    </Card.Header>
  );

  return (
    <Card {...options} className="bulletin-card__closing">
      {headText ? getHeader(headText) : null}
      <Card.Body className="bulletin-card__closing-body">
        <Row>
          <Col xs={12} md={5}>
            <div>{rate?.bulletin}</div>
            <div>{time}</div>
          </Col>
          <Col className="bulletin-card__closing-body-rate">
            <RatePrice type="buy" rate={rate} />
            <RatePrice type="sell" rate={rate} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BulletinClosingCard;
