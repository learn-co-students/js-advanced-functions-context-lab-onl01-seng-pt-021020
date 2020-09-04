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

function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(employeesArray){
    return employeesArray.map(function(emp){
        return createEmployeeRecord(emp)
    })
};

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
};

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
};

function hoursWorkedOnDate(dateStamp){
    let clockIn = this.timeInEvents.find(function(e){
        return e.date === dateStamp
    })    
    let clockOut = this.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (clockOut.hour - clockIn.hour) / 100
};

function wagesEarnedOnDate(dateStamp){
    let totalWage = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
    return totalWage
};

function findEmployeeByFirstName(employeeArray, firstName){
    return employeeArray.find(function(employee){
        return employee.firstName === firstName
    })
};

function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(total, record){
        return total + allWagesFor.call(record)
    }, 0)
}