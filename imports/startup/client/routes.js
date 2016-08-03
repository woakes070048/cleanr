import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// if you have the js file you don't need the html file????? see input. not imported
import '../../ui/layouts/Account.html';
import '../../ui/layouts/Account.js';
import '../../ui/layouts/Footer.html';
import '../../ui/layouts/Header.html';
import '../../ui/layouts/Header.js';
import '../../ui/layouts/HomeLayout.html';
import '../../ui/layouts/Input.js';
import '../../ui/layouts/Login.html';
import '../../ui/layouts/MainLayout.html';
import '../../ui/layouts/Schedule.html';
import '../../ui/layouts/Schedule.js';
import '../../ui/layouts/Confirmation.html';
import '../../ui/layouts/Confirmation.js';
import '../../ui/layouts/Signup.html';
import '../../ui/layouts/VendorCP.html';
import '../../ui/layouts/VendorCP.js';
import '../../ui/layouts/VendorRegistration.html';
import '../../ui/layouts/VendorRegistration.js';
import '../../ui/layouts/VendorWorkSchedule.html';
import '../../ui/layouts/VendorWorkSchedule.js';
// need to import the js file, for subscriptions

import '../../ui/components/jobitem.html';

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout')
    }
});

FlowRouter.route('/input', {
    name: 'input',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Input'})
    }
});

FlowRouter.route('/account', {
    name: 'account',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Account'})
    }
});

FlowRouter.route('/confirmation', {
    name: 'confirmation',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Confirmation'})
    }
});

FlowRouter.route('/schedule', {
    name: 'schedule',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Schedule'})
    }
});

FlowRouter.route('/vendorcp', {
    name: 'vendorcp',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorCP'})
    }
});

FlowRouter.route('/vendorregistration', {
    name: 'vendorregistration',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorRegistration'})
    }
});
FlowRouter.route('/vendorworkschedule', {
    name: 'vendorworkschedule',
    action() {
        BlazeLayout.render('MainLayout', {main: 'VendorWorkSchedule'})
    }
});
