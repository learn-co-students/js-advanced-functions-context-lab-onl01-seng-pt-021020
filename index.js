/* Your Code Here */

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

// into lab

// Your code here

function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(dataEmployees) {
    return dataEmployees.map(row => createEmployeeRecord(row))
}

function createTimeInEvent(newEvent) {
    let [date, hour] = newEvent.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

function createTimeOutEvent(newEvent) {
    let [date, hour] = newEvent.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

function hoursWorkedOnDate(timeEvent) {
    let timeIn = this.timeInEvents.find(function(e) {
        return e.date === timeEvent
    })

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === timeEvent
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(timeEvent) {
    let wage = hoursWorkedOnDate.call(this, timeEvent) * this.payPerHour

    return parseFloat(wage.toString())
}

// function allWagesFor(employee) {
//     let workDates = employee.timeInEvents.map(function(e) {
//         return e.date
//     })

//     let wages = workDates.reduce(function(cRecord, day){
//         return cRecord + wagesEarnedOnDate(employee, day)
//     }, 0)

//     return wages
// }

function createEmployeeRecords(rec) {
    return rec.map(function(row) {
        return createEmployeeRecord(row)
    })
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(function(employee) {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(emp, rec) {
        return emp + allWagesFor.call(rec)
    }, 0)
}