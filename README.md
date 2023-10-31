# mnb-exchange-rates
CLI to fetch MNB exchange rates for USD/HUF

## Usage
Note that for weekend days the MNB may not have data available which causes an error.

```bash
npm i

# fetch USD/HUF exchange rate for today
npm run fx

# fetch USD/HUF exchange rate for 2023-10-10 
npm run fx 2023-10-10

```

## TODO
- make tsc compilation work
- expose utility as aws lambda function
- support multiple currencies and perhaps date ranges
