import React from 'react';
import { format } from "date-fns";
import 'react-datepicker/dist/react-datepicker.css';

import Global from './../../GloabalVars';
import ModalError from '../Modals/ModalError';
import './../../datepicker.css'
import PerDay from '../PerDay/perDay'

class PerDayContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // Moedas disponíveis
            currencies: [],
            // Câmbio
            rates: [],
            // Moeda selecionada para busca
            selectedCurrency: "USD",
            // Moeda da última busca ocorrida com sucesso
            displayedCurrency: "USD",
            // Data selecionada para busca
            selectedDate: new Date(),
            // Data da última busca ocorrida com sucesso
            displayedDate: new Date(),
            // Está buscando moedas?
            isLoadingCurrencies: false,
            // Está buscando câmbio?
            isLoadingExchangeRate: false,            
            // A última requisição de câmbio falhou?
            isLastLoadingFail: false,
            // Componente está intocado
            isPristine: true,
            modalErrorShow: false, 
            modalErrorText: ""
        };
    }
    
    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies = () => {
        this.setState({ isLoadingCurrencies: true });
        fetch(Global.RequestURLs.currencies, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(
                response => response.json(), 
                error => this.setState({modalErrorShow: true, modalErrorText:"Ocorreu um problema ao tentar obter as moedas disponíveis. =("})
            ).then(json => {
                if (json) {
                    this.setState({ currencies: json.value })
                } else {
                    console.log("fecth currencies error");
                }
                this.setState({ isLoadingCurrencies: false })
            });
    }

    fetchExchangeRate = () => {
        this.setState({ isLoadingExchangeRate: true, isPristine: false });
        fetch(Global.RequestURLs.exchangeRateDay
            .replace("@CURRENCY", this.state.selectedCurrency)
            .replace("@DATERATE", format(this.state.selectedDate, "MM-dd-yyyy")), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(
            response => response.json(), 
            error => this.setState({modalErrorShow: true, modalErrorText:"Não foi possível se conectar com o serviço do Banco Central. Favor tentar novamente."})
        ).then(json => {
                if (json) {
                    console.log(json)
                    this.setState({rates: json.value, isLastLoadingFail: false, displayedDate:this.state.selectedDate, displayedCurrency:this.state.selectedCurrency});                    
                } else {
                    this.setState({isLastLoadingFail: true});
                    console.log("fetch exchange rate error");                    
                }                
                this.setState({ isLoadingExchangeRate: false });
            });
    }

    // Button to request quotations click event
    quotationClick = e => {
        e.preventDefault();
        if(this.state.currencies.length < 1) {
            this.setState({modalErrorShow: true, modalErrorText:"Nenhuma moeda foi selecionada."});
        } else {
            this.fetchExchangeRate();
        }
    }
    // Currency select element change event
    currencyChangeEvent = e => { this.setState({ selectedCurrency: e.target.value }) }
    // Order currency list
    sortCurrenciesByPriority = () => {
        this.state.currencies.sort((a, b) =>
            Global.getCurrencyPriority(a.simbolo) - Global.getCurrencyPriority(b.simbolo))
    };

    render() {
        this.sortCurrenciesByPriority();
        let currencyOptions = this.state.currencies.map(currency =>
            <option key={currency.simbolo} value={currency.simbolo}>{currency.simbolo} - {currency.nomeFormatado}</option>
        );
        let modalErrorClose = () => {this.setState({modalErrorShow: false})};
        return (
            <div>
                <PerDay {...this.state} 
                    currencyOptions={currencyOptions} 
                    currencyChangeEvent={this.currencyChangeEvent}
                    dateChangeEvent={date => { this.setState({ selectedDate: date }) }}
                    quotationClick={this.quotationClick}>                
                </PerDay>
                <ModalError
                    bodyText={this.state.modalErrorText}
                    onHide={modalErrorClose}
                    show={this.state.modalErrorShow}>
                </ModalError>
            </div>
        );
    }
}

export default PerDayContainer;