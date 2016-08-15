(function() {
    'use strict';

    angular
        .module('app')
        .controller('Controller', Controller);

    Controller.$inject = [];

    /* @ngInject */
    function Controller() {
        var vm = this;
        vm.title = 'Controller';
        vm.diff = 0;
        vm.incomeList = [];
        vm.incomeSum = 0;

        vm.expenseList = [];
        vm.expenseSum = 0;
        vm.rentSum = 0;

        // Functions
        vm.calculateDiff = calculateDiff;
        vm.calculateIncome = calculateIncome;
        vm.calculateExpense = calculateExpense;
        vm.checkRent = checkRent;

        vm.resetIncome = resetIncome;
        vm.resetExpense = resetExpense;

        activate();

        ////////////////

        function activate() {

        }

        // Update difference between sums
        function calculateDiff() {
            vm.diff = vm.incomeSum - vm.expenseSum;
        }

        // Add to income sum, push to income array
        function calculateIncome() {
            vm.incomeSum += vm.income.amt;
            vm.incomeList.push({
                "des": vm.income.des,
                "amt": vm.income.amt
            });

            checkRent();
            calculateDiff();
            resetIncome();
        }

        // Add to expense sum, push to expense array
        function calculateExpense() {
            vm.expenseSum += vm.expense.amt;
            vm.expenseList.push({
                "des": vm.expense.des,
                "amt": vm.expense.amt
            });

            checkRent();
            calculateDiff();
            resetExpense();
        }

        function checkRent() {
            // Check substring for 'house', 'mortgage', or 'rent'
            var rentTxt = angular.lowercase(vm.expense.des);
            if (rentTxt.indexOf("house") !== -1 ||
                rentTxt.indexOf("rent") !== -1 ||
                rentTxt.indexOf("mortgage") !== -1) {
                vm.rentSum += vm.expense.amt;
            }

            // Check rent against 25% of total income
            var quarterIncome = 0.25 * vm.incomeSum;
            if (vm.rentSum > quarterIncome){
                vm.exceedRentMsg = "User's house, rent, and/or mortgage expenses exceed 25% of income.";
            } else {
                vm.exceedRentMsg = "";
            }
        }

        function resetIncome() {
            // Reset input
            vm.income.des = "";
            vm.income.amt = "";
        }

        function resetExpense() {
            // Reset input
            vm.expense.des = "";
            vm.expense.amt = "";
        }
    }
})();
