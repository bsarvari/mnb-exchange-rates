import getUSDHUFExchangeRate, {formatDateToYYYYMMDD} from "./get-exchange-rate.ts";
import {generateMNBCurrencyLink} from "./generate-mnb-currency-link.ts";

const dateInputStr = process.argv[2] || formatDateToYYYYMMDD(new Date());
const usdHufExchangeRate = await getUSDHUFExchangeRate(dateInputStr);
console.log(`USD/HUF exchange rate for ${dateInputStr}: ${usdHufExchangeRate}`);

console.log(generateMNBCurrencyLink(dateInputStr, 'USD'));
console.log(generateMNBCurrencyLink(dateInputStr, 'EUR'));
