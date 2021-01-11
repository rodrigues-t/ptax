import RateService from "./RateService"
import Rate from "../models/Rate"

test('the USD exchange rate is BRL 5.3677 on January 08 2021', async () => {
    const date = new Date('January 08, 2021');
    let data:Rate[] = await new RateService().getRatePerDay("USD", date);
    expect(data.find(r => r.bulletin == "Fechamento PTAX")?.buy).toBe(5.3677);
})

test('the EUR exchange rate is BRL 6.5776 on January 08 2021', async () => {
    const date = new Date('January 08, 2021');
    const data = await new RateService().getRatePerDay("EUR", date);
    expect(data.find(r => r.bulletin == "Fechamento PTAX")?.buy).toBe(6.5776);
})