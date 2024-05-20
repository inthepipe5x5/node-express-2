import { timeWord, convertNumberToWord, checkIfAM } from "./timeWord";

describe("#timeword function tests", () => {
  test("it is a function", () => {
    expect(typeof timeWord).toBe("function");
  });
  test("Basic timeWord Function Tests", () => {
    expect(timeWord("00:00")).toBe("midnight");
    expect(timeWord("00:12")).toBe("twelve twelve am");
    expect(timeWord("01:00")).toBe("one o’clock am");
    expect(timeWord("06:01")).toBe("six oh one am");
    expect(timeWord("06:10")).toBe("six ten am");
    expect(timeWord("06:18")).toBe("six eighteen am");
    expect(timeWord("06:30")).toBe("six thirty am");
    expect(timeWord("10:34")).toBe("ten thirty four am");
    expect(timeWord("12:00")).toBe("noon");
    expect(timeWord("12:09")).toBe("twelve oh nine pm");
    expect(timeWord("23:23")).toBe("eleven twenty three pm");
  });
});

describe("#checkIfAM function tests", () => {
  test("it is a function", () => {
    expect(typeof checkIfAM).toBe("function");
  });
  test("Basic checkIfAM Function Tests", () => {
    expect(checkIfAM("00")).toBe("am");
    expect(checkIfAM("00")).toBe("am");
    expect(checkIfAM("01")).toBe("am");
    expect(checkIfAM("06")).toBe("am");
    expect(checkIfAM("06")).toBe("am");
    expect(checkIfAM("06")).toBe("am");
    expect(checkIfAM("06")).toBe("am");
    expect(checkIfAM("10")).toBe("am");
    expect(checkIfAM("12")).toBe("pm");
    expect(checkIfAM("12")).toBe("pm");
    expect(checkIfAM("23")).toBe("pm");
  });
});

describe("#convertNumberToWord function tests", () => {
  test("it is a function", () => {
    expect(typeof convertNumberToWord).toBe("function");
  });
  test("Basic convertNumberToWord Function Tests", () => {
    expect(convertNumberToWord("00")).toBe("zero");
    expect(convertNumberToWord("01")).toBe("one");
    expect(convertNumberToWord("10")).toBe("ten");
    expect(convertNumberToWord("60")).toBe("sixty");
    expect(convertNumberToWord("12")).toBe("twelve");
    expect(convertNumberToWord("42")).toBe("forty two");
  });
});

