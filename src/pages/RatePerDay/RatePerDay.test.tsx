import React from 'react';
import { mount } from 'enzyme';
import RatePerDay from './RatePerDay';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

jest.mock('../../shared/hooks/useFetchCurrencies', () => () => ({
    currencies: [
        { symbol: "USD", formatedName: "Dólar dos Estados Unidos", currencyType: "A" },
        { symbol: "EUR", formatedName: "Euro", currencyType: "B" },
        { symbol: "GBP", formatedName: "Libra Esterlina", currencyType: "B" },
        { symbol: "CAD", formatedName: "Dólar canadense", currencyType: "A" },
        { symbol: "AUD", formatedName: "Dólar australiano", currencyType: "B" },
        { symbol: "CHF", formatedName: "Franco suíço", currencyType: "A" },
        { symbol: "JPY", formatedName: "Iene", currencyType: "A" },
        { symbol: "DKK", formatedName: "Coroa dinamarquesa", currencyType: "A" },
        { symbol: "NOK", formatedName: "Coroa norueguesa", currencyType: "A" },
        { symbol: "SEK", formatedName: "Coroa sueca", currencyType: "A" },
    ],
    currenciesError: null,
    currenciesLoading: false
}));

describe("Testes da página de cotação por dia", () => {
    const component = mount(<RatePerDay />)

    it("Teste se moeda escolhida é USD", () => {
        let select = component.find('select#selectCurrencies');
        expect(select.prop('value')).toBe('USD');
    });
});
