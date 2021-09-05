import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import Rate from "../../models/Rate";
import { format, parse } from 'date-fns';
import RatePrice from "./RatePrice";

export interface IBulletinDefaultCardProps {
  rate: Rate | undefined;
  options?: any;
}

const BulletinDefaultCard = ({ rate, options }: IBulletinDefaultCardProps) => {
  const time = useMemo(
    () => rate ? format(parse(rate.date.toString(), 'yyyy-MM-dd kk:mm:ss.SSS', new Date()), 'kk:mm:ss') : '-',
    [rate]
  );

  return (
    <Card {...options} className="bulletin-card__default">
      <Card.Body className="bulletin-card__default-body">
        <div className="bulletin-card__default-body-info">
          <span>{rate?.bulletin}</span>
          <span>&bull;</span>
          <span>{time}</span>
        </div>
        <div className="bulletin-card__default-body-rate">
          <RatePrice type="buy" rate={rate} fixed={2} />
          <RatePrice type="sell" rate={rate} fixed={2} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default BulletinDefaultCard;
