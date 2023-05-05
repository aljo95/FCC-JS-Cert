/*
# A cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
# payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
# 
# Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, 
# or if you cannot return the exact change.
#
# Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal 
# to the change due.
#
# Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, 
# sorted in highest to lowest order, as the value of the change key.
*/

// Lookup object for american currencies and their numerical values
let currencyUnitAmount = {
  "ONE HUNDERED": 100,
  "TWENTY": 20,
  "TEN": 10,
  "FIVE": 5,
  "ONE": 1,
  "QUARTER": 0.25,
  "DIME": 0.1,
  "NICKEL": 0.05,
  "PENNY": 0.01
}
, changeArr, checkArr, change = 0, sumOfUnit, 
sumOfFundsAfterChange;

function checkCashRegister(price, cash, cid) {
  change = cash - price;
  changeArr = [];
  checkArr = JSON.parse(JSON.stringify(cid));
  sumOfUnit;
  sumOfFundsAfterChange = 0;

  // Need to use .toFixed(2) to accurately get decimal values since 
  // operations with decimals can produce wrong results because of 
  // how decimals can not always be represented truthfully in binary.
  for (let i in currencyUnitAmount) {
    sumOfUnit = 0;
    if (change >= currencyUnitAmount[i]) {
      for (let j=0; j<cid.length; j++) {
        if (cid[j][0] === i && change >= cid[j][1]) {
          change = +(change - cid[j][1]).toFixed(2);
          sumOfUnit = cid[j][1];
          cid[j][1] = 0;
          
        } else if (cid[j][0] === i && change < cid[j][1]) {
          sumOfUnit = Math.floor(change/currencyUnitAmount[i])
                                 * currencyUnitAmount[i];
          cid[j][1] = +(change - sumOfUnit).toFixed(2);
          change = +(change - sumOfUnit).toFixed(2);
        }
      }
    }
    if (sumOfUnit > 0) changeArr.push([i, sumOfUnit]);
  }

  // Checking if change to customer is possible and if possible then
  // also checking if the cash in drawer runs out or if it can still operate
  // after the change has been handed over to the customer. 
  if (change !== 0) return {status: "INSUFFICIENT_FUNDS", change: []};

  for (let i=0; i<cid.length; i++) {
    sumOfFundsAfterChange += cid[i][1];
  }
  if (sumOfFundsAfterChange === 0) return {status: "CLOSED", change: checkArr};

  return {status: "OPEN", change: changeArr};
}


// Tests
console.log("First Test:");
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], 
["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], 
["TWENTY", 60], ["ONE HUNDRED", 100]]));
// Should return: {status: "OPEN", change: [["QUARTER", 0.5]]}
console.log("------------------------------------------------------");

console.log("Second Test:");
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], 
["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], 
["TWENTY", 60], ["ONE HUNDRED", 100]]));
// Should return: {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], 
// ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
console.log("------------------------------------------------------");

console.log("Third Test:");
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], 
["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// Should return: {status: "INSUFFICIENT_FUNDS", change: []}
console.log("------------------------------------------------------");

console.log("Fourth Test:");
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// Should return: {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], 
// ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}