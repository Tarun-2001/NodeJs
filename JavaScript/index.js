// Q) Wriing own binding function logic - Pholly fill for blind

// const student ={
//     FirstName:'Tarun',
//     LastName:'chandra'
// }

// function print (location){
//     console.log(this.FirstName +' '+this.LastName+' '+location)
// }

// const dummy = print.bind(student)
// dummy("kamareddy")

// Function.prototype.myBind = function(...args){
//     const obj = this
//     const remainging = args.slice(1)
//     return function(...args2){
//         obj.apply(args[0],[...remainging,...args2])
//     }
// }
// const dummy2 = print.myBind(student)
// dummy2("hyd")

//...............................................................

// Q) Function curying - Converting the arguments of function to series of individual functions
//This can be achived by two ways
// 1)Bind method
// 2)clousers

// const a = (x) => (y) => (z) => {
//   return x * y * z;
// };

// console.log(a(1)(2)(3));

//..................................

// const arr = [1,2,3]
// const obj = {
//     name:"tarun"
// }
// const dummy = function(){
//     console.log("hii")
// }

// console.log(typeof(arr))
// console.log(typeof(obj))
// console.log(typeof(dummy))

//.........................

// Q) Random number generating
// for (let i = 0; i < 25; i++) {
//   const res =Math.floor(Math.random()*(10-4+1)+4);
//   console.log(res);
// }

// Q) Memorize the function

// function memo(fn){
//     function temp2(...args){
//         console.log(args)
//         const res = fn(...args)
//         return res
//     }
//     return temp2
// }

// const temp = memo((a,b)=>a+b)
// console.log(temp(1,2))

//q) Print i value for every timout using var Clouser - Question

// for (var i = 0; i < 6; i++) {
//  function abcd(i){
//     setTimeout(() => {
//         console.log(i);
//       }, i * 1000);
//  }
//  abcd(i)
// }

// Q) Implement pattern shown in console
// function dummy(){
//     this.a =0;
//     this.c = function dumm2(){
//         this.a+=5
//         console.log(this)
//         return this
//     }
//     this.d = function dumm2(){
//         this.a+=5
//         return this.a
//     }
// return this
// }

// console.log(dummy().d())

// Q) Flaten the array

// const arr1 = [2,3,[5,[6,[7]]],8,[8,0]]

// const arr = [...arr1]

// for(let i=0;i <arr.length; i++){
//     if(Array.isArray(arr[i])){
//         flat(arr,i,arr[i])
//     }
// }
// console.log(arr)

// function flat(arr,i,temp){
//     arr.splice(i,1,...temp)
// }

// const res = arr1.flat(Infinity)
// console.log(res)

// function abcd(){
//     let x = 2
//  const ab = ()=>{
//     console.log(x)
//     let xe =3
//  }
//  ab()
// }

//  abcd()

// Q) Pollyfill of map function
// const arr = [1,2,4]

// let res = arr.map((ele)=>ele+ele)
// console.log(res);

// Array.prototype.myMap = function(fn){
//     const result = []
//     const array = this
//     console.log(array)
//     for(let i =0; i<array.length; i++){
//         result.push(fn(array[i]))
//     }
//     return result
// }

// res = arr.myMap((ele)=>{
//     return ele+ele
// })
// console.log(res);

// Q) Pollyfill of reduce method

// const arr = [1, 2, 4];
// let res = arr.reduce((acc, ele) => {
//   acc+= ele* ele;
//   return acc
// }, 0);
// console.log(res);

// const arr = [1, 2, 4];
// Array.prototype.myReduce = function(fn,intialValue){
//     let acc = intialValue;
//     const array = this
//     for(let i =0; i<array.length; i++){
//         acc=fn(acc,array[i])
//     }
//     return acc
// }

// let res = arr.myReduce((acc, ele) => {
//   acc+= Math.round(ele/(ele+1),2);
//   return acc
// }, 0);
// console.log(res);

// Q) Print up to 2 decimals 

// const ar = 1.333.toFixed(10)
// console.log(ar);

// function x(){
//      var i =2
//     setTimeout(()=>{
//         var i=10
//         console.log(i)
//     },1000)
//     console.log(i)
// }  
// x()
