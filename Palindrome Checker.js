/*
# Return true if the given string is a palindrome. Otherwise, return false.
# A palindrome is a word or sentence that's spelled the same way both forward and backward, 
# ignoring all non-alphanumeric characters (like punctuation, case and spacing).
*/
function palindrome(str) {
    str = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    for (let i=0; i<str.length; i++) {
        if (str[i] !== str[str.length-1-i]) return false;
    }
    return true;
}   
// Tests
console.log(palindrome("eye"));                         //true
console.log(palindrome("_eye"));                        //true
console.log(palindrome("race car"));                    //true
console.log(palindrome("almostomla"));                  //false
console.log(palindrome("My age is 0, 0 si ega ym."));   //true
console.log(palindrome("0_0 (: /-\ :) 0-0"));           //true
console.log(palindrome("five|\_/|four"));               //false