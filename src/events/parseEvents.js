const { createEvent } = require('./createEvent');
const { createRecurringEvents } = require('../recurring/createRecurringEvents');

/**
 * 
 * @param {JSON[]} events 
 * @param {Date} [endDateRecurring = new Date(2025, 0)]
 */

const parseEvents = (events, endDateRecurring = new Date(2025, 0)) => {
    
    let eventsFormated = events.map((item)=> createEvent(item));

    let eventsWithRuleRecurring = events.filter(({fRecurrence, RecurrenceData}) => fRecurrence && RecurrenceData);

    eventsWithRuleRecurring.forEach((item)=>{
        eventsFormated = eventsFormated.concat(createRecurringEvents(item));
    });

    return eventsFormated;
};

module.exports = { parseEvents };