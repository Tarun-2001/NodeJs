const readline = require('node:readline');



// Write a function that takes string as input and returns count of each character in an object.
// Input - “Smart Operations & Edge Computing Platform”
// Output - {'S': 1, 'm': 3, 'a': 3, 'r': 3, 't': 4, ' ': 5, 'O': 1, 'p': 2, 'e': 2, 'i': 2, 'o': 3, 'n': 2, 's': 1, '&': 1, 'E':
// 1, 'd': 1, 'g': 2, 'C': 1, 'u': 1, 'P': 1, 'l': 1, 'f': 1}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  
rl.question(`Enter the string name `, (name) => {
    console.log(countChar(name))
    rl.close();
  });

const countChar = (inputString)=>{
    const ans = {}
    for(let char of inputString){
        if(char===' ') continue
        if(ans[char]) ans[char]++
        else ans[char] =1
    }
    return ans;
}
