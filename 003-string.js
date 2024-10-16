/*
You are processing plane seat reservations. The plane has N rows of seats, numbered from 
1 to N. There are ten seats in each row (labelled from A to K, with letter I omitted), as shown in the figure below:
...... A B C    D E F G     H J K
Row 1: A B C    D E F G     H J K
Row 2: A B C    D E F G     H J K
Row 3: A B C    D E F G     H J K
...
Row N: A B C    D E F G     H J K

Some of the seats are already reserved. The list of reserved seats is given as a string S (of length M) containing seat numbers separated by single spaces: for examples, "1A 3C 2B 20G 5A". The reserved seats can be listed in S in any order
Your task is to allocate seats for as many four-person families as possible. A four-person family occupies four seats in one row, that are next to each other - seats across an aisle (such as 2C and 2D) are not considered to be next to each other. It is permissible for the family to be separated by an aisle, but in this case exactly two people have to sit on each side of the aisle. Obviously, no seat can be allocated to more than one family.

Write a function:
    function solution(N, S);
that, given a number of rows N and a list of reserved seats as string S, returns the maximum number of four-person families that can be seated in the remaining unreserved seats:

Examples:
1. Given N = 2 and S = "1A 2F 1C", your function should returns 2. The following figure shows one possible way of seating two families in the remaining seats

...... A B C    D E F G     H J K
Row 1: X _ X    0 0 0 0     _ _ _
Row 2: _ 0 0    0 0 X _     _ _ _

2. Given N = 1 and S = "" (empty string), your function should return 2, because we can seat at most 2 families in a single row of seats, as shown in the figure below:

...... A B C    D E F G     H J K
Row 1: _ 0 0    0 0 0 0     0 0 _

*/


const emptyRow = ['A','B','C','D','E','F','G','H','J','K'];
const indexTable = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'J':8,'K':9}


function isLetter(n) {
    return /^[A-Za-z]$/.test(n)
};

function checkSeat(arr) {
    let isValid = true;

    arr.forEach(seat => {
        if(!isLetter(seat)) {
            isValid = false;
            return;
        }
    })
    return isValid;
}



class SeatMap {
    constructor(rows) {
        this.rows = [];
    };

    addRows(number) {
        for (let i = 0; i < number; i++) {
            this.rows[i] =[...emptyRow];
        }
    };

    reserve(info) {
        const order = info.split(" ");
        if(order[0] === '') return;

        order.forEach(seatInfo => {
            let row = parseInt(seatInfo.slice(0,-1)) - 1;
            let seatIndex = indexTable[seatInfo.slice(-1)];

            this.rows[row][seatIndex] = 'X';
        })
    };

    calcFamilyRow(row) {
        let families = 0;
    
        const leftBlock = [row[1], row[2], row[3], row[4]];    
        const rightBlock = [row[5], row[6], row[7], row[8]];
        const middleBlock = [row[3], row[4], row[5], row[6]];
    
        if (leftBlock.every(seat => seat !== 'X')) {
            families++;
        }
        
        if (rightBlock.every(seat => seat !== 'X')) {
            families++;
        }
        
        if (families === 0 && middleBlock.every(seat => seat !== 'X')) {
            families++;
        }

        return families;
    };

    calcTotalFamilies() {
        let totalFamilies = 0;
        this.rows.forEach(row => {
            totalFamilies += this.calcFamilyRow(row);
        });
        return totalFamilies;
    }

};

function solution(N, S) {
    let map = new SeatMap();
    map.addRows(N);
    map.reserve(S);
    return map.calcTotalFamilies();
}

// const reserveInfo = "1A 2F 1C";
// let order = reserveInfo.split(" ");
// console.log(order);

// let map = new SeatMap();
// map.addRows(2);

// map.reserve(reserveInfo);
// console.log(map.rows);
// console.log(map.calcFamilies());

// const N = 1;
// const S = "";
// let map= new SeatMap();
// map.addRows(N);

// map.reserve(S);
// console.log(map.calcFamilies());