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
    addListeners();

    $('div#editEvent').hide();

    function stickEvent() {
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
        addListeners();
    }

    $('#addEvent').on('click', stickEvent);


    // $('#addEvent').on('click', function() {
    //     var textField = document.getElementById('newEvent');
    //     var value = textField.value;
    //     var date = document.getElementById('myDate').value;
    //     if (value.trim().length == 0) {
    //         swal(
    //             'Please enter a title for your new Event!',
    //             'Add your new event',
    //             'warning'
    //         )
    //         return;
    //     };
    //     var id = eventList.addEvent(date, value);
    //     textField.value = '';
    //     addEvent(id, date, value);
    //     var eventArray = eventList.getEvents();
    //     element.innerHTML = '';
    //     caleandar(element, eventArray, settings);
    //     addListeners();
    // });
    //----------------------------------------------------------------
    function addListeners() {
        var days = document.getElementsByClassName('cld-day');
        for (var index = 0; index < days.length; index++) {
            days[index].addEventListener('click', function(event) {
                event.stopPropagation();
                var year = cal.Selected.Year;
                var month = cal.Selected.Month + 1;
                var selectedDay = this.firstChild.innerText;
                console.log(year);
                console.log(month);
                console.log(selectedDay);
                swal('No events for today')

                var date = new Date(year, month, selectedDay);
                var eventArray = eventList.getEvents();

                eventArray.forEach(function(createdEvent) {

                    if (createdEvent.Date.getDate() == selectedDay.substring(0, selectedDay.indexOf('\n')) &&
                        (createdEvent.Date.getMonth() + 1) == month &&
                        createdEvent.Date.getFullYear() == year) {
                        if (createdEvent.Title.length == 0) {
                            swal('No events for today.')
                        } else {
                            swal({
                                title: selectedDay,
                                // text: createdEvent.Title,
                                imageUrl: 'http://nebraskaleaguefornursing.weebly.com/uploads/2/6/1/1/26116849/2025872_orig.jpg',
                                imageWidth: 400,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                                animation: false
                            })
                        }
                        console.log('Event is from today' + selectedDay);
                    }
                });
            }, true);
        }
    }

    function removeEvent(event) {
        var li = event;
        var id = li.id;
        eventList.removeEvent(id);
        li.parentNode.removeChild(li);
        var eventArray = eventList.getEvents();
        element.innerHTML = '';
        caleandar(element, eventArray, settings);
        addListeners();
    }

    function addEvent(id, date, value) {
        var li = document.createElement('li');
        li.id = id;

        li.innerHTML = '<input id="checkbox" type="checkbox" /> <span>' + date + '</span><span id="eventText">' + '  ' +
            value + '</span><span class ="remove">&times;Remove</span><span id="edit"">Edit</span>';

        $('#events').append(li);

        $('span.remove').on({
            mouseenter: function() {
                $(this).css("background-color", "#7B00FF");
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
            },
            mouseleave: function() {
                $(this).css("background-color", "white");
                $(this).css("color", "red");
            },

        });

        $('span#edit').on({
            mouseenter: function() {
                $(this).css("background-color", "#1ec7e6");
                $(this).css("color", "white");
            },
            mouseleave: function() {
                $(this).css("background-color", "white");
                $(this).css("color", "#051437");
            },
            click: function() {
                var li = this.parentNode;
                var id = li.id;
                console.log(id);
                removeEvent(this.parentNode);
                $('div#addNewEvent').hide();
                $('div#editEvent').show();
            }
        });

        function stickEditedEvent() {
            var textField = document.getElementById('editedEvent');
            var value = textField.value;
            var date = document.getElementById('editedDate').value;
            if (value.trim().length == 0) {
                return;
            }
            var id = eventList.addEvent(date, value);
            textField.value = '';
            addEvent(id, date, value);
            var eventArray = eventList.getEvents();
            element.innerHTML = '';
            caleandar(element, eventArray, settings);
            addListeners();
        }

        function someFunc() {
            stickEditedEvent();
            $('div#editEvent').hide();
            $('div#addNewEvent').show();
        }

        $('#confirm').on('click', someFunc);



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

    // for (var index = 0; index < days.length; index++) {
    //     days[index].addEventListener('click', function() {
    //         var year = cal.Selected.Year;
    //         var month = cal.Selected.Month + 1;
    //         var selectedDay = this.firstChild.innerText;
    //         console.log(year);
    //         console.log(month);
    //         console.log(selectedDay);

    //         swal({
    //             title: 'NO',
    //             width: 600,
    //             padding: '11em',
    //             background: 'url(./styles/images/events.jpg)',
    //             backdrop: `
    //               rgba(0,0,123,0.4)
    //               center left
    //               no-repeat
    //             `
    //         })

    //         var date = new Date(year, month, selectedDay);
    //     });
    // }

});