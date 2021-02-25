import React, { useState, useEffect, useCallback } from 'react';

import Spinner from "../../shared/components/Spinner";
import useFetchCurrencies from "../../shared/hooks/useFetchCurrencies";
import ModalError from '../../shared/components/ModalError';
import { PerDayForm, PerDayTable } from '../../modules/ptax/components';
import RateService from "../../modules/ptax/services/RateService";
import Rate from "../../modules/ptax/models/Rate";
import Error from "../../shared/models/Error";
import ILoadState from "../../shared/models/ILoadState";
import {getCurrencyPriority} from "../../shared/utils/CurrencyUtils";

import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RatePerDayContainer = () => {

    // State Hooks
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedCurrency, setDisplayedCurrency] = useState("USD");
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const [rates, setRates] = useState<Rate[]>([]);
    
    const [rateLoadControl, setRateLoadControl] = useState<ILoadState>({ isLoading: false, hasLastLoadFailed: false, isPristine: true });
    const [error, setError] = useState<Error>({ show: false, title: "Erro", text: "" });

    // Custom Hooks
    const { currencies, currenciesLoading, currenciesError } = useFetchCurrencies();

    // Effect Hooks
    useEffect(() => {
        if (currencies) {
            currencies.sort((a, b) =>
                getCurrencyPriority(a.symbol) - getCurrencyPriority(b.symbol))
        }
    }, [currencies])

    // Callbak Hooks
    const fetchExchangeRate = useCallback(async function () {
        try {
            setRateLoadControl(prev => { return { ...prev, isLoading: true, isPristine: false } });
            const response: Rate[] = await new RateService().getRatePerDay(selectedCurrency, selectedDate);
            setRates(response);
            setRateLoadControl(prev => { return { ...prev, hasLastLoadFailed: false } });
            setDisplayedDate(selectedDate);
            setDisplayedCurrency(selectedCurrency);
        } catch (e) {
            setRateLoadControl((prev) => { return { ...prev, hasLastLoadFailed: true } });
            setError(
                prevError => {
                    return {
                        ...prevError,
                        show: true,
                        text: "Não foi possível se conectar com o serviço do Banco Central. Favor tentar novamente."
                    }
                }
            );
        } finally {
            setRateLoadControl(prev => { return { ...prev, isLoading: false } });
        }
    }, [selectedDate, selectedCurrency])

    const rateClickCallback = useCallback(
        e => {
            e.preventDefault();
            if (currencies) {
                if (currencies.length < 1) {
                    setError(
                        prevError => {
                            return {
                                ...prevError,
                                show: true,
                                text: "Nenhuma moeda foi carregada."
                            }
                        }
                    );

                } else {
                    fetchExchangeRate();
                }
            }
        },
        [currencies, fetchExchangeRate],
    )
    
    const currencyChangeEventCallback = useCallback(
        e =>setSelectedCurrency(e.target.value),
        [setSelectedCurrency]
    );

    const dateChangeEventCallback = useCallback(
        date => setSelectedDate(date),
        [setSelectedDate]
    );
    
    const hideModalErrorCallback = useCallback(
        e => setError( prev => { return { ...prev, show: false } } ),
        [setError]
    )

    // Other functions
    const showInlineErrorMessage = (message: string) => {
        return (
            <Row>
                <Col className="text-center">
                    <span className="text-danger">{message}</span>
                </Col>
            </Row>
        )
    }

    return (
        <div>
            {
                currenciesLoading && <Spinner />
            }
            {
                !currenciesLoading && currenciesError &&
                showInlineErrorMessage('Ocorreu um erro ao carregar as moedas disponíveis.')
            }
            {
                !currenciesLoading && !currenciesError &&
                <PerDayForm
                    selectedCurrency={selectedCurrency}
                    selectedDate={selectedDate}
                    currencies={currencies}
                    currencyChangeEvent={currencyChangeEventCallback}
                    dateChangeEvent={dateChangeEventCallback}
                    quotationClick={rateClickCallback}
                />
            }
            {
                rateLoadControl.isLoading &&
                <Row>
                    <Col className="text-center">
                        <FontAwesomeIcon icon="spinner" size="3x" color="grey" spin />
                    </Col>
                </Row>
            }
            {
                rates.length > 0 && !rateLoadControl.isLoading &&
                <PerDayTable
                    rates={rates}
                    displayedCurrency={displayedCurrency}
                    displayedDate={displayedDate}
                >
                </PerDayTable>
            }
            {
                rates.length === 0 && !rateLoadControl.isPristine && !rateLoadControl.isLoading && !rateLoadControl.hasLastLoadFailed &&
                showInlineErrorMessage('Não existem cotações para a data escolhida.')
            }
            <ModalError
                error={error}
                onHide={hideModalErrorCallback}
            >
            </ModalError>
        </div>
    )
}

export default RatePerDayContainer;