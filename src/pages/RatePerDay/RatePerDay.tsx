import React, { useState, useCallback, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../shared/components/Spinner';
import useFetchCurrencies from '../../shared/hooks/useFetchCurrencies';
import ModalError from '../../shared/components/ModalError';
import { PerDayForm, PerDayTable } from '../../modules/ptax/components';
import Error from '../../shared/models/Error';
import { useGetExchangeRate } from '../../modules/ptax/hooks/api/useGetExchangeRate';

const RatePerDayContainer = () => {
  // States
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState<Error>({ show: false, title: 'Erro', text: '' });
  
  // Custom hooks
  const { currencies, currenciesLoading, currenciesError } = useFetchCurrencies();
  const { getExchangeRate, exchangeRateLoadStatus, exchangeRateResult } = useGetExchangeRate();
  
  // effects
  useEffect(() => {
    if(exchangeRateLoadStatus.hasLastLoadFailed) {
      setError(prevError => ({
        ...prevError,
        show: true,
        text: 'Não foi possível se conectar com o serviço do Banco Central. Favor tentar novamente.',
      }));
    }
  }, [exchangeRateLoadStatus]);

  // Callbak hooks
  const rateClickCallback = useCallback(
    e => {
      e.preventDefault();
      if (currencies) {
        if (currencies.length < 1) {
          setError(prevError => ({
            ...prevError,
            show: true,
            text: 'Nenhuma moeda foi carregada.',
          }));
        } else {
          getExchangeRate(selectedCurrency, selectedDate);
        }
      }
    },
    [currencies, getExchangeRate, selectedDate, selectedCurrency],
  );

  const currencyChangeEventCallback = useCallback(
    e => setSelectedCurrency(e.target.value),
    [setSelectedCurrency],
  );

  const dateChangeEventCallback = useCallback(
    date => setSelectedDate(date),
    [setSelectedDate],
  );

  const hideModalErrorCallback = useCallback(
    () => setError(prev => ({ ...prev, show: false })),
    [setError],
  );

  // Other functions
  const hasCurrenciesLoadFailed = () => !currenciesLoading && currenciesError;
  const hasCurrenciesLoadSucceed = () => !currenciesLoading && !currenciesError;
  const canShowTable = () => 
    exchangeRateResult && exchangeRateResult.rates?.length > 0 && !exchangeRateLoadStatus.isLoading;
  const showNoExchangeRateMessage = () => 
    exchangeRateResult
    && exchangeRateResult.rates.length === 0
    && !exchangeRateLoadStatus.isPristine
    && !exchangeRateLoadStatus.isLoading
    && !exchangeRateLoadStatus.hasLastLoadFailed;

  const showInlineErrorMessage = (message: string) => (
    <Row>
      <Col className="text-center">
        <span className="text-danger">{message}</span>
      </Col>
    </Row>
  );

  return (
    <div>
      {
        currenciesLoading && <Spinner />
      }
      {
        hasCurrenciesLoadFailed()
        && showInlineErrorMessage('Ocorreu um erro ao carregar as moedas disponíveis.')
      }
      {
        hasCurrenciesLoadSucceed()
        && (
          <PerDayForm
            selectedCurrency={selectedCurrency}
            selectedDate={selectedDate}
            currencies={currencies}
            currencyChangeEvent={currencyChangeEventCallback}
            dateChangeEvent={dateChangeEventCallback}
            quotationClick={rateClickCallback}
          />
        )
      }
      {
        exchangeRateLoadStatus.isLoading
        && (
          <Row>
            <Col className="text-center">
              <FontAwesomeIcon icon="spinner" size="3x" color="grey" spin />
            </Col>
          </Row>
        )
      }
      {
        canShowTable()
        && (
          <PerDayTable
            rates={exchangeRateResult!.rates}
            displayedCurrency={exchangeRateResult!.currency}
            displayedDate={exchangeRateResult!.date}
          />
        )
      }
      {
        showNoExchangeRateMessage()
        && showInlineErrorMessage('Não existem cotações para a data escolhida.')
      }
      <ModalError
        error={error}
        onHide={hideModalErrorCallback}
      />
    </div>
  );
};

export default RatePerDayContainer;
