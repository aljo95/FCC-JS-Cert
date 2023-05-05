/*
# Return true if the passed string looks like a valid US phone number.
#--------------------------------------------------------------------#
# Examples of valid numbers:
# 555-555-5555
# (555)555-5555
# (555) 555-5555
# 555 555 5555
# 5555555555
# 1 555 555 5555
#--------------------------------------------------------------------#
*/

function telephoneCheck(str) {
    // Checking if the number has a country code and if it does the country code must be 1
    // followed by either a space or a left paranthesis
    if (str[1] === " " || str[1] === "(") {
      if (str[0] === "1" && str[1] === " ") {
        str = str.replace(str[0]+str[1], "");
      } 
      else if(str[0] === "1" && str[1] === "(") {
        str = str.replace(str[0], "");
      }
      else return false;
    }
    
    //regex with paranthesis check
    let regex = /^[(]?[0-9]{3}[)]+[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
    //regex without paranthesis check
    let regexNoParanthesis = /^[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;

    //if the number starts with a paranthesis then naturally it must have a closing paranthesis
    if (/^[(]/.test(str) && regex.test(str)) return true;
    //if the number does not start with a paranthesis then there should be no closing paranthesis
    else if(regexNoParanthesis.test(str)) return true;
    
    return false;
}

// Tests
console.log(telephoneCheck("555-555-5555"));    // true
console.log(telephoneCheck("(555)555-5555"));   // true
console.log(telephoneCheck("(555) 555-5555"));  // true
console.log(telephoneCheck("555 555 5555"));    // true
console.log(telephoneCheck("5555555555"));      // true
console.log(telephoneCheck("1 555 555 5555"));  // true
console.log(telephoneCheck("5555555"));         // false
console.log(telephoneCheck("1 555)555-5555"));  // false
console.log(telephoneCheck("123**&!!asdf#"));   // false
console.log(telephoneCheck("2 (757) 622-7382"));// false
console.log(telephoneCheck("(555-555-5555"));   // false
console.log(telephoneCheck("555)-555-5555"));   // false