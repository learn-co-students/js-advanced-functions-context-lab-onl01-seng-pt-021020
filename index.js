/* Your Code Here */

function createEmployeeRecord(array) {
    return {
      firstName : array[0],
      familyName : array[1],
      title : array[2],
      payPerHour : array[3],
      timeInEvents : [],
      timeOutEvents : []
    }
}

function createEmployeeRecords(data) {
    return data.map(function(row) {
        return createEmployeeRecord(row);
    });
};

function createTimeInEvent(timeStamp) {
    let [date, hour] = timeStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

function createTimeOutEvent(timeStamp) {
    let [date, hour] = timeStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

function hoursWorkedOnDate(date) {
    let clockIn = this.timeInEvents.find(function(e) {
        return e.date === date;
    });

    let clockOut = this.timeOutEvents.find(function(e) {
        return e.date === date;
    });

    return (clockOut.hour - clockIn.hour) / 100;
};

function wagesEarnedOnDate(date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return parseFloat(wage.toString());
};

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

function findEmployeeByFirstName(array, name) {
    return array.find(function(e) {
        return e.firstName === name;
    })
}

function calculatePayroll(array) {
    return array.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec);
    }, 0);
};