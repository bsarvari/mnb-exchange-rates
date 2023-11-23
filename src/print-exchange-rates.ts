export default function printExchangeRateData(dataMap, currency) {
  const columnHeaders = ['Date', `${currency}/HUF Exchange Rate`];
  const tableString = [columnHeaders.join('\t')];

  dataMap.forEach((exchangeRate, date) => {
    const rowString = [date, exchangeRate].join('\t');
    tableString.push(rowString);
  });

  console.log(tableString.join('\n'));
}
