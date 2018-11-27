$(function() {

    const ENTER_KEY = 13;

    var settings = {};
    var events = [];
    var element = document.getElementById('caleandar');

    events = [
        //create initial events (just for testing)
        // { date: '2018-11-23', title: 'Doctor appointment at 3:25pm.'},
        // { date: '2018-11-4', title: 'Tralala appointment at 3:25pm.'},
    ];

    events.forEach(initialEvent => eventList.addEvent(initialEvent.date, initialEvent.title));

    //create initial events (just for testing)
    // var cal = caleandar(element, eventList.getEvents(), settings);
    var cal = caleandar(element, events, settings);

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
            return;
        };
        var id = eventList.addEvent(date, value);
        textField.value = '';
        addEvent(id, date, value);
        var eventArray = eventList.getEvents();
        element.innerHTML = '';
        caleandar(element, eventArray, settings);
    });
    //----------------------------------------------------------------

    var days = document.getElementsByClassName('cld-day');
    for (var index = 0; index < days.length; index++) {
        days[index].addEventListener('click', function() {
            var year = cal.Selected.Year;
            var month = cal.Selected.Month + 1;
            var selectedDay = this.firstChild.innerText;

            // if (selectedDay.firstChild.className == "eventday") {
            //     console.log(selectedDay.firstChild.innerText);
            // }
            var pTag = $('p');

            if ($('p.cld-number eventday')) {
                console.log($('p.cld-number eventday').html());
            }
            console.log(year);
            console.log(month);
            console.log(selectedDay);
            //console.log(days.innerText);
            // var spanTags = document.querySelectorAll('span.cld-title');
            // swal(selectedDay)

            var date = new Date(year, month, selectedDay);
            var eventArray = eventList.getEvents();
            eventArray.forEach(event => console.log(event.date.getDate()));
        });
    }

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
        var eventArray = eventList.getEvents();
        element.innerHTML = '';
        caleandar(element, eventArray, settings);
    }


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
            click: function() {

                const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                toast({
                        type: 'warning',
                        title: 'This event is deleted from your list'
                    })
                    // swal({
                    //     title: 'You just deleted your event',
                    //     animation: true,
                    //     text: "You won't be able to revert this!",
                    //     type: 'warning',
                    //     customClass: 'animated tada'
                    // })

                // swal({
                //     title: 'Are you sure?',
                //     text: "You won't be able to revert this!",
                //     type: 'warning',
                //     showCancelButton: true,
                //     confirmButtonColor: '#3085d6',
                //     cancelButtonColor: '#d33',
                //     confirmButtonText: 'Yes, delete it!'
                // }).then((result) => {
                //     if (result.value) {
                //         swal.enableButtons(),
                //             // // $('span.remove').on('click', function() {
                //             // document.querySelectorAll('#events > li > input[type=checkbox]:checked').forEach(function(input) {
                //             //     removeEvent(input.parentNode);
                //             // });
                //             // // });
                //             swal(
                //                 'Deleted!',
                //                 'Your file has been deleted.',
                //                 'success'
                //             )
                //     }
                // })
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

    // function showEvents() {
    //     eventList.events.forEach(function(event) {
    //         addEvent(event.id, event.date, event.text);
    //     });
    // }

    // // showEvents();


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
    // var days = document.getElementsByClassName('cld-day');

    for (var index = 0; index < days.length; index++) {
        days[index].addEventListener('click', function() {
            var year = cal.Selected.Year;
            var month = cal.Selected.Month + 1;
            var selectedDay = this.firstChild.innerText;
            console.log(year);
            console.log(month);
            console.log(selectedDay);

            swal({
                title: 'NO',
                width: 600,
                padding: '11em',
                background: 'url(./styles/images/events.jpg)',
                backdrop: `
                  rgba(0,0,123,0.4)
                  center left
                  no-repeat
                `
            })

            var date = new Date(year, month, selectedDay);
        });
    }

});