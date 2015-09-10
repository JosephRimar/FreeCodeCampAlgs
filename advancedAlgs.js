/*...............Advanced Algorithms from FreeCodeCamp................ */

/* #1. Validate US Telephone Numbers.
Return true if the passed string is a valid US phone number
The user may fill out the form field any way they choose as long as it is a valid 
US number. The following are all valid formats for US numbers:
555-555-5555, (555)555-5555, (555) 555-5555, 555 555 5555, 5555555555, 1 555 555 5555
For this challenge you will be presented with a string such as "800-692-7753" or 
"8oo-six427676;laskdjf". Your job is to validate or reject the US phone number based 
on any combination of the formats provided above. The area code is required. If the 
country code is provided, you must confirm that the country code is "1". Return true 
if the string is a valid US phone number; otherwise false.
*/
function phoneCheck(str) {
	//regEx checking string inputs with spaces, dashes
	var chkPhone = /(\d{3}|\(\d{3}\)|\d{3}|\(\d{3}\))([\)\s-]\d{3}[\s-]\d{4})$/;
	//check for 10 digits
	var num10 = /\d{10}$/
	//check for 11 digits
	var num11 = /\d{11}$/
	//if str length is too long return false
	if(str.length>16) {
	  return false;
	}
	//if contains non digits and country code is included and not equal to "1"	
	else if(str.length > 13 && str[0] !== "1") {
	  return false;
	}
	//if all digits and country code is included but not equal to "1"
	else if (num11.test(str) && str[0] !== "1") {
	  return false;
	}
	//if all tests pass
	else if(num10.test(str) || chkPhone.test(str)) {
	  return true;
	}
	 return false;
}

/* #2. Semetric Difference.
//Create a function that takes two or more arrays and returns an array of the 
symmetric difference of the provided arrays.The mathematical term symmetric 
difference refers to the elements in two sets that are in either the first or 
second set, but not in both. Look up definition to see what to do with 3 or more arrays.
*/

//function passes but still needs work. Sometimes returnes an undefined value in array
function sym2(agrs) {
	//copy args as array to check
    var tempArr = Array.prototype.slice.apply(arguments).slice(0,arguments.length);
    var uniqueArr = [], count = 0;
    //if 3 arrays are present
    if(tempArr.length >= 3) {
      	function reduceArr(arr) {
        	var firstArr = arr.slice(0,2);
        	var l = firstArr[0].length;
       
        	if(firstArr[1] > firstArr[0]) {
          		l = firstArr[1].length;
        	}
        	for(var i = 0; i < l; i++) {
          		if(firstArr[1].indexOf(firstArr[0][i]) === -1) {
            		uniqueArr.push(firstArr[0][i]);
          		}
          	}
        	for(var j = 0; j < tempArr[2].length; j++) {
          		if((tempArr[0].indexOf(tempArr[2][j])!== -1 || (tempArr[1].indexOf(tempArr[2][j])=== -1)) && (tempArr[0].indexOf(tempArr[2][i]) === -1) && firstArr[1].indexOf(tempArr[2][i]) === -1) {
            		uniqueArr.push(tempArr[2][j]);
          		}
        	}
      	}
    	reduceArr(tempArr);
	}
    else if(tempArr.length === 2) {
      	tempArr = tempArr.reduce(function(a,b) {
        	return a.concat(b);
    	});
      
      	//if all elements in both arrays are the same
      	if(tempArr.every(function(a,b) {b=tempArr[0] ;return a === b;})) {
        	//uniqueArr.push(tempArr[0]);
      	}
        //loop through array and remove items that appear more than once
        for(var i = 0; i < tempArr.length; i++) {
          	count = 0;
            for(var j =0; j < tempArr.length; j++) {
              	if(tempArr[j] === tempArr[i]) {
                	count ++;
              	}
          	}
          	if(count < 2) {
             	uniqueArr.push(tempArr[i]);
            }
        }
    } 
    else {
      	uniqueArr = tempArr.slice(0,1);
      	return uniqueArr[0].slice(0,1);
    }
  
    //filter out any duplictes in the array
    return uniqueArr.filter(function(item,pos,self) {
      return self.indexOf(item) === pos;
 	});
}

/* #3. Exact Change.
Design a cash register drawer function that accepts purchase price as the first argument,
payment as the second argument, and cash-in-drawer (cid) as the third argument.
cid is a 2d array listing available currency.
Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. 
Return the string "Closed" if cash-in-drawer is equal to the change due.
Otherwise, return change in coin and bills, sorted in highest to lowest order.
*/
//first crack at it. Will try again with more abstraction and brevity.
function drawer(price, cash, cid) {
	var hundredQuan, twentyQuan, tenQuan, fiveQuan, oneQuan, quarterQuan, 
		dimeQuan, nickelQuan, pennyQuan, change = 0, cashOnHand = 0, 
		changeArr = [], count = 0;
	
	//constructor to make currency objects
	function Currency(n, v, quantity, used) {
		this.currencyName = n;
		this.denom = v;
		this.quantity = quantity;
		this.used = 0;
	} 

	//get qauntity of each bill and coin from cid array
	cid = cid.reduce(function(a,b) {return a.concat(b)});
	pennyQuan = cid[1]*100;
	nickelQuan = Math.round(cid[3]/.05);
	dimeQuan = Math.round(cid[5]/.10);
	quarterQuan = Math.round(cid[7]/.25);
	oneQuan = Math.round(cid[9]/1);
	fiveQuan = Math.round(cid[11]/5);
	tenQuan = Math.round(cid[13]/10);
	twentyQuan = Math.round(cid[15]/20);
	hundredQuan = Math.round(cid[17]/100);

	//create currency objects for each denomination
	var penny = new Currency("PENNY", 0.01, pennyQuan);
	var nickel = new Currency("NICKEL", 0.05, nickelQuan);
	var dime = new Currency("DIME", 0.10, dimeQuan);
	var quarter = new Currency("QUARTER", 0.25, quarterQuan);
	var one = new Currency("ONE", 1.00, oneQuan);
	var five = new Currency("FIVE", 5.00, fiveQuan);
	var ten = new Currency("TEN", 10.00, tenQuan);
	var twenty = new Currency("TWENTY", 20.00, twentyQuan);
	var hundred = new Currency("ONE HUNDRED", 100.00, hundredQuan);

	//get total cash in drawer from cid array
	cashOnHand = cid.map(function(v,i) {
		return (i > 0 && i%2!==0) ? v : 0
	}).reduce(function(a,b) {return a+b;});
	//amount of change that is due
	change = (cash - price);

	//if change is greater than cash-in-drawer return insufficient funds
	if(change > cashOnHand) {
		return "Insufficient Funds";
	}
	//if chage is eqaul to cash-in-drawer return closed
	if(change === cashOnHand) {
		return "Closed"
	}

	//if change needed is less than cash-in-drawer
		//loop to decrease change owed
		//add amount used to objects used value 
	
	while(change > 0 && count < 50) {
		if(change >= 100.00 && hundred.quantity > 0) {
			change -= hundred.denom;
			hundred.used ++;
			hundred.quantity --;
			// console.log(hundred.used + " hundred's Used");
			// console.log(change);

		} else if(change >= 20.00 && twenty.quantity > 0) {
			change -= twenty.denom;
			twenty.used ++;
			twenty.quantity --;
			// console.log(twenty.used + " twenty's Used");
			// console.log(change);

		} else if(change >= 10.00 && ten.quantity > 0) {
			change -= ten.denom;
			ten.used++;
			ten.quantity --;
			// console.log(ten.used + " ten's Used");
			// console.log(change);

		} else if(change >= 5.00 && five.quantity > 0) {
			change -= five.denom;
			five.used++;
			five.quantity --;
			// console.log(five.used + " five's Used");
			// console.log(change);

		} else if(change >= 1.00 && one.quantity > 0) {
			change -= one.denom;
			one.used++;
			one.quantity --;
			// console.log(one.used + " one's Used");
			// console.log(change);

		} else if(change >= 0.25 && quarter.quantity > 0) {
			change -= quarter.denom;
			quarter.used++;
			quarter.quantity --;
			// console.log(quarter.used + " quarter's Used");
			// console.log(change);

		} else if(change >= 0.10 && dime.quantity > 0) {
			change -= dime.denom;
			dime.used++;
			dime.quantity --;
			// console.log(dime.used + " dime's Used");
			// console.log(change);

		} else if(change >= 0.05 && nickel.quantity > 0) {
			change -= nickel.denom;
			nickel.used++;
			nickel.quantity --;
			// console.log(nickel.used + " nickel's Used");
			// console.log(change);

		} else if (change >= 0.01) {
			if(penny.quantity > 0) {
				change -= penny.denom;
				penny.used ++;
				penny.quantity--;
				// console.log(penny.used + " pennies Used");
				// console.log(change);
			} else {
				return "Ops I'm out of coins.";
			}
		//prevent infinite loop from floating point inprecision
		//change should be 0.01 but is instead 0.0099999999...
		} else {
			penny.used++;
			break;
		}
	}
	//add each denomination and amount used to change array
	changeArr.push([hundred.currencyName, (hundred.used * 100)]);
	changeArr.push([twenty.currencyName, (twenty.used * 20)]);
	changeArr.push([ten.currencyName, (ten.used * 10)]);
	changeArr.push([five.currencyName, (five.used * 5)]);
	changeArr.push([one.currencyName, (one.used)]);
	changeArr.push([quarter.currencyName, (quarter.used *0.25)]);
	changeArr.push([dime.currencyName, (dime.used * 0.10)]);
	changeArr.push([nickel.currencyName, (nickel.used * 0.05)]);
	changeArr.push([penny.currencyName, (penny.used * 0.01)]);
	
	//return changeArr filtered to remove any unused denominations
	return changeArr.filter(function(v) {
		return v[1] > 0; });
}

/* #4. Inventory Update.
Compare and update inventory stored in a 2d array against a second 2d array of 
a fresh delivery. Update current inventory item quantity, and if an item cannot 
be found, add the new item and quantity into the inventory array in alphabetical order. 
*/
//first way without using objects
function inventory(arr1, arr2) {
	var index = 0,
	//temp array used to search for new items
	tempArr = [],
   	counter = 0;
   	//if arr1 is not empty
   	if(arr1.length > 0) {
     	tempArr = arr1.slice(0, arr1.length).reduce(function(a,b) {return a.concat(b);});
     	//loop through arrays and look for matching items
		//if found increase quantity
     	for(var i = 0; i < arr2.length; i++) {
			for(var j = 0; j < arr2.length; j++) {
				if(arr1[i].indexOf(arr2[j][1]) !== -1) {
				arr1[i][0] += arr2[j][0];
				}
			}
		}
		//look for new items in arr2
		//if found add them to arr1
		for(var k = 0; k < arr2.length; k++) {
			if(tempArr.indexOf(arr2[k][1]) === -1) {
				arr1.push(arr2[k]);
			}
		}
   	}
    //if arr1 is empty
    else {
       	while(counter < arr2.length) {
        	arr1.push(arr2[counter]);
         	counter ++;
       	}
    }
	//return arr1 sorted alphabetically
	return arr1.sort(function(a,b) {
		return (a[1] < b[1]) ? -1: 1;
		 });		
}

/* #5. No Repeats Please.
Return the number of total permutations of the provided string that don't have 
repeated consecutive letters.
For example, 'aab' should return 2 because it has 6 total permutations, but only 
2 of them don't have the same letter (in this case 'a') repeating.
*/
function permAlone(str) {
    //array to hold all permutations 
    var perms = [];
    var usedChars = [], count = 0;

    //function to check for repeated letters in a string;
    function checkDuplicates(str) {
      	for(var i = 0; i < str.length; i++) {
        	if(str[i] === str[i+1]) {
          		return 0;
          	}
        }
        return 1;
    }
    //function I've used before from Stackoverflow to permute the string
      //...courtesy Jeff Miller, Copyright 2007 Rogue Community College.
    function permute(input) {
      //convert input into a char array (one element for each character)
      var i, ch, chars = input.split("");
      for (i = 0; i < chars.length; i++) {
        //get and remove character at index "i" from char array
        ch = chars.splice(i, 1);
        //add removed character to the end of used characters
        usedChars.push(ch);
        //when there are no more characters left in char array to add, add used chars to list of permutations
        if (chars.length == 0) perms[perms.length] = usedChars.join("");
          //send characters (minus the removed one from above) from char array to be permuted
        permute(chars.join(""));
        //add removed character back into char array in original position
        chars.splice(i, 0, ch);
        //remove the last character used off the end of used characters array
        usedChars.pop();
      }
    }
    //Call permute on the string
    permute(str);

    //loop through perms array and increase counter by 1 if index does not contain repeated letters.
    for(var i=0; i< perms.length; i++) {
      //checkDuplictaes called on all indicies of perms array
      count+= checkDuplicates(perms[i]);
    }
    //return the total number of permutations without repeated letters
    return count;
  }

/* #6. Friendly Date Ranges
Implement a way of converting two dates into a more friendly date range that could be 
presented to a user.It must not show any redundant information in the date range.
For example, if the year and month are the same then only the day range should be 
displayed.	
Secondly, if the starting year is the current year, and the ending year can be 
inferred by the reader, the year should be omitted.
Input date is formatted as YYYY-MM-DD
*/
function friendly(str) {
	var startDateStr = str[0].replace(/-/g, ", "),
		endDateStr = str[1].replace(/-/g, ", "),
		temp = [], startString, endString;

	//create new date objects from strings
	var startDate = new Date(startDateStr);
	var endDate = new Date(endDateStr);

	//remove the day of the week from strings
	startString = startDate.toDateString().substring(4);
	endString = endDate.toDateString().substring(4);

	//function to add ordinal number to day
	function ordinals(n) {
		var s = ["th", "st", "nd", "rd"],
			v = n%100;
		return n+(s[(v-20)%10] || s[v] || s[0])+",";
	}
	//function to get full month name
	function monthName(n) {
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", 'September', 'October', "November", "December"];
		return months[n];

	}

	//add ordinal number to string
	startString = startString.replace(startString.substring(4,6), ordinals(parseInt(startString.substring(4,6))));
	endString = endString.replace(endString.substring(4,6), ordinals(parseInt(endString.substring(4,6))));

	//replace short month with full month name
	startString = startString.replace(startString.substring(0,3), monthName(startDate.getMonth()));
	endString = endString.replace(endString.substring(0,3), monthName(endDate.getMonth()));

	//if start and end dates are equal
	if(str[0]=== str[1]) {
		//return the start date only
		temp.push(startString);
		return temp;
	} 

	//if the years are equal
	if(startDate.getYear() === endDate.getYear() || (startDate.getYear() +1) === endDate.getYear()) {
		 //if the months between the dates are less then 4 
		if(((startDate.getMonth() < endDate.getMonth() && (endDate.getMonth() - startDate.getMonth()) < 4)) || (startDate.getMonth() > endDate.getMonth() && (startDate.getMonth() - endDate.getMonth()) > 8) || (startDate.getMonth() === endDate.getMonth() && startDate.getYear() === endDate.getYear()))  {
	  		//remove years and comma after month from strings
			startString = startString.substring(0, startString.length - 5).replace(",","");
			endString = endString.substring(0, endString.length - 5).replace(",","");
		
			//if the months are equal
		 	 if(startDate.getMonth() === endDate.getMonth()) {
			//remove months from strings
			endString = endString.substring(endString.indexOf(" ")).replace(" ","");
		}
	}
	
	}
	//push dates to temp array
	temp.push(startString, endString);
	
	return temp;
}







