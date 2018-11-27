var eventList = (function() {

    Event.nextId = 0;

    function Event(date, text) {
        this.id = ++Event.nextId;
        this.date = date;
        this.text = text;
        this.eventLink = "https://www.google.com/";
        this.isCompleted = false;
    }

    function EventList() {
        this.events = [];
        // if (localStorage.getItem('events') != null) {
        //     //if i have events in the browser, i take them
        //     this.events = JSON.parse(localStorage.getItem('events'));
        // } else {
        //     this.events = [];
        // }
    }

    EventList.prototype.addEvent = function(date, text) {
        // console.log("DATE: " + date);
        var dateSplit = date.split('-');
        var eventDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        var newEvent = new Event(eventDate, text);
        this.events.push(newEvent);
        // localStorage.setItem('events', JSON.stringify(this.events));
        return newEvent.id;
    }

    EventList.prototype.getEvents = function() {
        var calendarEvents = [];
        this.events.forEach(element => {
            calendarEvents.push({ 'Date': element.date, 'Title': element.text, 'Link': element.eventLink });
        });

        return calendarEvents;
    }

    EventList.prototype.removeEvent = function(id) {
        var index = this.events.findIndex((event) => event.id == id);
        if (index < 0) {
            //cannot find
            throw new Error('There is no such event in your event list' + "for the day" + id);
        } else {
            this.events.splice(index, 1);
            //localStorage.setItem('events', JSON.stringify(this.events));
        }
    }

    EventList.prototype.toggleEvent = function(id) {
        var index = this.events.findIndex(event => event.id == id);

        if (index < 0) {
            throw new Error('No such todo with id ' + id);
        } else {
            this.events[index].isCompleted = !this.events[index].isCompleted;
            //localStorage.setItem('events', JSON.stringify(this.events));
        }
    }

    EventList.prototype.removeCompleted = function() {
        this.events = this.events.filter(event => !event.isCompleted); //filter returns new array

    }

    return new EventList();
})();