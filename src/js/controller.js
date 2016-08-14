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

        // Functions
        vm.calculateDiff = calculateDiff;
        vm.calculateIncome = calculateIncome;
        vm.calculateExpense = calculateExpense;
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

            resetIncome();
            calculateDiff();

        }

        // Add to expense sum, push to expense array
        function calculateExpense() {
            vm.expenseSum += vm.expense.amt;
            vm.expenseList.push({
                "des": vm.expense.des,
                "amt": vm.expense.amt
            });

            resetExpense();
            calculateDiff();
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
