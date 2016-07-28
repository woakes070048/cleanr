import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Weeks = new Mongo.Collection('weeks');

Weeks.allow({
    // if userId exists, means we are signed in, and able to insert
    insert: function(userId, doc) {
        return !!userId;
    }
});

DaySchema = new SimpleSchema({
    d: {
        type: String
    },
    free: {
        type: Number
    }
});
TimeslotsSchema = new SimpleSchema({
    slot: {
        type: String
    },
    days: { 
        type: [DaySchema]
    }
});


WeeksSchema = new SimpleSchema({
    mondayDate: {
        type: Date
    },
    timeslots: {
        type: [TimeslotsSchema]
    }
});

Weeks.attachSchema(WeeksSchema);

