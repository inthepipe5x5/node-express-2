/*
Turn a string of 24h time into words.

Pass in a valid *string* (it will always have a two-digit hour 00-23, and a two-digit minute 00-59). Hours 0-11 are am, and hours 12-23 are pm.

*Examples of the output we’d like:*

00:12
twelve twelve am

01:00
one o’clock am
*/

const convertNumberToWord = (numStr) => {
  // Define an array of number words
  const numberWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  // Define an array of tens words
  const tensWords = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  // Check if the input is a valid number string
  if (
    isNaN(numStr) ||
    numStr < 0 ||
    numStr > 99 ||
    !Number.isInteger(parseFloat(numStr))
  ) {
    return "Invalid input";
  }

  // Convert the string to a number
  const num = parseInt(numStr, 10);

  // Handle numbers from 0 to 19
  if (num < 20) {
    return numberWords[num];
  }

  // Handle numbers from 20 to 99
  const tensDigit = Math.floor(num / 10);
  const onesDigit = num % 10;
  let word = tensWords[tensDigit];

  if (onesDigit > 0) {
    word += " " + numberWords[onesDigit];
  }

  return word.trim();
};

const checkIfAM = (hourString) => {
  //check hourString if > 12
  //return AM if true
  //else return PM

  const AMString = "am";
  const PMString = "pm";
  // Check if the input is a valid number string
  if (
    isNaN(hourString) ||
    hourString < 0 ||
    hourString > 99 ||
    !Number.isInteger(parseFloat(hourString))
  ) {
    return "Invalid input";
  }
  // Convert the string to a number
  const num = parseInt(hourString, 10);

  // check if less than 12
  return num > 12 ? AMString : PMString;
};

const timeWord = (timeString) => {
  //final = output string
  let final;

  //string end combinations

  const oClockString = "o' clock";

  //spit timeString into two STR halves
  //eg. "00:12" -> ["00","12"]
  const splitArr = timeString.split(":"); //["00","12"]
  const hoursStr = convertNumberToWord(splitArr[0]); //"00"

  let minStr = splitArr[1]; //STR "12"
  let minuteTensDigit = convertNumberToWord(minStr[0]); //STR"1"
  let minuteOnesDigit = convertNumberToWord(minStr[2]); //STR "2"

  //check for edge cases (ie. noon, midnight or o'clock)
  if (minuteOnesDigit === "zero" && minuteTensDigit === "zero") {
    if (hoursStr === "zero") final = "midnight";
    else if (hoursStr === "twelve") final = "noon";
    else {
      //return __ 'o' clock AM/PM
      final = hoursStr + oClockString + checkIfAM(hoursStr);
    }
  } else {
    final =
      hoursStr + " " + convertNumberToWord(minStr) + " " + checkIfAM(hoursStr);
  }

  //return final output string
  return final;
};

export { timeWord, checkIfAM, convertNumberToWord };
