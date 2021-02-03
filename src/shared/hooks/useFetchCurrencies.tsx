import { useState, useEffect } from "react";
import CurrencyService from "../../modules/ptax/services/CurrencyService";
import Currency, {Moeda, parseDataToCurrency} from "../../modules/ptax/models/Currency";

const useFetchCurrencies = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [currenciesError, setCurrenciesError] = useState(null);
    const [currenciesLoading, setCurrenciesLoading] = useState(true); 
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const doFetch = async () => {
            try {
                const currencyService = new CurrencyService();
                const res = await currencyService.getCurrencies();
                if (!signal.aborted) {
                    setCurrencies(res.data.value.map((curr:Moeda) => parseDataToCurrency(curr)));
                }
            } catch (e) {
                if (!signal.aborted) {
                    setCurrenciesError(e);
                }
            } finally {
                if (!signal.aborted) {
                    setCurrenciesLoading(false);
                }
            }
        };
        doFetch(); return () => {
            abortController.abort();
        };
    }, []);
    return { currencies, currenciesError, currenciesLoading };
}

export default useFetchCurrencies;