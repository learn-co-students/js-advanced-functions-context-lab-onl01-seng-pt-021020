/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(arr) {
	return {
		firstName: arr[0],
		familyName: arr[1],
		title: arr[2],
		payPerHour: arr[3],
		timeInEvents: [],
		timeOutEvents: []
	};
};

let createEmployeeRecords = function(data) {
	return data.map((emp) => createEmployeeRecord(emp));
};

let createTimeInEvent = function(timeStamp) {
	let [ date, hour ] = timeStamp.split(' ');

	this.timeInEvents.push({
		type: 'TimeIn',
		hour: parseInt(hour, 10),
		date
	});
	return this;
};

let createTimeOutEvent = function(timeStamp) {
	let [ date, hour ] = timeStamp.split(' ');

	this.timeOutEvents.push({
		type: 'TimeOut',
		hour: parseInt(hour, 10),
		date
	});
	return this;
};

let hoursWorkedOnDate = function(timeStamp) {
	let tIn = this.timeInEvents.find(function(e) {
		return e.date === timeStamp;
	});

	let tOut = this.timeOutEvents.find(function(e) {
		return e.date === timeStamp;
	});

	return (tOut.hour - tIn.hour) / 100;
};

let wagesEarnedOnDate = function(timeStamp) {
	return hoursWorkedOnDate.call(this, timeStamp) * this.payPerHour;
};

let allWagesFor = function() {
	let eligibleDates = this.timeInEvents.map(function(e) {
		return e.date;
	});

	let payable = eligibleDates.reduce(
		function(memo, d) {
			return memo + wagesEarnedOnDate.call(this, d);
		}.bind(this),
		0
	); // <== Hm, why did we need to add bind() there? We'll discuss soon!

	return payable;
};

let findEmployeeByFirstName = function(array, name) {
	return array.find((emp) => emp.firstName === name);
};

let calculatePayroll = function(array) {
	let payroll = array.map((emp) => allWagesFor.call(emp));
	return payroll.reduce((memo, init) => memo + init);
};
