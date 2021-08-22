import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import Rate from "../../models/Rate";
import { format, parse } from 'date-fns';
import { getBrCurrencySymbol } from "../../../../shared/utils/CurrencyUtils";

export interface IBulletinDefaultCardProps {
  rate: Rate | undefined;
  options?: any;
}

const BulletinDefaultCard = ({ rate, options }: IBulletinDefaultCardProps) => {
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
    <Card {...options} className="per-day-table__card-small">
      <Card.Body className="per-day-table__card-small-body">
        <div className="per-day-table__info">
          <span>{rate?.bulletin}</span>
          <span>{time}</span>
        </div>
        <div className="per-day-table__rate-small">
          <div>
            <span className="per-day-table__rate-small-price-title">Compra</span>
            <div className="per-day-table__rate-small-price-value buy-color">
              {rate ? getPrice(rate.buy, rate.date) : '-'}
            </div>
          </div>
          <div>
            <span className="per-day-table__rate-small-price-title">Venda</span>
            <div className="per-day-table__rate-small-price-value sell-color">
              {rate ? getPrice(rate.sell, rate.date) : '-'}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BulletinDefaultCard;
