"use strict";

class Vocable {
    constructor(native, foreign) {
        this.native = native;
        this.foreign = foreign;
        this.reset();
    }
    testForeign(foreign) {
        if (foreign === this.foreign) { this.logTestResult(true); }
        else { this.logTestResult(false); }
    }
    testNative(native) {
        if (nativ === this.foreign) { this.logTestResult(true); }
        else { this.logTestResult(false); }
    }
    logTestResult(success) {
        let time = new Date();
        let resultObject = { time, success }
        this.testHistory.push(resultObject)
    }
    reset() {
        this.testHistory = []
    }
    printHistory() {
        console.table(this.testHistory);
    }
    get timesStudied() { return this.testHistory.length }
    get timesRight() { return this.testHistory.filter((element) => { return element.success }).length }
    get timesWrong() { return this.testHistory.filter((element) => { return !element.success }).length }
    get currentStreak() {
        let index = this.testHistory.length - 1;
        let streak = 0;
        while (this.testHistory[index].success === true) {
            streak += 1;
            index -= 1;
        }
        return streak;
    }
    get maxStreak() {
        let maxStreak = 0;
        let currentStreak = 0;
        for (let result of this.testHistory) {
            if (result.success === true) {
                currentStreak += 1;
            }
            else if (result.success === false) {
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                }
                currentStreak = 0;
            }
        }
        return Math.max(currentStreak, maxStreak);
    }
}

if (typeof require !== 'undefined' && require.main === module) {
    let firstWord = new Vocable("house", "la casa");
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casad")
    firstWord.testForeign("la casA")
    firstWord.testForeign("la casA")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casA")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.testForeign("la casa")
    firstWord.printHistory()
    console.log(firstWord.timesStudied)
    console.log(firstWord.maxStreak)

}

module.exports.Vocable = Vocable;