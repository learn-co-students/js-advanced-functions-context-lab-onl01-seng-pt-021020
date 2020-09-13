function createEmployeeRecord(emplDataArr) {
    return {
        firstName: emplDataArr[0],
        familyName: emplDataArr[1],
        title: emplDataArr[2],
        payPerHour: emplDataArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(emplsArr) {
    return emplsArr.map(createEmployeeRecord)
}

function createTimeInEvent(dateTimeStr) {
    this.timeInEvents.push({
        type: 'TimeIn',
        date: dateTimeStr.split(' ')[0],
        hour: parseInt(dateTimeStr.split(' ')[1])
    })

    return this
}

function createTimeOutEvent(dateTimeStr) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: dateTimeStr.split(' ')[0],
        hour: parseInt(dateTimeStr.split(' ')[1])
    })

    return this
}

function hoursWorkedOnDate(dateStr) {
    const timeIn = this.timeInEvents.find(timeInEvent => timeInEvent.date === dateStr)
    const timeOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateStr)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(dateStr) {
    return hoursWorkedOnDate.call(this, dateStr) * this.payPerHour
}

function calculatePayroll(emplsArr) {
    return emplsArr.map(empl => allWagesFor.call(empl)).reduce((total, emplWages) => total + emplWages)
}

function findEmployeeByFirstName(emplsArr, firstName) {
    return emplsArr.find(empl => empl.firstName === firstName)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
