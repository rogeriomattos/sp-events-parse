const { xmlStringToJSON } = require('../utils/xmlStringToJSON');

/**
 * 
 * @param {object JSON} event 
 */
const createEvent = (event) => {

    if(event.fRecurrence && event.RecurrenceData){
        event.RecurrenceData = xmlStringToJSON(event.RecurrenceData);
    }

    if(event.EndDate){
        event.EndDate =  new Date(event.EndDate);
    }

    if(event.EventDate){
        event.EventDate =  new Date(event.EventDate);
    }

    if(event.Created){
        event.Created =  new Date(event.Created);
    }

    if(event.Modified){
        event.Modified =  new Date(event.Modified);
    }
    
    return event;
};

module.exports = { createEvent };