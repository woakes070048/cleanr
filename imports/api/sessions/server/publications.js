/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Sessions } from '../Sessions.js';

Meteor.publish('sessions', function(){
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Sessions.find({});
    } else if (Roles.userIsInRole(this.userId, 'vendor')) {
        return Sessions.find({vendorID: this.userId});
    } else if (Roles.userIsInRole(this.userId, 'customer')) {
        return Sessions.find({custID: this.userId});
    } else {
        this.stop();
        return;
    }
});

