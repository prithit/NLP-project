(function(){

function nlpDropdown(){

    return{
        restrict:'E',
        templateUrl:'app/nlp-template.tpl.html',
        scope:{
                defaults: '=',
                selected :'=',
                options:'=',
                onClick:'=',
                text:'@'
        },
        link:nlpLink,
        controller:nlpController,
        replace:false

    }


}

function nlpLink(scope, element, attributes){
  
    if(!_.keys(scope.selected).length){
        scope.selected = angular.copy(scope.defaults);
    }
    scope.options = _.concat(scope.defaults,scope.options);
    
    
}

function nlpController($scope, $element, $uibModal, $timeout){

    $scope.nlpOpenOptions = function(){
        var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'nlpModal.html',
        controller: 'nlpModalCtrl',
        windowClass:'nlp-modal',
        size: 'sm',
        resolve: {
            options: function () {
            return $scope.options;
            },
            text:function(){
                return $scope.text;
            },
            selected:function(){
              return $scope.selected;  
            }
        }
    });

    modalInstance.result.then(function (selectedItem) {
        $scope.onClick(selectedItem);
        });
  
        $timeout(function(){
            
            angular.element(document).find('.nlp-modal .modal-content').css({"margin-top":$element[0].offsetTop, "margin-left":"-40px"});
        })
    }




}


function nlpModalCtrl($scope, $uibModalInstance, options, text, selected){
   
    $scope.options = options;
    $scope.text = text;
    $scope.selected = selected;
    
    $scope.ok = function (index) {
        $uibModalInstance.close($scope.options[index]);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}






angular.module('prithiNLP')
    .directive("nlpDropdown",nlpDropdown)
    .controller("nlpModalCtrl",nlpModalCtrl);
})(angular);