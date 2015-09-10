/*Intermediate and Upper Intermediate algorithms from FreeCodeCamp*/

//Intermediate Algs.............................
/* #1.Sum All Numbers in a Range.
We'll pass you an array of two numbers. Return the sum of those two numbers 
and all numbers between them.
The lowest number will not always come first.*/
function sumAll(arr) {
	var min, max, i, sum = 0;
	min = Math.min.apply(null, arr);
	max = Math.max.apply(null, arr);
	for(i = min; i <= max; i++) {
		sum += i;
	}
	return sum;
}
/* #2. Diff Two Arrays.
Compare two arrays and return a new array with any items not found in both of 
the original arrays.*/
function diff(arr1, arr2) {
	//create new empty array to return unique values
	var uniqueArr = [];
	//loop through each array and push any item not found in both to uniqueArr
	//function to loop through each array and compare
	function pushUnique(firstArr, secArr) {
		firstArr.forEach(function(e) {
			if(secArr.indexOf(e) === -1) {
				uniqueArr.push(e);
			}
		});
	}
	//call pushUnique on both arrays
	pushUnique(arr1, arr2);
	pushUnique(arr2,arr1);
 	//return uniqueArr with unique values
	return uniqueArr;
}

/* #4. Search and Replace
Perform a search and replace on the sentence using the arguments provided and return the new sentence.
First argument is the sentence to perform the search and replace on.
Second argument is the word that you will be replacing (before).
Third argument is what you will be replacing the second argument with (after).
NOTE: Preserve the case of the original word when you are replacing it. For example if you mean to replace
the word 'Book' with the word 'dog', it should be replaced as 'Dog'*/
function replace(str, before, after) {
	//check case of before string
	if(before[0] === before[0].toUpperCase()) {
		//if capitalized make after capitalized
		after = after[0].toUpperCase() + after.substring(1);
	}
	//return the string with before replaced with after
	return str.replace(before, after);
}

/* #5. Pig Latin 
Translate the provided string to pig latin.
Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it 
to the end of the word and suffixes an "ay".
If a word begins with a vowel you just add "way" to the end.*/
function transelate(str) {
	//create new string to build pig latin string on and regExp of vowels to check
	var vowels = /[aeiouy]/gi;
	var pigStr = "";
	//function to find the index of regExp
	function findRegIndex(str,regExp) {
		for(var i = 0; i < str.length; i++) {
			if(regExp.test(str[i])) {
				return i;
			}
		}
	}
	//check if str begins with vowels or consonants
		//if consonant move cluster to end of string and add "ay"
		if(!vowels.test(str[0])) {
			//add substring begining at first vowel to pigStr
			pigStr += str.substring(findRegIndex(str,vowels));
			//add moved consonant cluster to end of pigStr
			pigStr += str.substring(0,findRegIndex(str,vowels));
			//add the "ay" ending
			pigStr += "ay";
		}
		//if vowel add "way" to end
		else {
			pigStr += str + "way";
		}
		//return pigStr
	return pigStr;
}

/*#6. DNA Pairing 
The DNA strand is missing the pairing element. Take each character, get its pair, and 
return the results as a 2d array.
Base pairs are a pair of AT and CG. Match the missing element to the provided character.
Return the provided character as the first element in each array.
For example, for the input GCG, return [['G', 'C'], ['C','G'],['G', 'C']]
The charater and its pair are paired up in an array, and all the arrays are grouped 
into one encapsulating array.*/

//One way using forEach to push elements to a new array
function pair(str) {
	//split string for iteration
	str = str.split("");
	//create temp array to hold pairs
 	var tempArr = [];
	//check value of each index
	str.forEach(function(e) {
		//add appropriate pair to value and push to temp array as an array
		if(e === "A") {
			tempArr.push((e + "T").split(""));
		}
		if(e === "T") {
			tempArr.push((e + "A").split(""));
		}
		if(e === "C") {
			tempArr.push((e + "G").split(""));
		}
		if(e === "G") {
			tempArr.push((e + "C").split(""));
		}
	});
	//return temp array with pairs
	return tempArr;
}

//Second way using map to return the original array modified
function pair2(str) {
	//split the string and return each element mapped to an array
	return str.split("").map(function(a) {
		//check values of index and add pair
		if(a === "A") {
			return a + "T";
		}
		if(a === "T") {
			return a + "A";
		}
		if(a === "G") {
			return a + "C";
		}
		if(a === "C") {
			return a + "G";
		}
		//split each element into an array
	}).map(function(a) {return a.split("")});
}

/* 7. Missing Letters
Find the missing letter in the passed letter range and return it.
If all letters are present in the range, return undefined.
ie 'abdf' should return "ce"  */
function fearNotLetter(str) {
	//create missingStr to hold missing letters
	var missingStr = "", k;
	//iterate through string and find missing letters
	for(var i=0; i<str.length-1; i++) {
        //if there is a gap in the sequence of the string
    		if(str.charCodeAt(i) !== str.charCodeAt(i+1) -1) {
          		//set k to last letter and loop until k equals next letter-1
    			for(k=str.charCodeAt(i); k<str.charCodeAt(i+1)-1; k++) {
    			 //add missing letters to returned string
    			 missingStr += String.fromCharCode(k+1)
          		}
    		}
    	}
 return missingStr ? missingStr : undefined;
}

/* #8. Boo who.
Check if a value is classified as a boolean primitive. Return true or false.
Boolean primitives are true and false. */
function boo(bool) {
	//check typeof bool
	return typeof bool === "boolean";
}

/* #9. Sorted Union.
Write a function that takes two or more arrays and returns a new array of unique values 
in the order of the original provided arrays. In other words, all values present from all 
arrays should be included in their original order, but with no duplicates in the final array.
The unique numbers should be sorted by their original order, but the final array should 
not be sorted in numerical order. */
function unite(arr1, arr2, arr3) {
	//create temp array and populate it with the arguments
	var temp = Array.prototype.slice.apply(arguments);
	//return the temp arr in the correct format
		//first concat with reduce
	return temp.reduce(function(a,b) {
		return a.concat(b);
		//next filter out duplicates
	}).filter(function (v,i,self) {
		return self.indexOf(v) === i;
	});
}

/* #11. Spinal Tap Case
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
Remember to account for camelCase.*/
function splinalCase(str) {
	var temp = "",
		testStr = 'abcdefghijklmnopqrstuvwxyx-';
	//replace any characters other than letters with "-"
	str = str.replace(/[^a-z]/gi, "-");
	//loop to correct any camelCase
	for(var i=0; i < str.length; i++) {
		//if character is not the first letter of string and is uppercase add "-"
	    if(testStr.indexOf(str[i]) === -1 && i>0 && str[i-1] !== "-") {
	      temp += "-";
	    }
	    temp += str[i];
	}
	return temp.toLowerCase();
}

/* 12. Sum All Odd Fibonacci Numbers
Return the sum of all odd Fibonacci numbers up to and including the passed 
number if it is a Fibonacci number. The first few numbers of the Fibonacci 
sequence are 1, 1, 2, 3, 5 and 8, and each subsequent number is the sum of 
the previous two numbers. As an example, passing 4 to the function should
return 5 because all the odd Fibonacci numbers under 4 are 1, 1, and 3.*/
function sumFibs(num) {
	//create vars to loop through fib numbers and sum to hold odd fub numbers
 	var i = 1, j = 1, k=2, sum = 2;
	//loop through fib numbers
	while(k <= num) {
		k = i+j;
		i = j;
		j = k; 
		//if odd add to sum
		if(k % 2 !== 0 && k <= num) {
			sum += k;
		}
	}
	//return the sum
	return sum;
}

/* #14. Sum All Primes
Sum all the prime numbers up to and including the provided number.
A prime number is defined as having only two divisors, 1 and itself. 
For example, 2 is a prime number because it's only divisible by 1 and 2. 
1 isn't a prime number, because it's only divisible by itself.
The provided number may not be a prime.*/
function sumPrimes(num) {
  	var i = 2, sum = 0;
  	//function to check if number is prime
  	function checkPrimes(num) {
    	if(num < 2) {
      		return false;
    	}
    	for(var i = 2; i < num; i++) {
      		if(num % i === 0)
        		return false;
    	}
    return true;
  	}
 	 //loop through all numbers from 2 to num
  	while(i<=num) {
    	//if the number is prime add it to sum
    	if(checkPrimes(i)) {
      		sum += i;
   		}
    	i++;
  	}	
  	return sum;
}

/* #16. Finders Keepers
Create a function that looks through an array (first argument) and 
returns the first element in the array that passes a truth test (second argument).*/
function find(arr, func) {
	//loop through array
	for(var i = 0; i < arr.length; i++) {
		//if current element passed into function returns true
		if(func(arr[i])) {
			//return the current element
			return arr[i];
		}
	}
}

/* #17. Drop It.
Drop the elements of an array (first argument), starting from the front, 
until the predicate (second argument) returns true.*/

/*this function passes camps test cases however it will continue to remove any elements 
that don't pass the test after the func has returned true*/
function drop(arr, func) {
	return arr.filter(func);
}

/*better implementation allowing elements to remain after func returns true even if they
would not have passed test*/
function drop2(arr,func) {
	//make a copy of arr
	var temp = arr.slice();
	//loop through array
	for(var i = 0; i < arr.length; i++) {
		//if current element doesn't pass func test remove it from temp array
		if(!func(arr[i])) {
			temp.shift();
		//if current element passes exit the loop
		} else {
			break;
		}
	}
	//return the modified array
	return temp;
}

/* #18. Steamroller
Flatten a nested array. You must account for varying levels of nesting.
*/
function steamroller(arr) {
	//array to hold flattened values;
	var flattArray = [];
	//function to check if current element is an array;
	(function checkArr(array) {
		//loop though passed array
		for(var i = 0; i < array.length; i++) {
			//if current element exists and is an array
			if(array[i] && Array.isArray(array[i])) {
				//recursively call checkArr to go a level deeper
				checkArr(array[i]);
			}
			//else push element to flatArray
			else {
				flattArray.push(array[i]);
			}
		}
	//immediatley invoke checkArr with arr
	}(arr));
	return flattArray;
}

/* #19. Binary Agents
Return an English translated sentence of the passed binary string.
The binary string will be space separated.*/

//first function using a helper
function binaryAgent(str) {
	//split the string to map
	var temp = str.split(" ");
	//function to convet binary string into decimal
	function convertBin(str) {
		var n = 0, v = 1;
		//loop through str starting at end and add up values
		//first element represents 1, than 2, 4, 8 etc...
		for(var i = str.length-1; i >= 0; i--) {
			n+= (str[i] * v);
			v *= 2;
		}
		return n;
	}
	//convert each element to a string character using converBin function
	return temp.map(function(a) {
		return String.fromCharCode(convertBin(a));
	}).join("");
}
//similar algorithm without a helper function
function binaryAgent2(str) {
      return str.split(" ").map(function(a) {
        var i = a.length-1,
        j = 1,
        total = 0; 

        while (i >=0) {
          total += a[i] *j;
          j *= 2;
          i--;
        }
        return String.fromCharCode(total);
      }).join("");
    }

/* #20. Everything Be True.
Check if the predicate (second argument) returns truthy (defined) for all elements 
of a collection (first argument). For this, check to see if the property defined in 
the second argument is present on every element of the collection. Remember, you 
can access object properties through either dot notation or [] notation.*/

//one way...
function every(collection, pre) {
	//loop through collection
	for(var k in collection) {
		//if property is not found return false;
		if(!collection[k].hasOwnProperty(pre)) {
			return false;
		}
	}
	return true;
}
//another, shorter way using Array.prototype.every
//it's tempting to simply use 'in' instead of 'hasOwnProperty' but that will return
//true if the property exists anywhere in the prototype chain.
function every2(collection, pre) {
	return collection.every(function(e) {
		return e.hasOwnProperty(pre);
	});
}

/* #21. Arguments Optional
Create a function that sums two arguments together. If only one argument is provided, 
return a function that expects one additional argument and will return the sum.
For example, add(2, 3) should return 5, and add(2) should return a function that is 
waiting for an argument so that var sum2And = add(2); return sum2And(3); // 5
If either argument isn't a valid number, return undefined.*/
function add() {
    //store first argument to test
    var arg = arguments[0];
    if(typeof arg !== 'number') {
      return undefined;
    }
    //if only one argument is supplied call an anonymous function to get next argument
    if(arguments.length < 2) {
      return function(n) {
        if(typeof n !== 'number') {
          return undefined;
        }
        //if both are numbers return sum of new argument plus original argument
        return n + arg;
      };
    }
    //if second argument is not a number return undefined
    if(typeof arguments[1] !== 'number') {
      return undefined;
    }
    //if both arguments are supplied and are numbers return their sum
    return arguments[0] + arguments[1];
  }

//same function except I've modified it to prompt the user for a number if 
//only one argument was supplied. 
function add2() {
    //store first argument to test
    var arg = arguments[0];
    if(typeof arg !== 'number') {
      return undefined;
    }
    //if only one argument is supplied call an anonymous function to get next argument
    if(arguments.length < 2) {
      return (function(n) {
      	//make sure char entered was a number
        if(parseInt(n) !== parseInt(n)) {
          return undefined;
        }
        //if both are numbers return sum of new argument plus original argument
        return n + arg;
        //prompt user for next argument
      })(prompt("Please enter another number"));
    }
    //if second argument is not a number return undefined
    if(typeof arguments[1] !== 'number') {
      return undefined;
    }
    //if both arguments are supplied and are numbers return their sum
    return arguments[0] + arguments[1];
  }

/* ....................Upper Itermediate Algorithms......................
.........................................................................*/

//#1. Make a Person
/*Fill in the object constructor with the methods specified in the tests.
Those methods are getFirstName(), getLastName(), getFullName(), setFirstName(first), 
setLastName(last), and setFullName(firstAndLast). All functions that take an argument have
an arity of 1, and the argument will be a string.
These methods must be the only available means for interacting with the object.*/
var Person = function(firstAndLast) {
	var name = firstAndLast.split(" ");
	this.getFirstName = function() {
		return name[0]};
	this.getLastName = function() {
		return name[1]};
	this.getFullName = function() {
		return name.join(" ")};
	this.setFirstName = function(first) {
		name[0] = first;}
	this.setLastName = function(last) {
		name[1] = last;}
	this.setFullName = function(firstAndLast) {
		name[0] = firstAndLast.substring(0, firstAndLast.indexOf(" "));
		name[1] = firstAndLast.substring(firstAndLast.indexOf(" ") +1, firstAndLast.length)}
}

/* #2. Map the Derbis
Return a new array that transforms the element's average altitude into their orbital 
periods.The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.
You can read about orbital periods on wikipedia.
The values should be rounded to the nearest whole number. The body being orbited 
is Earth.The radius of the earth is 6367.4447 kilometers, and the GM value of earth 
is 398600.4418*/
function orbitalPeriod(arr) {
	var temp = [], GM = 398600.4418, earthRadius = 6367.4447;
	//helper function to transform avgAlt into orbital period
	function orbits(obj) {
		//assign orbitalPeriod property to obj with value of formula
		obj.orbitalPeriod = Math.round((2 * Math.PI) * Math.sqrt((Math.pow(earthRadius+obj.avgAlt,3)/GM)));
		//remove avgAlt property
		delete obj.avgAlt;
		return obj;
	}
	//for each item the array push the modified object to temp array
	arr.forEach(function(a) {
		temp.push(orbits(a));
	});
		
	return temp;
}
orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);// [{name : "spunik", orbitalPeriod ; 86400}]

/* #3. Pairwise.
Return the sum of all indices of elements of 'arr' that can be paired with one other 
element to form a sum that equals the value in the second argument 'arg'. If multiple 
sums are possible, return the smallest sum. Once an element has been used, it cannot 
be reused to pair with another.
For example, pairwise([1, 4, 2, 3, 0, 5], 7) should return 11 because 4, 2, 3 and 5 
can be paired with each other to equal 7. pairwise([1, 3, 2, 4], 4) would only 
equal 1, because only the first two elements can be paired to equal 4, and the first 
element has an index of 0!*/
function pairwise(arr, arg) {
	var sum = 0,
	//create copy of arr to preserve original arr 
	temp = arr.slice();
	//loop through both arrays and compare there values to arg
	for(var i = 0; i < temp.length; i++) {
		for(var j = 0; j < temp.length; j++) {
			//if equal to arg increase sum by value of indecies
			if(temp[i] + temp[j] === arg &&  i!==j) {
				sum += (i + j);
				//change value of elements so they are not used again
				temp[i] = "n";
				temp[j] = "n";
			}
		}
	}
	return sum;
}






















