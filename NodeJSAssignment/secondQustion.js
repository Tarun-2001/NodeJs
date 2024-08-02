// Write a function that takes a city name as input and returns state name as output from the
// following data structure -
// obj = {
// "India" : {
// "Karnataka" : ["Bangalore", "Mysore"],
// "Maharashtra" : ["Mumbai", "Pune"]

// },
// "USA" : {
// "Texas" : ["Dallas", "Houston"],
// "IL" : ["Chicago", "Aurora", "Pune"]

// }
// }
// Input - “Pune”
// Output - [“IL”, “Maharashtra”]

const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter the city name `, (cityName) => {
  console.log(stateName(cityName));
  rl.close();
});

const stateName = (cityName) => {
  obj = {
    India: {
      Karnataka: ["Bangalore", "Mysore"],
      Maharashtra: ["Mumbai", "Pune"],
    },
    USA: {
      Texas: ["Dallas", "Houston"],
      IL: ["Chicago", "Aurora", "Pune"],
    },
  };

  const result = []
for(let country in obj){
    for(let state in obj[country]){
        if(obj[country][state]?.includes(cityName)) result.push(state)
    }
}
return result
};
