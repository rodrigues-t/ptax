import CurrencyService from "./CurrencyService";

test('Enable to fetch currencies', async () => {
    const { data } = await new CurrencyService().getCurrencies();
    expect(data.value.length).toBeGreaterThan(0);
})