import Ember from 'ember';

export default Ember.Controller.extend({
    mealCost: null,
    tipPercentage: 20,
    tipAmount: Ember.computed('mealCost', 'tipPercentage', function() {
    		let mealCost = this.get('mealCost'),
    			tipPercentage = this.get('tipPercentage'),
    			tipAmount = mealCost * (tipPercentage / 100);

    		return this.truncateDecimal(tipAmount);
    }),
    totalAmount: Ember.computed('mealCost', 'tipAmount', {
        get: function() {
        	let mealCost = parseFloat(this.get('mealCost'), 2),
        		tipAmount = this.get('tipAmount');

            return mealCost + tipAmount || 0;
        }
    }),

    // observes the tip price and displays a message when someone is being a cheapskate
    isSomeoneBeingACheapSkate: Ember.computed('tipPercentage', {
        get: function() {
            if (this.get('tipPercentage') < 15) {
                return true;
            }
        }
    }),

    // preset calculations for 15%, 18%, and 20% tips
    // automatic calculations for 15%, 18%, and 20%.
    // When the user enters an amount for the cost of the meal, they should automatically see these three values.
    truncateDecimal: function(value) {
        return Math.round(value * 100) / 100;
    },
    fifteenPercentTip: Ember.computed('mealCost', {
        get: function() {
            let mealCost = this.get('mealCost');
            return this.truncateDecimal(mealCost * 0.15);
        }
    }),
    eighteenPercentTip: Ember.computed('mealCost', {
        get: function() {
            let mealCost = this.get('mealCost');
            return this.truncateDecimal(mealCost * 0.18);
        }
    }),
    twentyPercentTip: Ember.computed('mealCost', {
        get: function() {
            let mealCost = this.get('mealCost');
            return this.truncateDecimal(mealCost * 0.20);
        }
    }),

    // when the user clicks a button, the tip percentage is automatically set to that amount
    actions: {
        setTipAmount: function(value) {
            let tipAmount = 0;
            switch (value) {
                case (15):
                    tipAmount = this.get('fifteenPercentTip');
                    break;
                case (18):
                    tipAmount = this.get('eighteenPercentTip');
                    break;
                case (20):
                    tipAmount = this.get('twentyPercentTip');
                    break;
                default:
                    break;

            }

            this.set('tipAmount', tipAmount);
        }
    }

    // Challenge: The user wants to be able to dial in an amount and a tip and save it to an array and see all of their recent meals in a table 
    // (bonus points if you store the data using `localStorage`).
});
