import React, { useMemo } from "react";
import { getBrCurrencySymbol } from "../../../../shared/utils/CurrencyUtils";
import Rate from "../../models/Rate";

type IRatePriceProps = {
  type: 'buy' | 'sell',
  rate?: Rate;
  fixed?: number;
};

const RatePrice = ({ type, rate, fixed }: IRatePriceProps) => {
  const getPrice = (value: Number, date: Date) => (
    <>
      <span>{getBrCurrencySymbol(date)}</span>
      {fixed ? value.toFixed(fixed) : value}
    </>
  );

  const isBuy = useMemo(() => type === 'buy', [type]);

  return (
    <div>
      <span className="bulletin-card__closing-body-rate-type">
        {type === 'buy' ? 'Compra' : 'Venda'}
      </span>
      <div className={`bulletin-card__closing-body-rate-value ${isBuy ? 'buy-color' : 'sell-color'}`}>
        {rate ? getPrice((isBuy ? rate.buy : rate.sell), rate.date) : '-'}
      </div>
    </div>
  );
};

export default RatePrice;
