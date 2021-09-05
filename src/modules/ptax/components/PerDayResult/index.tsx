import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import Rate from '../../models/Rate';
import '../../../../assets/styles/datepicker.css';
import { BULLETIN } from '../../constants/rate';
import { useMemo } from 'react';
import { BulletinClosingCard, BulletinDefaultCard } from '../BulletinCard';

interface IPerDayResultProps {
  rates: Rate[],
  displayedCurrency: string,
  displayedDate: Date,
}

const PerDayResult = (props: IPerDayResultProps) => {
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
      const inter: Array<Rate | undefined> = props.rates
        .filter((rate: Rate) => rate.bulletin === BULLETIN.INTERMEDIATE)
        .reverse();

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
                <Col className="per-day-result__default-section">
                  {
                    intermediates?.map((intermediate, i) => getBulletinDefaultCard(intermediate, i, { bg: 'light' }))
                  }
                  {getBulletinDefaultCard(opening, 'opening', { bg: 'light' })}
                </Col>
              </Row>
            </Col>
          </Row>
        )
      }
    </>
  );
};

export default PerDayResult;
