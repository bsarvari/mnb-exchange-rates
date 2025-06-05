export function generateMNBCurrencyLink(startDate: string, endDate: string, currency: string): string {
  // https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=EUR&datefrom=2023.03.28.&datetill=2023.03.30.&order=1
  // Construct the link using the provided date and currency
  const formattedStartDate = startDate.replace(/-/g, '.');
  const formattedEndDate = endDate.replace(/-/g, '.');
  return `https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=${currency}&datefrom=${formattedStartDate}.&datetill=${formattedEndDate}.&order=1`;
}
