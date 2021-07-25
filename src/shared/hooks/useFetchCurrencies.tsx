import { useState, useEffect } from 'react';
import CurrencyService from '../../modules/ptax/services/CurrencyService';
import Currency, { Moeda, parseDataToCurrency } from '../../modules/ptax/models/Currency';
import { getCurrencyPriority } from '../utils/CurrencyUtils';

const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currenciesError, setCurrenciesError] = useState(null);
  const [currenciesLoading, setCurrenciesLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const doFetch = async () => {
      try {
        const currencyService = new CurrencyService();
        const res = await currencyService.getCurrencies();
        if (!signal.aborted) {
          const curr: Currency[] = res.data.value.map((currData: Moeda) => parseDataToCurrency(currData));
          curr.sort((a, b) => getCurrencyPriority(a.symbol) - getCurrencyPriority(b.symbol));
          setCurrencies(curr);
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
};

export default useFetchCurrencies;
