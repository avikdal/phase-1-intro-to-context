function createEmployeeRecord(array){
    // Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.

    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

// createEmployeeRecord(["amanda", "vikdal", "lmt", 10])

function createEmployeeRecords(arrayOfArarys){
    // Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    let arrayOfObj = arrayOfArarys.map(createEmployeeRecord)
    // console.log(arrayOfObj)
    return arrayOfObj
}

// createEmployeeRecords([["amanda", "vikdal", "lmt", 10],["moe", "sizlak", "barkeep", 2], ["bartholomew", "simpson", "scamp", 3]])

function createTimeInEvent(obj, dateStamp){
    let newObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0],
    }
    obj.timeInEvents.push(newObj)
    return obj
}


function createTimeOutEvent(obj, dateStamp){

    let newObj = {
     type: "TimeOut",
     hour: parseInt(dateStamp.split(' ')[1], 10),
     date: dateStamp.split(' ')[0],
    }
    obj.timeOutEvents.push(newObj)

    return obj
}

function hoursWorkedOnDate(obj, date){
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    let eventDateBegin = obj.timeInEvents.find(eventObj => {
        if(eventObj['date'] === date){
            return eventObj
        } 
    })
    let eventDateEnd = obj.timeOutEvents.find(eventObj => {
        if(eventObj['date'] === date){
            return eventObj
        } 
    })

    let hoursWorked = parseInt(eventDateEnd.hour) - parseInt(eventDateBegin.hour)
    return hoursWorked/100
}

function wagesEarnedOnDate(obj, date){
    let pay = obj.payPerHour 
    let totalHours = hoursWorkedOnDate(obj,date)
    let payForDay = pay * totalHours
    return payForDay
}

function allWagesFor(obj){
    // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
    // Amount should be returned as a number. HINT: You will need to find the available dates somehow...

    let startHours = 0
    let inTimes = obj.timeInEvents.reduce((accumulate, currentIteration) => {
        return accumulate + wagesEarnedOnDate(obj, currentIteration.date)
    }, startHours)
    
    return inTimes
}

function calculatePayroll(array){
    // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
    // Amount should be returned as a number.

    let startPay = 0
    let payRoll = array.map((employeeObj) => allWagesFor(employeeObj))
    let sumOfPayOwedToAllEmployeesForAllDates = payRoll.reduce((accumulate, currentIteration) => accumulate + currentIteration, startPay)

    return sumOfPayOwedToAllEmployeesForAllDates
}