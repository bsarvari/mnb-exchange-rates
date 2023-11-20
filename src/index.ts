import getHUFExchangeRates, {formatDateToYYYYMMDD} from "./get-exchange-rate.ts";
import {generateMNBCurrencyLink} from "./generate-mnb-currency-link.ts";
import commandLineArgs from "command-line-args";

const optionDefinitions = [
  { name: 'currency', alias: 'c', type: String, defaultValue: 'USD' },
  { name: 'start-date', alias: 's', type: String, defaultOption: true, defaultValue: formatDateToYYYYMMDD(new Date()) },
  { name: 'end-date', alias: 'e', type: String }
]

const options = commandLineArgs(optionDefinitions)

const exchangeRates = await getHUFExchangeRates(options['start-date'], options['end-date'], options.currency);
console.log(`${options.currency}/HUF exchange rates: `, exchangeRates);
console.log(`${generateMNBCurrencyLink(options['start-date'], options.currency)}\n`);
