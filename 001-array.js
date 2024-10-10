// Write a function solution that, given an array A of N integers, returns the largest integer K > 0 such both values K and -K (the opposite number) exist in array A. If there is no such integer, the function should return 0

// Examples:
// 1. A = [3, 2, -2, 5, -3], the function should return 3
// 2. A = [1, 2, 3, -4] the function should return 0

// Write an efficient algorithm for the following assumptions:
// N is an integer within the range [1...100,000];
// Each element of array A is an integer within the range [-1e9 ... 1e9]


// Simple solution
function sort(array) {
    // insertion sort 
    let len = array.length;
    let i, j, insertValue;
    for (i = 1; i < len; i++) {
        insertValue = array[i];
        j = i - 1;

        while(j >= 0 && array[j] > insertValue) {
            array[j+1] = array[j];
            j--;
        }

        array[j+1] = insertValue;
    };
    return array;
};

function simpleSolution(A) {
    // sort 
    const sortedArr = sort(A);

    // two pointers from 2 sides
    let left = 0;
    let right = A.length - 1;

    while(sortedArr[left] <= 0 && sortedArr[right] >= 0 && left < right) {
        if (Math.abs(sortedArr[left]) === Math.abs(sortedArr[right])) return sortedArr[right];
        if (Math.abs(sortedArr[left]) > Math.abs(sortedArr[right])) left++;
        else right--;
    }
    return 0;
};


// Optimized solution
function fastSolution(A) {
    let visited = new Set();
    let maxNum = 0;

    for (let num of A) {
        visited.add(num);

        if(visited.has(-num)) {
            maxNum = Math.max(maxNum, Math.abs(num))
        }
    }

    return maxNum;
}




let arr1 = [4,3,6,7,1,0,22];
let arr2 = [-3,4,7,3,5];
let arr3 = [7,9,0,-1,1,-3,3,7,-7];

console.log(fastSolution(arr1));
console.log(fastSolution(arr2));
console.log(fastSolution(arr3));