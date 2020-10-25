import React, { useState, useEffect, useCallback } from 'react';

import Spinner from "../shared/components/Spinner"
import useFetchCurrencies from "../shared/hooks/useFetchCurrencies";
import Global from '../GloabalVars';
import ModalError from '../shared/components/ModalError';
import { PerDayForm, PerDayTable } from '../modules/ptax/components'
import RateService from "../modules/ptax/services/RateService";
import Rate from "../modules/ptax/models/Rate";
import Error from "../shared/models/Error"

import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const RatePerDayContainer = () => {

    // State Hooks
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedCurrency, setDisplayedCurrency] = useState("USD");
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const [rates, setRates] = useState<Rate[]>([]);
    const [isPristine, setIsPristine] = useState(true); //TODO: state name needs to be reactored
    const [isLoadingExchangeRate, setIsLoadingExchangeRate] = useState(false); //TODO: rate fetch control needs to be improved
    const [isLastLoadingFail, setIsLastLoadingFail] = useState(false);//TODO: rate fetch control needs to be improved
    const [error, setError] = useState<Error>({ show: false, title: "Erro", text: "" });

    // Custom Hooks
    const { currencies, currenciesLoading, currenciesError } = useFetchCurrencies();

    // Effect Hooks
    useEffect(() => {
        if (currencies) {
            currencies.sort((a, b) =>
                Global.getCurrencyPriority(a.symbol) - Global.getCurrencyPriority(b.symbol))
        }
    }, [currencies])

    // Callbak Hooks
    const fetchExchangeRate = useCallback(async function () {
        try {
            setIsLoadingExchangeRate(true);
            setIsPristine(false);
            const response: Rate[] = await new RateService().getRatePerDay(selectedCurrency, selectedDate);
            setRates(response);
            setIsLastLoadingFail(false);
            setDisplayedDate(selectedDate);
            setDisplayedCurrency(selectedCurrency);
        } catch (e) {
            setIsLastLoadingFail(true);
            setError(
                (prevError) => {
                    return {
                        ...prevError,
                        show: true,
                        text: "Não foi possível se conectar com o serviço do Banco Central. Favor tentar novamente."
                    }
                }
            );
        } finally {
            setIsLoadingExchangeRate(false);
        }
    }, [selectedDate, selectedCurrency])

    const quotationClickCallback = useCallback(
        e => {
            e.preventDefault();
            if (currencies) {
                if (currencies.length < 1) {
                    setError(
                        (prevError) => {
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

    //TODO: turn it to callback
    const currencyChangeEvent = (e: any) => {
        setSelectedCurrency(e.target.value)
    }

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
                    currencyChangeEvent={currencyChangeEvent}
                    dateChangeEvent={(date: any) => { setSelectedDate(date) }}//TODO: Create callback
                    quotationClick={quotationClickCallback}
                >
                </PerDayForm>
            }
            {
                isLoadingExchangeRate &&
                <Row>
                    <Col className="text-center">
                        <FontAwesomeIcon icon="spinner" size="3x" color="grey" spin />
                    </Col>
                </Row>
            }
            {
                rates.length > 0 && !isLoadingExchangeRate &&
                <PerDayTable
                    rates={rates}
                    displayedCurrency={displayedCurrency}
                    displayedDate={displayedDate}
                >
                </PerDayTable>
            }
            {
                rates.length === 0 && !isPristine && !isLoadingExchangeRate && !isLastLoadingFail &&
                showInlineErrorMessage('Não existem cotações para a data escolhida.')
            }
            <ModalError
                error={error}
                onHide={() => setError({ ...error, show: false })}//TODO: create callback
            >
            </ModalError>
        </div>
    )
}

export default RatePerDayContainer;