import { useState } from "react";
import ILoadState from "../../../../shared/models/ILoadState";
import { getDefaultLoadState } from "../../helpers/loadStateHelper";
import Rate from "../../models/Rate";
import RateService from "../../services/RateService";

interface IExchangeRateResult {
  rates: Rate[],
  currency: string,
  date: Date,
}

export function useGetExchangeRate() {
  const [exchangeRateResult, setExchangeRateResult] = useState<IExchangeRateResult | null>(null);
  const [exchangeRateLoadStatus, setExhangeRateLoadStatus] = useState<ILoadState>(getDefaultLoadState());

  const getExchangeRate = async (currency: string, date: Date) => {
    setExhangeRateLoadStatus(prev => ({ ...prev, isLoading: true, isPristine: false }));
    new RateService().getRatePerDay(currency, date)
      .then((rates: Rate[]) => { 
        setExchangeRateResult({ rates, currency, date });
        setExhangeRateLoadStatus(prev => ({ ...prev, isLoading: false, hasLastLoadFailed: false, apiError: null }));
      })
      .catch(({ response }) => {
        setExchangeRateResult(null);
        setExhangeRateLoadStatus(prev => ({ 
          ...prev, 
          isLoading: false, 
          hasLastLoadFailed: true,
          apiError: { 
            code: response.status,
            message: response.data.mensagem,
          },
        }));
      });
  };

  return {
    getExchangeRate,
    exchangeRateLoadStatus,
    exchangeRateResult,
  };
}
