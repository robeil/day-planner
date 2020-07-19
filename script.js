$(document).ready(function () {
    // baisc variables for the hole project
    var timeBlock = document.getElementById("timeBlock");
    var saveBtn = document.getElementById("save");
    var myInput = document.getElementById("myInput");
    var noteList = document.getElementById("note-list");
    var currentDay = document.getElementById("dayContainer");

    var myDate = new Date();

    var day = myDate.getDay();
    var month = myDate.getMonth();
    var dayM = myDate.getDate();
    var dayArray = new Array("Sunday", "Monday", "Tuesady", "Wednesday", "Thursday", "Friday", "Saturday");
    var monthArray = Array("January", "February", "March", "Aprril", "May", "June", "July", "Aguest", "September", "October", "November", "December");
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
    var hours = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"]
// the function that generate the date 
    function currentDateD() {
        
          
// loopong the year, month and date
        var year = myDate.getYear();
        if (year < 1000) {
            year += 1900
        }

        if (h == 24) {
            h = 0;
        }
        else if (h > 12) {
            h = h - 0;
        }
        if (h < 10) {
            h = "h" + h;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (m < 10) {
            m = "0" + s;
        }

        var myClock = document.getElementById("current-day");
       
        myClock.textContent = " " + dayArray[day] + ", " + monthArray[month] + ", " + dayM + " ," + year;
        myClock.innerText = " " + dayArray[day] + " , " + monthArray[month] + " ," + dayM + ", " + year;
        
        // try to take the time from here to add to input ........
     
        setTimeout("(currentDateD)", 1000);
    }
// calling thedate function to display the date
    currentDateD();

});
// function that create input and save 
$(document).ready(function () {

    localStorage.setItem("DailyPlan", storeNote);
    dailyPlan = localStorage.getItem("dailyPlan");
    //dayContainer.innerHTML = dailyPlan;
    

    var currentDay = $("#currentDay");
    var dayContainer = $("#dayContainer");
    var todayT = moment().format('dddd, MMMM Do YYYY');
    var hours = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"]
    var currentHour = moment().format("h");
    var hour1 = hours.map(function (value) {
        var notes = value.replace(":00", "");
        return notes;
    });
    console.log(currentHour);
    console.log(hour1);
    var hoursIndex = hour1.findIndex(function (value, index) {
        if (value === currentHour) {
            return index;
        };
    });
    console.log(moment().format("h") + " " + typeof (moment().format("h")));

// storing getting data 
    currentDay.text(todayT);
    
    function getNotes() {
        for (i = 0; i < hours.length; i++) {
            var noteSet = JSON.parse(localStorage.getItem(("note-" + i)));
            if (noteSet !== null) {
                console.log(noteSet.note);
                $(".textarea ->" + i).text(noteSet.note);
            }
        }
    }
//soting the input
    function storeNote(index) {
        console.log(index);
        var noteInput = $(".textarea-" + index).val();
        console.log(noteInput);
        var thisNote = {
            "dataIndex": index,
            "note": noteInput
        }
        localStorage.setItem(("great" + index), JSON.stringify(thisNote));
    }

  // looping the input
    function startSchedule() {
        for (var i = 0; i < hours.length; i++) {
            
            var newDiv = $("<div>");
            newDiv.addClass("row")
            newDiv.attr("data-thisHour", hours[i]);
//
            var hourDiv = $("<div>");
            hourDiv.addClass("col-md-1 hour float-left");
            hourDiv.text(hours[i]);
   //   
            var timeBlockDiv = $("<div>");
            timeBlockDiv.addClass("col-md-10 time-block form-group");
            timeBlockDiv.attr("data-timeBlock", i);
//
            var timeBlockTextInput = $("<textarea>");
            timeBlockTextInput.addClass("textarea-" + i);
            timeBlockTextInput.attr("rows", 3);
            timeBlockTextInput.attr("data-textInput", i);
//
            var saveBtnDiv = $("<button>");
            saveBtnDiv.addClass("col-md-1 saveBtn float-right far fa-save fa-3x");
            saveBtnDiv.attr("data-SaveBtn", i);
            saveBtnDiv.on("click", function () {
                var noteIndex = $(this).attr("data-SaveBtn");
                console.log(noteIndex);
                storeNote(noteIndex);
            });
    // appending in the div

            dayContainer.append(newDiv);
            newDiv.append(hourDiv);
            newDiv.append(timeBlockDiv);
            timeBlockDiv.append(timeBlockTextInput);
            newDiv.append(saveBtnDiv);

            if (i < hoursIndex) {
                timeBlockDiv.addClass("past");
            }
            if (i === hoursIndex) {
                timeBlockDiv.addClass("present");
            }
            if (i > hoursIndex) {
                timeBlockDiv.addClass("future");
            }
        }
    }
    // calling the dunction to display the input nad save
    startSchedule();
    getNotes();
});
