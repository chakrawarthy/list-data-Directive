//test suite
describe(" list-data directive test suite", function() {
    var element;
    var $scope;
    
    //inject the app
    beforeEach(module("myApp"));
    
    //inject dependencies
    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        
        $scope = $rootScope.$new();
        //array data
        $scope.arrayData = ["Mater Yoda","Mace Windu","Count Dooku","Admiral Ackbar", "Padme Amidala", "Gamorrean Guards", "C-3P0"];
        //object data
        $scope.objectData = {
                            character1:{name:"Master", surname:"Yoda"},
                            character2: {name:"Mace",surname:"Windu"},
                            character3: {name:"Count",surname:"Dooku"},
                            character4: {name:"Admiral",surname:"Ackbar"}
                        };
        //data url
        $scope.dataUrl = 'data.json';
        
        //http mock
        $httpBackend.when('GET', 'data.json')
                    .respond({"justin":{"name":"Justin", "occupation":"Singer"},
                                "sherlock":{"name": "Sherlock", "occupation": "detective"},
                                "harvey":{"name":"Harvey Specter", "occupation": "lawyer"}});
        
    }));

    //test the directive with data-from mode set to 'array'
    it(' with data source as array, should have 7 <li> elements', function() {
        //get the element
        element = $compile("<div list-data data-from='array'></div>")($scope);
        
        $scope.$digest();
        
        //test criteria
        expect(element.find('ul').find('li').length).toBe(7);
    });
    
    //test the directive with data-from mode set to 'objects'
    it(' with data source as object, should have 4 <li> elements', function() {
        //get the element
        element = $compile("<div list-data data-from='objects'></div>")($scope);
        
        $scope.$digest();
        
        //test criteria
        expect(element.find('ul').find('li').length).toBe(4);
    });
    
    //test the directive with data-from mode set to 'server'
    it(' with data source from url, should have 3 <li> elements', function() {
        //get the element
        element = $compile("<div list-data data-from='server'></div>")($scope);
        
        //get the http response
        $httpBackend.flush();
        
        $scope.$digest();
        //test criteria
        expect(element.find('ul').find('li').length).toBe(3);
    });
});