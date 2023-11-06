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

function simplifyExchangeRateData(data: MNBExchangeRatesData): SimplifiedExchangeRateData {
  const simplifiedData: SimplifiedExchangeRateData = {};

  if (data && data.elements && data.elements.length > 0) {
    const exchangeRates = data.elements[0].elements;

    exchangeRates.forEach((exchangeRate) => {
      if (exchangeRate.name === 'Day' && exchangeRate.attributes.date) {
        const date = exchangeRate.attributes.date;
        const rateElement = exchangeRate.elements.find((element) => element.name === 'Rate');

        if (rateElement && rateElement.elements.length > 0) {
          const exchangeRateValue = parseFloat(rateElement.elements[0].text.replace(',', '.'));
          simplifiedData[date] = exchangeRateValue;
        }
      }
    });
  }

  return simplifiedData;
}

async function getHUFExchangeRate(dateStr?: string, currency: string = 'USD'): Promise<number> {
  dateStr = dateStr || formatDateToYYYYMMDD(new Date());
  const client = await soap.createClientAsync(MNB_EXCHANGE_RATE_SERVICE_URL);

  const [result] = await client.GetExchangeRatesAsync({
    startDate: dateStr,
    endDate: dateStr,
    currencyNames: currency
  });

  const xmlResult = result.GetExchangeRatesResult;
  const jsonResult = convert.xml2json(xmlResult)
  const simplifiedResult = simplifyExchangeRateData(JSON.parse(jsonResult));
  return simplifiedResult[dateStr]
}

export { formatDateToYYYYMMDD };
export default getHUFExchangeRate;
