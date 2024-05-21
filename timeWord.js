const convertNumberToWord = (numStr) => {
    const numberWords = [
      "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];
    
    const tensWords = [
      "", "", "twenty", "thirty", "forty", "fifty"
    ];
  
    if (isNaN(numStr) || numStr < 0 || numStr > 99 || !Number.isInteger(parseFloat(numStr))) {
      return "Invalid input";
    }
  
    const num = parseInt(numStr, 10);
  
    if (num < 20) {
      return numberWords[num];
    }
  
    const tensDigit = Math.floor(num / 10);
    const onesDigit = num % 10;
    let word = tensWords[tensDigit];
  
    if (onesDigit > 0) {
      word += " " + numberWords[onesDigit];
    }
  
    return word ? word.trim() : "";
  };
  
  const checkIfAM = (hourString) => {
    const num = parseInt(hourString, 10);
    return num < 12 ? "am" : "pm";
  };
  
  const convertTo12HourFormat = (hourStr) => {
    const hour = parseInt(hourStr, 10);
    if (hour === 0) return "12";
    if (hour > 12) return (hour - 12).toString();
    return hour.toString();
  };
  
  const timeWord = (timeString) => {
    const splitArr = timeString.split(":");
    const hour = splitArr[0];
    const minute = splitArr[1];
  
    let hoursStr = convertTo12HourFormat(hour);
    let minutesStr = convertNumberToWord(minute);
  
    if (hour === "00" && minute === "00") return "midnight";
    if (hour === "12" && minute === "00") return "noon";
  
    if (minute === "00") {
      return `${convertNumberToWord(hoursStr)} o'clock ${checkIfAM(hour)}`;
    }
  
    // Handle single-digit minutes with "oh" prefix
    if (minute[0] === "0") {
      minutesStr = `oh ${convertNumberToWord(minute[1])}`;
    }
  
    return `${convertNumberToWord(hoursStr)} ${minutesStr} ${checkIfAM(hour)}`;
  };
  
  // Test cases
  console.log(timeWord("00:00")); // "midnight"
  console.log(timeWord("00:12")); // "twelve twelve am"
  console.log(timeWord("01:00")); // "one o’clock am"
  console.log(timeWord("06:01")); // "six oh one am"
  console.log(timeWord("06:10")); // "six ten am"
  
  module.exports = { timeWord, checkIfAM, convertNumberToWord };
  