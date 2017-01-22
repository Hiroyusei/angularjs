(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.user_input = "";
    $scope.message = "";

    $scope.displayNumItems = function () {
      var items = calcItems($scope.user_input);
      if (items == 1) {
        $scope.message = "Please enter data first."
      } else if (items <= 3) {
        $scope.message = "Enjoy!";
      } else if (items > 3) {
        $scope.message = "Too Much!";
      }
    };

    function calcItems(string) {
      //Get rids of all white spaces
      string = string.replace(/\s/g,"");

      var num = 0;
      var empty = 0; //number of empty items
      var arrayItems = string.split(',');

      //If string is empty, empty++
      for (var i = 0; i < arrayItems.length; i++) {
        if(arrayItems[i].length == 0) {
          empty++;
        }
      }
      num = arrayItems.length - empty;
      return num;
    }
  };


})();
