/*
# Ceasars Cipher aka a shift cipher. This is a ROT13 cipher where letters 
# are shifted by 13 positions to the right. A->(12 letters)->N
*/

function rot13(str) {
    for (let i=0; i<str.length; i++) {
        if (/[A-Z]/.test(str[i])) {
            if (str.charCodeAt(i)+13 > 90) {
            str = str.slice(0, i) + String.fromCharCode(((str.charCodeAt(i)+13+65)%90) -1) + str.slice(i+1);
            } else 
                str = str.slice(0, i) + String.fromCharCode((str.charCodeAt(i)+13)) + str.slice(i+1);
        } 
    }
    return str;
}

// Tests
console.log(rot13("SERR PBQR PNZC"));   //FREE CODE CAMP
console.log(rot13("SERR CVMMN!"));      //FREE PIZZA!
console.log(rot13("SERR YBIR?"));       //FREE LOVE?

//THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));