import soap from 'soap';
import convert from 'xml-js';

type ExchangeRate = {
  type: string;
  name: string;
  elements: Day[];
};

type Day = {
  type: string;
  name: string;
  attributes: {
    date: string;
  };
  elements: Rate[];
};

type Rate = {
  type: string;
  name: string;
  attributes: {
    unit: string;
    curr: string;
  };
  elements: Text[];
};

type Text = {
  type: string;
  name: string;
  text: string;
};

type MNBExchangeRatesData = {
  elements: ExchangeRate[];
};

type SimplifiedExchangeRateData = Record<string, number>;

const MNB_EXCHANGE_RATE_SERVICE_URL = 'https://www.mnb.hu/arfolyamok.asmx?WSDL';

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with '0' if needed.
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function parseExchangeRates(data) {
  const exchangeRatesMap = new Map();

  if (data.elements && data.elements.length > 0) {
    const days = data.elements[0].elements;
    for (const day of days) {
      const date = day.attributes.date;
      const rateElement = day.elements.find((el) => el.name === "Rate");

      if (date && rateElement) {
        const exchangeRate = parseFloat(rateElement.elements[0].text.replace(",", "."));

        if (!isNaN(exchangeRate)) {
          exchangeRatesMap.set(date, exchangeRate);
        }
      }
    }
  }

  // Convert the map to an array of entries, sort by date, and create a new map
  return new Map([...exchangeRatesMap.entries()].sort());
}

async function getHUFExchangeRate(startDate?: string, endDate?: string, currency: string = 'USD'): Promise<Map<any, any>> {
  startDate = startDate || formatDateToYYYYMMDD(new Date());
  endDate = endDate || startDate;
  const client = await soap.createClientAsync(MNB_EXCHANGE_RATE_SERVICE_URL);

  const [result] = await client.GetExchangeRatesAsync({
    startDate,
    endDate,
    currencyNames: currency
  });

  const xmlResult = result.GetExchangeRatesResult;
  const jsonResult = convert.xml2json(xmlResult)
  return parseExchangeRates(JSON.parse(jsonResult))
}

export { formatDateToYYYYMMDD };
export default getHUFExchangeRate;
