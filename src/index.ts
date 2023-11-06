import getHUFExchangeRate, {formatDateToYYYYMMDD} from "./get-exchange-rate.ts";
import {generateMNBCurrencyLink} from "./generate-mnb-currency-link.ts";

const dateInputStr = process.argv[2] || formatDateToYYYYMMDD(new Date());
const usdHufExchangeRate = await getHUFExchangeRate(dateInputStr, 'USD');
console.log(`USD/HUF exchange rate for ${dateInputStr}: ${usdHufExchangeRate}`);
console.log(`${generateMNBCurrencyLink(dateInputStr, 'USD')}\n`);

const eurHufExchangeRate = await getHUFExchangeRate(dateInputStr, 'EUR');
console.log(`EUR/HUF exchange rate for ${dateInputStr}: ${eurHufExchangeRate}`);
console.log(`${generateMNBCurrencyLink(dateInputStr, 'EUR')}\n`);
