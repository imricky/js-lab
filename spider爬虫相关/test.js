// function test(i) {
//   return i+1;
// }

// test(2);

// //数组去重：
// [...new Set(arr)];

// //平铺数组
// [].concat(...arr);

// function flattenArray(arr) {
//   const flattened = [].concat(...arr);
//   return flattened.some(item => Array.isArray(item)) ? 
//   flattenArray(flattened) : flattened;
//   }
//   const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
//   const flatArr = flattenArray(arr); 
// console.log(flatArr)

// console.log('hello 😀 regex'.match(/😀/))

// console.log('hello 😀 regex'.match(/g/))

// console.log('hello'.match(/o$/))

// // /\$[0-9]+\.[0-9]+$/

// console.log('price: $3.6'.match(/\$[0-9]+\.[0-9]+$/))

// console.log('hello regex'.match(/\Bregex$/));

// console.log('123'.match(/\d+/))

// console.log('@regex'.match(/[\s\S]/))

// console.log('@123'.match(/./))

// console.log('gooooogle'.match(/go{2,8}gle/))

// console.log('@abc'.match(/@(abc)/))
// console.log(RegExp.$1)

// console.log('hello **regex** **regex**'.replace(/\*{2}(.*)\*{2}/, '<strong>$1</strong>'))
var value = 2;
 var obj = Object.defineProperty({}, "num", {
  get:function(){
    return value;
  },
  set:function(newValue){
    value = newValue;
  },
  enumerable:true,
  configurable:false
});
console.log(obj.num); // undefined

