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

    console.log('timeIn:', timeIn)
    console.log('timeOut:', timeOut)

    return (timeOut - timeIn) / 100
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
