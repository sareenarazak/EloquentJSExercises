/**
 * Write a loop that makes seven calls to console.log to output the following triangle:
 *
 * #
 * ##
 * ###
 * ####
 * #####
 * ######
 * #######
 */

const length = 7;
let value = "#";

for (let counter = 0; counter < length; counter++) {
    console.log(value.repeat(counter + 1));
}

/**
 * Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions.
 * For numbers divisible by 3, print "Fizz" instead of the number,
 * and for numbers divisible by 5 (and not 3), print "Buzz" instead.
 *
 * When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by
 * both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
 */

for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
}

/**
 * Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines.
 * At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.
 *  # # # #
 * # # # #
 *  # # # #
 * # # # #
 *  # # # #
 * # # # #
 *  # # # #
 * # # # #
 */

// TIL String concat method returns a new string, does not change the original string
let gridSize = 10;
let grid = "";

for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        if ((row + col) % 2 === 0) {
            grid += " ";
        }
        else {
            grid += "#";
        }
    }
    grid += "\n";
}
console.log(grid);