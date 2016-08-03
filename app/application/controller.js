import Ember from 'ember';
import truncateDecimal from 'great-tipper/utils/truncate-decimal';

export default Ember.Controller.extend({
    mealCost: null,
    tipPercentage: 20,
    tipAmount: Ember.computed('mealCost', 'tipPercentage', {
    	get: function() {
    		let mealCost = this.get('mealCost'),
    			tipPercentage = this.get('tipPercentage'),
    			tipAmount = mealCost * (tipPercentage / 100);

    		return truncateDecimal(tipAmount) || 0;
    	}
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

    // when the user clicks a button, the tip percentage is automatically set to that amount
    actions: {
        setTipPercentage: function(value) {
            this.set('tipPercentage', value);
        }
    }

    // Challenge: The user wants to be able to dial in an amount and a tip and save it to an array and see all of their recent meals in a table 
    // (bonus points if you store the data using `localStorage`).
});
