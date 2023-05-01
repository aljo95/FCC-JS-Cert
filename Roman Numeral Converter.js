/*
# Converts numbers from arabic form to roman form e.g. 4 => "IV"
# by using a simple lookup-list object.
*/

let romanToArabicObj = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
}, str;

function convertToRoman(num) {
    str = "";
    for (let i=0; i<Object.keys(romanToArabicObj).length; i++) {
        if (num >= Object.values(romanToArabicObj)[i]) {

            //adding roman characters to string
            str += Object.keys(romanToArabicObj)[i]
            .repeat(Math.floor(num/Object.values(romanToArabicObj)[i]));

            //subtracting value from num after it has been added to the string
            num -= Object.values(romanToArabicObj)[i]
            * Math.floor(num/Object.values(romanToArabicObj)[i]);
        }                         
    }                    
    return str;
}
// Tests
console.log(convertToRoman(2));     //II
console.log(convertToRoman(4));     //IV
console.log(convertToRoman(9));     //IX
console.log(convertToRoman(16));    //XVI
console.log(convertToRoman(29));    //XXIX
console.log(convertToRoman(44));    //XLIV
console.log(convertToRoman(45));    //XLV
console.log(convertToRoman(97));    //XCVII
console.log(convertToRoman(400));   //CD
console.log(convertToRoman(500));   //D
console.log(convertToRoman(649));   //DCXLIX
console.log(convertToRoman(798));   //DCCXCVIII
console.log(convertToRoman(1004));  //MIV
console.log(convertToRoman(2014));  //MMXIV
console.log(convertToRoman(3999));  //MMMCMXCIX
console.log(convertToRoman(14400)); //MMMMMMMMMMMMMMCD





