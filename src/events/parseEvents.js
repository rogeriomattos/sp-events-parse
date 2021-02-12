const { createEvent } = require('./createEvent');

/**
 * 
 * @param {JSON[]} events 
 * @param {Date} [endDateRecurring = new Date(2025, 0)]
 */

const parseEvents = (events, endDateRecurring = new Date(2025, 0)) => {
    
    let eventsFormated = events.map((item)=> createEvent(item));

    return eventsFormated;
};

module.exports = { parseEvents };