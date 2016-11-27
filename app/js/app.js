/**
 * Created by Administrator on 2016/11/23.
 */
var myApp = angular.module('myApp', [
    'ui.router',
    'ngResource',
    'tm.pagination']);

myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
        'use strict';

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);
        // $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        $httpProvider.interceptors.push('timeoutHttpIntercept');

        // defaults to login
        $urlRouterProvider.otherwise('main');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        }).state('forgetPwd', {
            url: '/forgetPwd',
            templateUrl: 'views/forget-pwd.html'
        }).state('main', {
            url: '/main',
            templateUrl: 'views/main.html'
        }).state('index.importList', {
            url: '/import/list',
            templateUrl: 'views/import-list.html'
        }).state('index.importDetail', {
            url: '/import/detail',
            templateUrl: 'views/import_detail/import-detail.html'
        }).state('index.exportList', {
            url: '/export/list',
            templateUrl: 'views/export-list.html'
        }).state('index.exportDetail', {
            url: '/export/detail',
            templateUrl: 'views/export_detail/export-detail.html'
        }).state('index.ticketFollow', {
            url: '/ticket/follow',
            templateUrl: 'views/ticket-follow.html'
        }).state('index.singleTicketFollow', {
            url: '/single/ticket/follow',
            params: {containerId: null, orderBill: null},
            templateUrl: 'views/single-ticket-follow.html'
        }).state('index.transitOrder', {
            url: '/transit/order',
            templateUrl: 'views/transit-order.html'
        }).state('index.billInquiry', {
            url: '/bill/inquiry',
            templateUrl: 'views/bill-inquiry.html'
        }).state('index.companyAddress', {
            url: '/company/address',
            templateUrl: 'views/company-address.html'
        })
    }]);

angular.module('myApp').factory('timeoutHttpIntercept', function ($rootScope, $q) {
    return {
        'request': function (config) {
            // config.timeout = 60000;
            //config.headers.userName = $.cookie('userName');
            //config.headers.token = $.cookie('userToken');
            return config;
        },
        responseError: function(err){
            if(-1 === err.status) {
                // 远程服务器无响应
            } else if(500 === err.status) {
                // 处理各类自定义错误
            } else if(400 === err.status) {
                // ...
            } else if(501 === err.status) {
                // ...
            }
            return $q.reject(err);
        }
    }
});

