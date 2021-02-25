import React, { useState, useEffect, useCallback } from 'react';
import Rate from '../../modules/ptax/models/Rate';
import Spinner from '../../shared/components/Spinner';
import useFetchCurrencies from '../../shared/hooks/useFetchCurrencies';
import ILoadState from '../../shared/models/ILoadState';
import Error from "../../shared/models/Error";
import { getCurrencyPriority } from '../../shared/utils/CurrencyUtils';

const RatePerPeriodContainer = () => {
    // State Hooks
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [displayedCurrency, setDisplayedCurrency] = useState("USD");
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [displayedStartDate, setDisplayedStartDate] = useState(new Date());
    const [selectedEndtDate, setSelectedEndDate] = useState(new Date());
    const [displayedEndDate, setDisplayedEndDate] = useState(new Date());
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

    return (
        <div>
            {
                currenciesLoading && <Spinner />
            }
        </div>
    )
}

export default RatePerPeriodContainer;