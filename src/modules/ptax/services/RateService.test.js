import RateService from "./RateService"

test('the USD exchange rate is 5.3677', async () => {
    const date = new Date('January 08, 2021');
    const data = await new RateService().getRatePerDay("USD", date);
    expect(data.length).toBeGreaterThan(0);
})