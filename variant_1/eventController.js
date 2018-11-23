$(function() {

    const ENTER_KEY = 13;

    $('#addNewEvent').hide();

    $('#addEvent').on('click', function() {
        $('#addNewEvent').show(1000);
    });

    function removeEvent(element) {
        var li = element;
        var id = li.id;
        eventList.removeEvent(id);
        li.parentNode.removeChild(li);
    }

    document.getElementById('newEvent').addEventListener('keypress', function() {
        if (event.keyCode == ENTER_KEY) {
            var value = this.value;
            if (value.trim().length == 0) return;
            var id = eventList.addEvent(value);


            var li = document.createElement('li');
            li.id = id;
            li.innerHTML = '<input id="checkbox" type="checkbox" /> <span>' + value + '</span><span class ="remove"> &times; Remove Event</span>';
            $('#events').append(li);
            this.value = '';

            $('span.remove').on({
                mouseenter: function() {
                    $(this).css("background-color", "coral");
                    $(this).css("color", "white");
                },
                mouseleave: function() {
                    $(this).css("background-color", "white");
                },

            });

            //__________________________________________________
            var checkbox = li.children[0];
            checkbox.addEventListener('click', function() {
                var li = this.parentNode;
                var id = li.id;
                eventList.toggleEvent(id);

                if (this.checked == true)
                    li.children[1].style.textDecoration = 'line-through';
                else
                    li.children[1].style.textDecoration = 'none';
            });

            var deleteButton = li.children[2];
            deleteButton.addEventListener('click', function() {
                removeEvent(this.parentNode);
            });




            $('span.remove').on('click', function() {
                document.querySelectorAll('#events > li > input[type=checkbox]:checked').forEach(function(input) {
                    removeEvent(input.parentNode);
                });
            });

        }

    });


});