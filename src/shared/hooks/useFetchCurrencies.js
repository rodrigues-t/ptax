import { useState, useEffect } from "react";

const useFetchCurrencies = (url, options) => {
    const [currencies, setCurrencies] = useState(null)
    const [currenciesError, setCurrenciesError] = useState(null);
    const [currenciesLoading, setCurrenciesLoading] = useState(true); 
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const doFetch = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                if (!signal.aborted) {
                    setCurrencies(json.value);
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
    }, [url, options]); 
    
    return { currencies, currenciesError, currenciesLoading };
}

export default useFetchCurrencies;