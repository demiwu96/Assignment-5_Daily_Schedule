// time, day, date
var time;
var date;
var day;

// update time
function update() {
    var dt = new Date();
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    time = dt.toLocaleTimeString();
    date = months[dt.getMonth()] + ', ' + dt.getDate() + ', ' + dt.getFullYear();
    day = day[dt.getDay()];

    document.getElementById("time").innerHTML = time;
    document.getElementById("date").innerHTML = date;
    document.getElementById("day").innerHTML = day;
    setTimeout(update, 500);
};


// change color with time
function checkTime() {
    var dt = new Date();
    // var changeColor = setInterval(function () {
    var currentTimeId = dt.getHours(); // 0 - 23 
    var currentTimeString = currentTimeId.toString(); // string "0" - "23"
    var rows = document.getElementsByClassName("row");

    // all time id that is less than current time will be gray
    for (var a = 0; a < rows.length; a++) {
        if (parseInt(rows[a].id) < currentTimeId) {
            document.getElementById(rows[a].id).style.backgroundColor = '#9e9d9d';
            document.getElementById(rows[a].id).style.textDecoration = 'line-through';
            document.getElementById(rows[a].id).style.color = 'white';
        } else if (parseInt(rows[a].id) > currentTimeId) {
            // future time will be purple
            document.getElementById(rows[a].id).style.backgroundColor = 'rgb(172, 128, 216)';
            document.getElementById(rows[a].id).style.color = 'rebeccapurple';
        } else {
            // current time will be green
            document.getElementById(currentTimeId.toString()).style.backgroundColor = "#63d322";
            document.getElementById(currentTimeId.toString()).style.color = 'white';
        }
    };

    // When hour is 0, reset color of row. 
    if (currentTimeId == 0) {
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.backgroundColor = 'rgb(172, 128, 216)';
            rows[i].style.color = 'rebeccapurple';
            rows[i].style.textDecoration = "none";
        };
        localStorage.clear();
    }
    setTimeout(checkTime, 10);
}




$(document).ready(function () {
    displayTasks();
    var display = $(".display");
    var timeId;

    $(".add").click(function () {
        // show time on the modal
        timeId = $(this).parent().parent().attr("id");
        $("#showHr").text("at " + timeId + ' O\'clock');
    });

    $("#save").click(function () {
        // show input in the time block
        var input = $("#input").val();
        var box = display[timeId - 7];
        var item = document.createElement('p');
        item.classList.add("item");
        item.style.display = "block";

        // click the task to delete
        item.addEventListener('click', function () {
            $(this).css("display", "none");
            var pId = $(this).parent().parent().attr("id");
            var textInside = $(this).text();
            var submittedTasks = JSON.parse(localStorage.getItem('tasksList'));
            var array = submittedTasks[pId];
            array = array.filter(e => e !== textInside);
            submittedTasks[pId] = array;
            localStorage.setItem("tasksList", JSON.stringify(submittedTasks));
        });

        item.innerHTML = input;
        box.append(item);

        // local storage, object
        var object;
        var array_value;
        if (localStorage.getItem('tasksList')) {
            object = JSON.parse(localStorage.getItem('tasksList'));
            // check if the time exist
            if (object[timeId]) {
                array_value = object[timeId];
                array_value.push(input);
                object[timeId] = array_value;
            } else {
                array_value = [];
                array_value.push(input);
                object[timeId] = array_value;
            }
            // If no local storage
        } else {
            object = {};
            array_value = [];
            array_value.push(input);
            object[timeId] = array_value;
        }

        localStorage.setItem("tasksList", JSON.stringify(object));
        $("#input").val("");
    });

    // display tasks:
    function displayTasks() {
        var submittedTasks = JSON.parse(localStorage.getItem('tasksList'));
        if (!submittedTasks) {
            return;
        };
        var idArray = Object.keys(submittedTasks); // get the time id
        idArray.forEach(function (a) {
            var showTasks = $("#" + a).children("div.display");
            var savedTasksArray = submittedTasks[a];
            for (var j = 0; j < savedTasksArray.length; j++) {
                var item = document.createElement('p');
                item.classList.add("item");
                item.style.display = "block";
                // click the task to delete
                item.addEventListener('click', function () {
                    $(this).css("display", "none");
                    var pId = $(this).parent().parent().attr("id");
                    var textInside = $(this).text();
                    var submittedTasks = JSON.parse(localStorage.getItem('tasksList'));
                    var array = submittedTasks[pId];
                    array = array.filter(e => e !== textInside);
                    submittedTasks[pId] = array;
                    localStorage.setItem("tasksList", JSON.stringify(submittedTasks));
                });
                item.innerHTML = savedTasksArray[j];
                showTasks.append(item);
            };
        });
    };
});




// call functions
update();
checkTime();