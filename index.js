

/* Your Code Here */

let createEmployeeRecord = function(employee){
    let emp = {
        firstName: employee[0],
		familyName: employee[1],
		title: employee[2],
		payPerHour: employee[3],
		timeInEvents: [],
		timeOutEvents: []
	};
	return emp;
}

let createEmployeeRecords = function(employees){
    return employees.map((e) => {
        return createEmployeeRecord(e);
	});
}

let createTimeInEvent = function(timeIn){
    let [ date, hour ] = timeIn.split(' ');
    this.timeInEvents.push({ date: date, hour: parseInt(hour), type: 'TimeIn' });
	return this;
}

let createTimeOutEvent = function(timeOut){
    let [ date, hour ] = timeOut.split(' ');
    this.timeOutEvents.push({ date: date, hour: parseInt(hour), type: 'TimeOut' });
	return this;
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find((obj) => {return obj.date == date;});
    let timeOut = this.timeOutEvents.find((obj) => {return obj.date == date;});
	return (timeOut.hour - timeIn.hour) / 100;
}

let wagesEarnedOnDate = function(date){
    let hrs = hoursWorkedOnDate.call(this, date);
	return hrs * this.payPerHour;
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    
    return payable
}

let findEmployeeByFirstName = function(src, firstName){
    // console.log(this)
    return src.find(function(emp) {
		return emp.firstName === firstName;
	});
}

let calculatePayroll = function(records){
    let pay = records.map(function(obj) {
		return allWagesFor.call(obj);
	});
	return pay.reduce(function(a, b) {
		return a + b;
	});
}


/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/
let test = ["Gray", "Worm", "Security", 1]
let cRecord = createEmployeeRecord(test)
createTimeInEvent.call(cRecord, "44-03-15 0900")
createTimeOutEvent.call(cRecord, "44-03-15 1100")
hoursWorkedOnDate.call(cRecord, "44-03-15")
wagesEarnedOnDate.call(cRecord, "44-03-15")