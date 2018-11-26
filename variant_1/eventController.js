$(function() {

    const ENTER_KEY = 13;

    var settings = {};
    var events = [];
    var element = document.getElementById('caleandar');

    events = [
        { 'Date': new Date(2018, 10, 23), 'Title': 'Doctor appointment at 3:25pm.' },
    ];
    var cal = caleandar(element, events, settings);

    element.addEventListener('click', function() {
        // console.log(element);
    });

    $('#addEvent').on('click', function() {
        var textField = document.getElementById('newEvent');
        var value = textField.value;
        var date = document.getElementById('myDate').value;
        if (value.trim().length == 0) {
            swal(
                'Please enter a title for your new Event!',
                'Add your new event',
                'warning'
            )
        };
        var id = eventList.addEvent(date, value);
        textField.value = '';
        addEvent(id, date, value);
        var eventArray = eventList.getEvents();
        element.innerHTML = '';
        caleandar(element, eventArray, settings);
    });
    //------------------------------------------------------------------------------------------------------------------------
    var days = document.getElementsByClassName('cld-day');
    for (var index = 0; index < days.length; index++) {
        days[index].addEventListener('click', function() {
            var year = cal.Selected.Year;
            var month = cal.Selected.Month + 1;
            var selectedDay = this.firstChild.innerText;
            console.log(year);
            console.log(month);
            console.log(selectedDay);

            swal(selectedDay)

            var date = new Date(year, month, selectedDay);
            // newEvents = [
            //     { 'Date': new Date(2018, 10, 23), 'Title': 'Doctor appointment at 3:25pm.' },
            //     { 'Date': new Date(2018, 10, 24), 'Title': 'Tralala appointment at 3:25pm.' },
            // ];
            // cal.Model = newEvents;
            // console.log("Model: ");
            // for (var i = 0; i < cal.Model.length; i++) {
            //     console.log(cal.Model[i]);
            // }
        });
    }
    //------------------------------------------------------------------------------------------------------------------------


    $('#addEvent').on({
        mouseenter: function() {
            $(this).css("background-color", "#1fc8db");
            $(this).css("color", "#7B00FF");
        },
        mouseleave: function() {
            $(this).css("background-color", "white");
            $(this).css("color", "#051437");
        },
    });

    function removeEvent(event) {
        var li = event;
        var id = li.id;
        eventList.removeEvent(id);
        li.parentNode.removeChild(li);
        //------------------------------
        var eventArray = eventList.getEvents();
        element.innerHTML = '';
        caleandar(element, eventArray, settings);
    }

    function showEvents() {
        eventList.events.forEach(function(event) {
            addEvent(event.id, event.date, event.text);
        });
    }

    // showEvents();

    function addEvent(id, date, value) {
        var li = document.createElement('li');
        li.id = id;

        li.innerHTML = '<input id="checkbox" type="checkbox" /> <span>' + date + '</span><span>' + '  ' +
            value + '</span><span class ="remove"> &times; Remove Event</span>';

        $('#events').append(li);

        $('span.remove').on({
            mouseenter: function() {
                $(this).css("background-color", "coral");
                $(this).css("color", "white");
            },
            mouseleave: function() {
                $(this).css("background-color", "white");
                $(this).css("color", "red");
            },

        });

        var checkbox = li.children[0];
        checkbox.addEventListener('click', function() {
            var li = this.parentNode;
            var id = li.id;
            eventList.toggleEvent(id);

            if (this.checked == true)
                li.children[2].style.textDecoration = 'line-through';
            else
                li.children[2].style.textDecoration = 'none';
        });
        var deleteButton = li.children[3];
        deleteButton.addEventListener('click', function() {
            removeEvent(this.parentNode);
        });

        $('span.remove').on('click', function() {
            document.querySelectorAll('#events > li > input[type=checkbox]:checked').forEach(function(input) {
                removeEvent(input.parentNode);
            });
        });
    }



    // document.getElementById('newEvent').addEventListener('keypress', function() {
    //     if (event.keyCode == ENTER_KEY) {
    //         var value = this.value;
    //         var date = document.getElementById('myDate').value;
    //         if (value.trim().length == 0) return;
    //         var id = eventList.addEvent(value);

    //         this.value = '';
    //         addEvent(id, date, value);
    //     }
    // });

});