import React, { useState, useEffect, useCallback } from 'react';

import Spinner from "../shared/components/Spinner"
import useFetchCurrencies from "../shared/hooks/useFetchCurrencies";
import Global from '../GloabalVars';
import ModalError from '../components/Modals/ModalError';
import { PerDayForm, PerDayTable } from '../modules/ptax/components'
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from "date-fns";

const PerDayContainer = () => {

    // State Hooks
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayedCurrency, setDisplayedCurrency] = useState("USD");
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const [rates, setRates] = useState([]);
    const [isPristine, setIsPristine] = useState(true)
    const [isLoadingExchangeRate, setIsLoadingExchangeRate] = useState(false);
    const [isLastLoadingFail, setIsLastLoadingFail] = useState(false);
    const [modalErrorShow, setModalErrorShow] = useState(false);
    const [modalErrorText, setModalErrorText] = useState("");

    // Custom Hooks
    const { currencies, currenciesLoading, currenciesError } = useFetchCurrencies();

    // Effect Hooks
    useEffect(() => {
        if (currencies) {
            currencies.sort((a, b) =>
                Global.getCurrencyPriority(a.simbolo) - Global.getCurrencyPriority(b.simbolo))
        }
    }, [currencies])

    // Callbak Hooks
    const fetchExchangeRate = useCallback(async function () {
        try {
            setIsLoadingExchangeRate(true);
            setIsPristine(false);
            const res = await fetch(Global.RequestURLs.exchangeRateDay
                .replace("@CURRENCY", selectedCurrency)
                .replace("@DATERATE", format(selectedDate, "MM-dd-yyyy")));
            const json = await res.json();
            if (json) {
                setRates(json.value);
                setIsLastLoadingFail(false);
                setDisplayedDate(selectedDate);
                setDisplayedCurrency(selectedCurrency);
            } else {
                setIsLastLoadingFail(true);
            }
        } catch (e) {
            setIsLastLoadingFail(true);
            setModalErrorShow(true);
            setModalErrorText("Não foi possível se conectar com o serviço do Banco Central. Favor tentar novamente.");
        } finally {
            setIsLoadingExchangeRate(false);
        }
    }, [selectedDate, selectedCurrency])

    const quotationClickCallback = useCallback(
        e => {
            e.preventDefault();
            if (currencies) {
                if (currencies.length < 1) {
                    setModalErrorText("Nenhuma moeda foi selecionada.")
                    setModalErrorShow(true);
                } else {
                    fetchExchangeRate();
                }
            }
        },
        [currencies, fetchExchangeRate],
    )
    
    // Other functions
    const currencyChangeEvent = e => {
        setSelectedCurrency(e.target.value)
    }

    const showInlineErrorMessage = message => {
        return (
            <Row>
                <Col className="text-center">
                    <span className="text-danger">{message}</span>
                </Col>
            </Row>
        )
    }

    const getCurrencyOptions = () => {
        return currencies.map(currency =>
            <option key={currency.symbol} value={currency.symbol}>{currency.symbol} - {currency.formatedName}</option>
        );
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
                    currencyOptions={getCurrencyOptions()}
                    currencyChangeEvent={currencyChangeEvent}
                    dateChangeEvent={date => { setSelectedDate(date) }}
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
                bodyText={modalErrorText}
                onHide={() => setModalErrorShow(false)}
                show={modalErrorShow}>
            </ModalError>
        </div>
    )
}

export default PerDayContainer;