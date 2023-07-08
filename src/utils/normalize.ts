const Number2StrMap: { [key: string]: string } = {
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
  "10": "Ten",
  "11": "Eleven",
  "12": "Twelve",
  "13": "Thirteen",
  "14": "Fourteen",
  "15": "Fifteen",
  "16": "Sixteen",
  "17": "Seventeen",
  "18": "Eighteen",
  "19": "Nineteen",
  "20": "Twenty",
  "21": "TwentyOne",
  "22": "TwentyTwo",
  "23": "TwentyThree",
  "24": "TwentyFour",
  "30": "Thirty",
  "50": "Fifty",
  "60": "Sixty",
  "123": "OneTwoThree",
  "360": "ThreeHundredSixty",
};

export const normalize = (input: string) => {
  for (const key of Object.keys(Number2StrMap).reverse()) {
    const value = Number2StrMap[key];
    if (!value) continue;
    const re = new RegExp(`^${key}`);
    input = input.replace(re, value);
  }
  return input;
};
