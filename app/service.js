(function(){


function AppService($http, $q ){
    var solutions;
    var wins;
    this. getSolutions = function(){
        solutions = {};
        solutions = $q.defer();
        $http.get('mock/solutions.json')
            .success(function(data){
                solutions.resolve(data);
            })
             .error(function(data){
                solutions.reject(data);
            })
        return solutions.promise;
    }

    this. getWins = function(){
        wins = {};
        wins = $q.defer();
        $http.get('mock/wins.json')
            .success(function(data){
                wins.resolve(data);
            })
             .error(function(data){
                wins.reject(data);
            })
        return wins.promise;
    }


    
}





angular.module('prithiNLP').service("AppService",AppService);


})(angular);