var eventList = (function() {

    Event.nextId = 0;

    function Event(text) {
        this.id = ++Event.nextId;
        this.text = text;
        this.isCompleted = false;
    }

    function EventList() {
        if (localStorage.getItem('events') != null) {
            //if i have events in the browser, i take them
            this.events = JSON.parse(localStorage.getItem('events'));
        } else {
            this.events = [];
        }
    }

    EventList.prototype.addEvent = function(text) {
        var newEvent = new Event(text);
        this.events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(this.events));

        return newEvent.id;
    }

    EventList.prototype.removeEvent = function(id) {
        var index = this.events.findIndex((event) => event.id == id);
        if (index < 0) {
            //cannot find
            throw new Error('There is no such event in your event list' + "for the day" + id);
        } else {
            this.events.splice(index, 1);
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