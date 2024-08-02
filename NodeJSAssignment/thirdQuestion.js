// Make a GET request to https://restcountries.com/v3.1/lang/german and store the response in a
// file. Add a retry logic if the request fails for some reason.
// For retrying - Use asyncjs library or implement it yourself.
// For GET request choose any of the following -

// i. superagent (https://github.com/visionmedia/superagent)
// ii. request (https://www.npmjs.com/package/request)
// iii. got (https://www.npmjs.com/package/got)

const { count } = require("console");
const fs = require("fs");
const retry = require("async-retry");

const url = " https://restcountries.com/v3.1/lang/german";

const outputFile = "outputfile.json";
const fetchData = async () => {
  try {
    const response = await retry(
      async (bail) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch the data ");
        return await res.json();
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        onRetry: (err, attempt) => {
          console.log(`Attempt ${attempt} failed...`);
        },
      }
    );

    const modified = JSON.stringify(response);
    fs.writeFileSync(outputFile, modified, "utf-8");
    console.log("Data is saved");
  } catch (error) {
    console.log(`Failed to fetch data!! ${error.message}`);
  }
};

fetchData();
