import { promises as fsPromises } from 'fs';
import path from 'path';

async function saveExchangeRates(startDate: string, endDate: string, currency: string, rates: Map<string, string>): Promise<void> {
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);

  const fileName = `${currency}HUF-exchange-rates-${startDate}-${endDate}.json`;
  const filePath = path.join(__dirname, '..', 'data', fileName);

  const exchangeRatesData = {
    currency,
    'start-date': startDate,
    'end-date': endDate,
    rates: Object.fromEntries(rates),
  };

  try {
    await fsPromises.writeFile(filePath, JSON.stringify(exchangeRatesData, null, 2));
    console.log(`Exchange rates saved to ${filePath}`);
  } catch (error) {
    console.error('Error saving exchange rates:', error.message);
  }
}

export default saveExchangeRates;
