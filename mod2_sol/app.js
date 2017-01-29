(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService); //custom service

//ToBuyController
ToBuyController.$inject = ['ShoppingListCheckOffService']; //inject custom service into controller
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this; //for convenience, toBuyList now refers to this specific instance of the controller

  //returns the toBuyList
  toBuyList.items = ShoppingListCheckOffService.getToBuyList();

  //calls the buy function in the service
  //catch error if list is empty
  toBuyList.buy = function (itemIndex) {
  try {
      ShoppingListCheckOffService.buy(itemIndex);
  } catch (error) {
      toBuyList.errorMessage = error.message;
  };
  }
}

//AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  //check if boughtList is empty, used in ng-if to display msg
  boughtList.isEmpty = function (){
    return ShoppingListCheckOffService.isEmpty();
  }

  boughtList.items = ShoppingListCheckOffService.getBoughtList();
}

function ShoppingListCheckOffService () {
  var service = this;
  var empty = true; //refers to the toyBuyList

  var toBuyList = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Banana",
      quantity: "6"
    }
  ];

  var boughtList = [];

  service.buy = function (itemIndex) {
    //Remove from buylist and add to boughtlist
      var temp = toBuyList[itemIndex];
      toBuyList.splice(itemIndex, 1); //remove at itemIndex, 1 element
      boughtList.push(temp);

      //if no more items, throw error
      if (toBuyList.length === 0) {
        throw new Error("Everything is bought!");
      } else {
        empty = false;
      }
  };

  //getter functions
  service.getBoughtList = function () {
    return boughtList;
  };

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.isEmpty = function() {
    return empty;
  }
}

}) ();
