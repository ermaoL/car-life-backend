/**
 * Created by Administrator on 2016/11/25.
 */
angular.module('carlife.sideBarCtrl', []).controller('sideBarCtrl', ['$scope', function($scope) {

}]);

myApp.controller('TestController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.expanders = [{
        title: 'Click me to expand',
        text: 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title: 'Click this',
        text: 'I am even better text than you have seen previously'
    }, {
        title: 'Test',
        text: 'test'
    }];
}]);

myApp.directive('accordion', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        controller: function() {
            var expanders = [];
            this.gotOpened = function(selectedExpander) {
                angular.forEach(expanders, function(expander) {
                    if (selectedExpander != expander) {
                        expander.showMe = false;
                    }
                });
            };
            this.addExpander = function(expander) {
                expanders.push(expander);
            };
        }
    };
});

myApp.directive('expander', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?accordion',
        scope: {
            expanderTitle: '='
        },
        template: '<div>' + '<div class="ex-title" ng-click="toggle()">{{expanderTitle}}</div>' + '<div class="ex-body" ng-show="showMe" ng-transclude></div>' + '</div>',
        link: function(scope, iElement, iAttrs, accordionController) {
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            };
        }
    };
});