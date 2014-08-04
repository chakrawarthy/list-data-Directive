//main application
var app = angular.module('myApp', []);
     
//app controller
app.controller('MainController', function($scope){
    //data to be passed to the directive
    $scope.arrayData = ["Master Yoda","Mace Windu","Count Dooku","Admiral Ackbar", "Padme Amidala", "Gamorrean Guards", "C-3P0"];

    $scope.objectData = {
                            character1:{name:"Master", surname:"Yoda"},
                            character2: {name:"Mace",surname:"Windu"},
                            character3: {name:"Count",surname:"Dooku"},
                            character4: {name:"Admiral",surname:"Ackbar"},
                            character5: {name:"Padme",surname:"Amidala"},
                            character6: {name:"Gamorrean",surname:"Guards"},
                            character7: {name:"C",surname:"3PO"}
                        };

    $scope.dataUrl = "data.json";
});

//app directive
app.directive('listData', function($http, $timeout){
    return {
        restrict: 'EA',
        template: '<div id="list-container">'+
                        '<div ng-show="!isDataAvailable">'+
                            '<img src="images/loader.gif">'+
                        '</div>'+
                        '<ul>'+
                            '<li ng-repeat="item in dataList">{{item}}</li>'+
                        '</ul>'+
                    '</div>',
        scope: true,
        replace: true,
        controller: function($scope, $element, $attrs) {

            var dataSrcType = $attrs.from, 
                dataSource;

            if(dataSrcType == "array"){
                dataSource = $scope.arrayData;
                $scope.loadData = loadDataFromObject;
            } else if(dataSrcType == "objects"){
                dataSource = $scope.objectData;
                $scope.loadData = loadDataFromObject;
            } else if(dataSrcType == "server"){
                dataSource = $scope.dataUrl;
                $scope.loadData = loadDataFromUrl;
            }

            function loadDataFromUrl() {
                $scope.isDataAvailable = false;
                $http.get(dataSource)
                .success(function(response){
                    $scope.isDataAvailable = true;
                    $scope.dataList = response;
                })
                .error(function(response){
                    throw Error('Error: unable to fetch the data: '+response);
                });
            }

            function loadDataFromObject() {
                $scope.isDataAvailable = true;
                $scope.dataList = dataSource;
            }
        },
        link: function($scope, $element, $attrs){
            $scope.isDataAvailable = false;
            $scope.loadData();
        }   
    }
});