import React, { useState, useEffect, useCallback } from 'react';

import useFetchCurrencies from "../../hooks/useFetchCurrencies";
import Global from '../../GloabalVars';
import ModalError from '../../components/Modals/ModalError';
import PerDayForm from '../../components/PerDayForm'
import PerDayTable from '../../components/PerDayTable'
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from "date-fns";

const PerDayContainer = (props) => {

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
    const { currencies, currenciesLoading, currenciesError } = useFetchCurrencies(
        Global.RequestURLs.currencies
    );

    // Effect Hooks
    useEffect(() => {
        if (currencies) {
            currencies.sort((a, b) =>
                Global.getCurrencyPriority(a.simbolo) - Global.getCurrencyPriority(b.simbolo))
        }
    }, [currencies])

    // Callbak Hooks
    const fetchExchangeRate =useCallback(async function () {
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
                setIsLastLoadingFail(true)
            }
        } catch (e) {
            console.log(e)
            setModalErrorShow(true);
            setModalErrorText("Não foi possível se conectar com o serviço do Banco Central. Favor tentar novamente.");
        } finally {
            setIsLoadingExchangeRate(false);
        }
    }, [selectedDate,selectedCurrency])

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

    // Currency select element change event
    const currencyChangeEvent = e => { setSelectedCurrency(e.target.value) }
    const getCurrencyOptions = () => {
        return currencies.map(currency =>
            <option key={currency.simbolo} value={currency.simbolo}>{currency.simbolo} - {currency.nomeFormatado}</option>
        );
    }

    return (
        <div>
            {
                currenciesLoading &&
                <div>Carregando Moedas</div>
            }
            {
                !currenciesLoading && currenciesError &&
                <div>Ocorreu um erro ao carregar as moedas disponíveis</div>
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
            <ModalError
                bodyText={modalErrorText}
                onHide={() => setModalErrorShow(false)}
                show={modalErrorShow}>
            </ModalError>
        </div>
    )

    // render() {
    //     this.sortCurrenciesByPriority();
    //     let currencyOptions = this.state.currencies.map(currency =>
    //         <option key={currency.simbolo} value={currency.simbolo}>{currency.simbolo} - {currency.nomeFormatado}</option>
    //     );
    //     let modalErrorClose = () => {this.setState({modalErrorShow: false})};
    //     return (
    //         <div>
    //             <PerDay {...this.state} 
    //                 currencyOptions={currencyOptions} 
    //                 currencyChangeEvent={this.currencyChangeEvent}
    //                 dateChangeEvent={date => { this.setState({ selectedDate: date }) }}
    //                 quotationClick={this.quotationClick}>                
    //             </PerDay>
    //             <ModalError
    //                 bodyText={this.state.modalErrorText}
    //                 onHide={modalErrorClose}
    //                 show={this.state.modalErrorShow}>
    //             </ModalError>
    //         </div>
    //     );
    // }
}

export default PerDayContainer;