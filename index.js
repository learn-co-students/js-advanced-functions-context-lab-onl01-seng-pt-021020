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

let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(array) {
    return array.map(record => { return createEmployeeRecord(record)})
}

let createTimeInEvent = function(time){
    let [date, hour] = time.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(time){
    let [date, hour] = time.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = function(date){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(date){
    let wage = hoursWorkedOnDate.call(this, date)
        * this.payPerHour
    return parseFloat(wage.toString())
}

let calculatePayroll = function(employeeRecords){
    return employeeRecords.reduce(function(employee, record){
        return employee + allWagesFor.call(record)
    }, 0)
}

let findEmployeeByFirstName = function(employee, firstName) {
    return employee.find(function(record){
      return record.firstName === firstName
    })
}


// Previous Lesson:
// function createEmployeeRecord(record) {
//     return {
//         firstName: record[0],
//         familyName: record[1],
//         title: record[2],
//         payPerHour: record[3],
//         timeInEvents: [],
//         timeOutEvents: [],
//     }
// }

// function createEmployeeRecords(array) {
//     return array.map(record => createEmployeeRecord(record))
// }

// function createTimeInEvent(record, time) {
//     let [date, hour] = time.split(' ')

//     record.timeInEvents.push({
//         type: "TimeIn",
//         hour: parseInt(hour, 10),
//         date: date
//     })
//     return record
// }

// function createTimeOutEvent(record, time) {
//     let [date, hour] = time.split(' ')

//     record.timeOutEvents.push({
//         type: "TimeOut",
//         hour: parseInt(hour, 10),
//         date: date
//     })
//     return record
// }

// function hoursWorkedOnDate(employee, date) {
//     let startDate = employee.timeInEvents.find(function(e){
//         return e.date === date 
//     })
//     let endDate = employee.timeOutEvents.find(function(e){
//         return e.date === date
//     })
//     return (endDate.hour - startDate.hour) / 100
// }

// function wagesEarnedOnDate(employee, date) {
//     let wage = hoursWorkedOnDate(employee, date)
//         * employee.payPerHour
//     return parseFloat(wage.toString())
// }

// function allWagesFor(employee) {
//     let availableDates = employee.timeInEvents.map(function(e){
//         return e.date
//     })
//     let wages = availableDates.reduce(function(record, d){
//         return record + wagesEarnedOnDate(employee, d) 
//     }, 0)

//     return wages
// }

// function calculatePayroll(employees) {
//     return employees.reduce(function(employee, record) {
//         return employee + allWagesFor(record)
//     }, 0)
// }

// function findEmployeeByFirstName(employee, firstName) {
//     return employee.find(function(record){
//         return record.firstName === firstName
//       })
// }