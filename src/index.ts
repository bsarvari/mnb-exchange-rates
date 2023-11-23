import getHUFExchangeRates, { formatDateToYYYYMMDD } from "./get-exchange-rate.ts";
import { generateMNBCurrencyLink } from "./generate-mnb-currency-link.ts";
import commandLineArgs from "command-line-args";
import saveExchangeRates from "./save-exchange-rates.ts";
import printExchangeRateData from "./print-exchange-rates.ts";

const optionDefinitions = [
  { name: 'currency', alias: 'c', type: String, defaultValue: 'USD' },
  { name: 'start-date', alias: 's', type: String, defaultOption: true, defaultValue: formatDateToYYYYMMDD(new Date()) },
  { name: 'end-date', alias: 'e', type: String },
  { name: 'save', alias: 'w', type: Boolean },
  { name: 'print', alias: 'p', type: Boolean, defaultValue: true }
]

const options = commandLineArgs(optionDefinitions)
const startDate = options['start-date'];
const endDate = options['end-date'] || startDate;
const { currency } = options

const exchangeRates = await getHUFExchangeRates(startDate, endDate, currency);
if (options['save']) {
  await saveExchangeRates(startDate, endDate, currency, exchangeRates)
}
if (options['print']) {
  printExchangeRateData(exchangeRates, currency)
}
console.log(`\n${generateMNBCurrencyLink(startDate, options.currency)}\n`);
