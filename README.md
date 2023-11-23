# mnb-exchange-rates
CLI to fetch MNB ([the National Bank of Hungary](https://www.mnb.hu/en/) - Magyar Nemzeti Bank) exchange rates for HUF

## Usage
Note that for weekend days the MNB may not have data available which can cause an error.

* Default date: current date
* Default currency: USD

```bash
npm i

# fetch USD/HUF exchange rate for today - note this might fail if the current date is a weekend or a holiday
npm run fx

# fetch USD/HUF exchange rate for 2023-10-10 
npm run fx -- 2023-10-10

# list EUR/HUF rates from 2023-11-02 to 2023-11-21
npm run fx -- --start-date 2023-11-02 --end-date 2023-11-21 --currency EUR
npm run fx -- 2023-11-02 -e 2023-11-21 -c EUR

# save USD/HUF exchange rates as a json file for 2022 
npm run fx -- -s 2022-01-01 -e 2022-12-31 -w

```

## TODO
- [ ] publish as npm package
- [ ] make tsc compilation work
- [ ] expose utility as aws lambda function
- [x] store exchange rates in json files for quick access
- [x] support multiple currencies and perhaps date ranges
