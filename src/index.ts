import getUSDHUFExchangeRate, {formatDateToYYYYMMDD} from "./get-exchange-rate.ts";

const dateInputStr = process.argv[2] || formatDateToYYYYMMDD(new Date());
const usdHufExchangeRate = await getUSDHUFExchangeRate(dateInputStr);
console.log(`USD/HUF exchange rate for ${dateInputStr}: ${usdHufExchangeRate}`);
