import { useState, useEffect } from "react";
import CurrencyService from "../../modules/ptax/services/CurrencyService"

const useFetchCurrencies = () => {
    const [currencies, setCurrencies] = useState(null)
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
                    setCurrencies(res.data.value);
                }
            } catch (e) {console.log(e)
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

// const useFetchCurrencies = (url, options) => {
//     const [currencies, setCurrencies] = useState(null)
//     const [currenciesError, setCurrenciesError] = useState(null);
//     const [currenciesLoading, setCurrenciesLoading] = useState(true); 
    
//     useEffect(() => {
//         const abortController = new AbortController();
//         const signal = abortController.signal;
//         const doFetch = async () => {
//             try {
//                 const res = await fetch(url, options);
//                 const json = await res.json();
//                 if (!signal.aborted) {
//                     setCurrencies(json.value);
//                 }
//             } catch (e) {
//                 if (!signal.aborted) {
//                     setCurrenciesError(e);
//                 }
//             } finally {
//                 if (!signal.aborted) {
//                     setCurrenciesLoading(false);
//                 }
//             }
//         };
//         doFetch(); return () => {
//             abortController.abort();
//         };
//     }, [url, options]); 
    
//     return { currencies, currenciesError, currenciesLoading };
// }

// export default useFetchCurrencies;