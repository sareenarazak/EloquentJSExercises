function range(start, end) {
    let numbers =[];
    for(let n = start; n <= end; n++) {
        numbers.push(n);
    }
    return numbers;
}

function sum(numbers) {
    return numbers.reduce((n1, n2) => n1 + n2);
}

console.log(sum(range(1,5)));

/**
 * Arrays have a reverse method that changes the array by inverting the order in which its elements appear.
 * For this exercise, write two functions, reverseArray and reverseArrayInPlace.
 * The first, reverseArray, takes an array as argument and produces a new array that has the same elements
 * in the inverse order. The second, reverseArrayInPlace, does what the reverse method does:
 * it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.
 */
function reverseArray(input) {
    let reversedInput = []
    for(let num of input) {
        reversedInput.unshift(num);
    }
    return reversedInput;
}
console.log(reverseArray([1,2,3,4,5]));

function reverseArrayInplace(input) {
    let start = 0;
    let end = input.length;
    while(start < end) {
        let temp = input[start];
        input[start] = input[end];
        input[end] = temp;
        start++;
        end--;
    }
}
let input1 = [2,4,52,5];
reverseArrayInplace(input1);
console.log(input1);

let input2 = [2,4,52,5,10];
reverseArrayInplace(input2);
console.log(input2);

/**
 * Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
 * let list = {
 *   value: 1,
 *   rest: {
 *     value: 2,
 *     rest: {
 *       value: 3,
 *       rest: null
 *     }
 *   }
 * };
 * Also write a listToArray function that produces an array from a list.
 * Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element
 * to the front of the input list, and nth, which takes a list and a number and returns the element at the given
 * position in the list (with zero referring to the first element) or undefined when there is no such element.
 *
 */
function arrayToList(input) {
    let previous = null;
    for(let index = input.length - 1; index >= 0; index--) {
        let node = {value : input[index], rest : previous};
        previous = node;
    }
    return previous;
}

// TODO :: list toarray,  prepend,  recursive
function listToArray(input) {
    let array = [];
    for(let node = input; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}
console.log(arrayToList([1,2,3,4]));
console.log(listToArray(arrayToList([1,2,3,4])));


//  Then add a helper function prepend, which takes an element and
//  a list and creates a new list that adds the element to the front of the input list,
function prepend(element, list) {
    return {value : element, rest : list};
}

function nth(list, idx) {
    let pos = 0;
    let node = list;
    while(pos < idx && node) {
        node = node.rest;
        pos++;
    }
    return node ? node.value : undefined;
}
let list  = arrayToList([1,2,4,5]);
console.log(nth(list, 1)); // 2
console.log(nth(list, 5)); // undefined

function nthRecursive(list, idx) {
    if(list === null) return undefined;
    if(idx === 0) return list.value;;
    return nthRecursive(list.rest, idx - 1 )
}

console.log(nthRecursive(list, 1)); //1
console.log(nthRecursive(list, 4)); // undefined


/**
 * Write a function deepEqual that takes two values and returns true only if they are the same value or
 * are objects with the same properties, where the values of the properties are equal when compared with
 * a recursive call to deepEqual.
 *
 * To find out whether values should be compared directly (use the === operator for that) or have their properties
 * compared, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison.
 * But you have to take one silly exception into account: because of a historical accident,
 * typeof null also produces "object".
 */
// function deepEqual(obj1, obj2) {
//     if(obj1 === obj2) return true;
//
//     if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) return false;
//
//     // return false if the keys length is not same
//     let obj1Keys = Object.keys(obj1);
//     let obj2Keys = Object.keys(obj2);
//
//     if (obj1Keys.length !== obj2Keys.length) return false;
//
//     for (let key of obj1Keys) {
//         if (!obj2Keys.includes(key) || !deepEqual(obj1.key, obj2.key)) return false;
//     }
//
//     return true;
//
// }