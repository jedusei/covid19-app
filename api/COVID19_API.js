const API_URL = "https://covid19-graphql.netlify.app/";

function graphQL(query) {
    return fetch(
        API_URL,
        {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({ query })
        }
    ).then(res => res.json());
}

async function getCountries() {
    let result = await graphQL(`{
        countries {
          country
          countryInfo {
            flag
          }
        }
    }`);

    return result.data.countries.map(c => {
        return {
            name: c.country,
            flag: c.countryInfo.flag
        };
    });
}

async function getWorldStats() {
    let result = await graphQL(`{
        worldStats: globalTotal {
          confirmed: cases
          recovered
          deaths
        }
    }`);

    return result.data.worldStats;
}

async function getCountryStats(country) {
    let result = await graphQL(`{
        country(name: "${country}") {
            result {
                confirmed: cases
                tests
                deaths
                active
                recovered
                critical
                updated
            }
        }
    }`);

    return result.data.country.result;
}

export { getCountries, getWorldStats, getCountryStats };