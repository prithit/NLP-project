(function(){


function AppController($scope, AppService){

    $scope.solutionsArray=[];
    $scope.winsArray=[];
    $scope.industryOptions = [];
    $scope.productOptions = [];
    

    AppService.getSolutions().then(getSolutionsSuccessFn, getSolutionsErrorFn);
    
    AppService.getWins().then(getWinsSuccessFn, getWinsErrorFn);

    function getSolutionsSuccessFn(response){
        $scope.solutionsArray = _.concat([], response);
    }
    
    function getSolutionsErrorFn(response){
        
        console.log(response);
    }

     function getWinsSuccessFn(response){
        $scope.winsArray = _.concat([], response);
    }

     function getWinsErrorFn(response){
        console.log(response);
    }

    $scope.solutionSet = [{"value":"solutions","text":"Solutions"},{"value":"wins","text":"Wins"}]

    $scope.nlpdefaults = {
        solutions : {
                        value:"",
                        text:"Solution"
        },
        industry : {
                        value:"",
                        industry:"industry"
        },
        product : {
                        value:"",
                        product:"product"
        }
    }

     $scope.nlpselected = {
        solutions : {  },
        industry : {  },
        product : {  }
    }

    $scope.onSolutionSelect = function(selectedItem){
       $scope.nlpselected.solutions = selectedItem;
       $scope.productOptions = [$scope.nlpdefaults.product];
       $scope.industryOptions = [$scope.nlpdefaults.industry];
       $scope.nlpselected.industry = $scope.nlpdefaults.industry;
        $scope.nlpselected.product = $scope.nlpdefaults.product;
           
       if(selectedItem.text.toLowerCase() == 'solutions'){
           setIndustryOptions(_.uniq(_.map($scope.solutionsArray, 'industry')))
       }
       else if(selectedItem.text.toLowerCase() == 'wins'){
           setIndustryOptions(_.uniq(_.map($scope.winsArray, 'industry')));
       }
    }
    $scope.onIndustrySelect = function(selectedIndustry){
        $scope.productOptions = [$scope.nlpdefaults.product];
         $scope.nlpselected.product = $scope.nlpdefaults.product;
       $scope.nlpselected.industry = selectedIndustry;
       if($scope.nlpselected.solutions.text.toLowerCase() == 'solutions'){
           setProductOptions(_.map(_.filter($scope.solutionsArray, function(option){
            return option.industry == selectedIndustry.industry;
        }), 'product'));
        }
        else if($scope.nlpselected.solutions.text.toLowerCase() == 'wins'){
            setProductOptions( _.map(_.filter($scope.winsArray, function(option){
            return option.industry == selectedIndustry.industry;
        }), 'product'));
        }
       
    }
    $scope.onProductSelect = function(selectedItem){
       $scope.nlpselected.product = selectedItem;
    }

    function setIndustryOptions (options){
        $scope.industryOptions = [$scope.nlpdefaults.industry];
        _.each(options, function(option){
            $scope.industryOptions.push({industry:option, value:option})
        })
    }

    function setProductOptions(options){
      $scope.productOptions = [$scope.nlpdefaults.product];
        _.each(options, function(option){
            $scope.productOptions.push({product:option, value:option})
        })
        

    }
    
    
}





angular.module('prithiNLP').controller("AppController",AppController);


})(angular);