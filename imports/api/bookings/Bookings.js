import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Sessions } from '../sessions/Sessions.js';
import { Vendorslots } from '../vendorslots/Vendorslots.js';
import { Timeslots } from '../timeslots/Timeslots.js';

export const Bookings = new Mongo.Collection('bookings');

BookingsSchema = new SimpleSchema({
    subdate: {
        type: Date,
        label: "Submitted date",
               /*
        autoValue: function() {
            return new Date()
        },
        */
        autoform: {
            type: "hidden"
        },
    },
    custID: {
        type: String,
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    },
    packageID: {
        type: Number,
        label: "package id number"
    },
    jobstatus: {
        type: Number,
        label: "0 = unpaid, 1 = paid, 2 = scheduled, 3 = all sessions completed"
    },
    mc: {
        type: Boolean
    },
    cc: {
        type: Boolean
    },
    timeslot: {
        type: Number
    },
    day: {
        type: String
    }
});

Bookings.attachSchema(BookingsSchema);

Meteor.methods({
    'bookings.pending' (date, package) {
        /*
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        FlowRouter.go('/confirmation');
        */
    },
    'bookings.insert'(date, slot, repeat, mc, cc){
        // handle session generation
        var sess = [];
        // push into array
        // check for weekly schedule
        var y = 0;
        if (repeat) {
            y = 3;
        }

        var error = false;

        for (var x = 0; x <= y; x++) { // generate for 3 more weeks
            if (!error) {
                var newdate = moment(date).add(x, 'weeks').toDate();
                var found = Vendorslots.find({d: newdate, s: slot})
                var onesess = Meteor.call('sessions.createSession',
                        newdate, slot, this.userId, 1, 0, '--');

                if (onesess == null) {
                    // no vendor available for that slot
                    error = true;
                } else {
                    sess.push(onesess);
                }
            } else {
                // catch problem
            }
        }
        // process mattress cleaning and carpet cleaning
        if (!error) {
            var pmc;
            var pcc;
            if (mc == undefined) {
                pmc = false;
            } else {
                pmc = mc;
            }
            if (cc == undefined) {
                pcc = false;
            } else {
                pcc = cc;
            }
            // create doc for booking
            var daystr = moment(date).clone().format('ddd').toLowerCase();
            var doc = {packageID: 1,
                    jobstatus: 1,
                    mc: pmc,
                    cc: pcc,
                    timeslot: parseInt(slot),
                    day: daystr,
                    subdate: new Date()
                  }

            // create booking
            Bookings.insert(doc);

            // get bookingID
            var bookingid = Bookings.findOne(doc)._id;

                sess.forEach(function(each) {
                    // add booking id into session array
                    each.bookingID = bookingid;
                    // add to session Collection
                    Sessions.insert(each);
                    // remove vendorslot
                    Vendorslots.remove({
                        ownerID: each.vendorID,
                        d: each.date,
                        s: each.timeslot
                        });
                });
        } else {
            var able = sess.length;
            var sessword = 'sessions';
            var slotstr = Timeslots.findOne({num: parseInt(slot)}).slot;
            var day = moment(date).format('dddd');
            if (able == 1) {
                var sessword =  'session';
            }

            // TODO: make proper messages.
            var msg = 'We were only able to schedule ' + sess.length +
                ' ' + sessword +
                    ' for the ' + slotstr + ' slot on ' + day + 's. ' +
                    'Do you want to proceed with ' + able +
                    ' scheduled ' + sessword + ' for this booking?' +
                    ' (We will not renew your subscription after.)';
            console.log(msg);

        }

        // LATER:
        // notify vendor


    },
    'bookings.single'(){
        FlowRouter.go('/confirmation');
    },
    'bookings.weekly'(){
        FlowRouter.go('/confirmation');
    },
});
