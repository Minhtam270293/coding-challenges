/*
Write a function solution(x, y) that, given a string x and a string y, returns a boolean that checks whether all of the characters in the string y exist at some point in the string x. Furthermore, the characters from y need to occur in the same order in x. There may be additional characters in string x, so slong as each character from y appears and the order is maintained.

If all of the characters from y appear in x in the correct order return the bollean True, otherwise return False

Both of the input strings will consist of alpha-numeric characters only. The length of the string may be quite large so performance should be a consideration for your solution

Exammple 1
x = "ABCD"
y = "AC"
Result = True

Example 2
x = "ABCD"
y = "CA"
Result = false

Example 3
x = "ABCAD"
y = "BA"
Result = true


*/