$(function() {

    var settings = {};
    var events = [];
    var element = document.getElementById('caleandar');

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!when MIME type is JSON, jqueruy automatically parse it to Objects
    // $.get('http://localhost:8080/events.json').then(function(events) {
    //     console.log(events);
    //     // events.forEach(event => {

    //     // });
    // });
    events = [
        //create initial events (just for testing)
        // { date: '2018-11-23', title: 'Doctor appointment at 3:25pm.'},
        // { date: '2018-11-4', title: 'Tralala appointment at 3:25pm.'},
    ];

    document.getElementById('eventList').style.display = "none";
    //events.forEach(initialEvent => eventList.addEvent(initialEvent.date, initialEvent.title));
    //create initial events (just for testing)
    //var cal = caleandar(element, eventList.getEvents(), settings);
    var cal = caleandar(element, events, settings);
    addListeners();

    function currentDateInput() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        $("#myDate").attr("value", today);
    }
    currentDateInput();

    $('div#editEvent').hide();

    $('#addEvent').on('click', function(event) {
        // event.preventDefault();
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
        addEvent(id, date, value);
        textField.value = '';
        var eventArray = eventList.getEvents();
        element.innerHTML = '';
        caleandar(element, eventArray, settings);
        addListeners();
    });

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
                swal(selectedDay)

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
        var divElement = document.getElementById('showAllEvents');
        document.getElementById('eventList').style.display = "inline-flex";
        divElement.classList.add("mystyle");
        $('span.remove').on({
            mouseenter: function() {
                $(this).css("background-color", "hotpink");
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
                $(this).css("background-color", "hotpink");
                $(this).css("color", "white");
            },
            mouseleave: function() {
                $(this).css("background-color", "white");
                $(this).css("color", "#051437");
            },
            click: function() {
                var currentLi = this.parentNode;
                var currentId = currentLi.id;
                var currentText = currentLi.children[2].innerText;
                var currentDate = currentLi.children[1].innerText;
                document.getElementById('editedEvent').value = currentText;
                document.getElementById('editedDate').value = currentDate;
                currentLi.style.display = "none";
                $('div#addNewEvent').hide();
                $('div#editEvent').show();
                var confirmButton = document.getElementById('confirm');
                confirmButton.addEventListener('click', function() {
                    console.log(currentLi);
                    removeEvent(currentLi);
                    stickEditedEvent();
                    $('div#addNewEvent').show();
                    $('div#editEvent').hide();
                });
                var cancelButton = document.getElementById('cancel');
                cancelButton.addEventListener('click', function() {
                    currentLi.style.display = "list-item";;
                    $('div#addNewEvent').show();
                    $('div#editEvent').hide();
                });
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
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    swal(
                        'Deleted!',
                        'Your event has been deleted.',
                        'success'
                    )
                    removeEvent(this.parentNode);
                    document.querySelectorAll('#events > li > input[type=checkbox]:checked').forEach(function(input) {
                        removeEvent(input.parentNode);
                    });
                }
            })
        });
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // $('span.remove').on('click', function() {
        //     document.querySelectorAll('#events > li > input[type=checkbox]:checked').forEach(function(input) {
        //         removeEvent(input.parentNode);
        //     });
        // });
    }

});