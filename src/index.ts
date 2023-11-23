import getHUFExchangeRates, {formatDateToYYYYMMDD} from "./get-exchange-rate.ts";
import {generateMNBCurrencyLink} from "./generate-mnb-currency-link.ts";
import commandLineArgs from "command-line-args";
import saveExchangeRates from "./save-exchange-rates.ts";

const optionDefinitions = [
  { name: 'currency', alias: 'c', type: String, defaultValue: 'USD' },
  { name: 'start-date', alias: 's', type: String, defaultOption: true, defaultValue: formatDateToYYYYMMDD(new Date()) },
  { name: 'end-date', alias: 'e', type: String },
  { name: 'save', alias: 'w', type: Boolean }
]

const options = commandLineArgs(optionDefinitions)
const startDate = options['start-date'];
const endDate = options['end-date'] || startDate;
const { currency } = options

const exchangeRates = await getHUFExchangeRates(startDate, endDate, currency);
if (options['save']) {
  await saveExchangeRates(startDate, endDate, currency, exchangeRates)
}
console.log(`${options.currency}/HUF exchange rates: `, exchangeRates);
console.log(`${generateMNBCurrencyLink(options['start-date'], options.currency)}\n`);
