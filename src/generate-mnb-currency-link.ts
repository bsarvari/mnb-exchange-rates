export function generateMNBCurrencyLink(date: string, currency: string): string {
  // Validate the date format (yyyy-mm-dd)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(datePattern)) {
    throw new Error('Invalid date format. Use yyyy-mm-dd format.');
  }

  // https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=EUR&datefrom=2023.03.28.&datetill=2023.03.30.&order=1
  // Construct the link using the provided date and currency
  const formattedDate = date.replace(/-/g, '.');
  return `https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=${currency}&datefrom=${formattedDate}.&datetill=${formattedDate}.&order=1`;
}
