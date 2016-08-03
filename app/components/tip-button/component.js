import Ember from 'ember';
import truncateDecimal from 'great-tipper/utils/truncate-decimal';

export default Ember.Component.extend({
	tagName: 'button',
	classNames: ['btn', 'btn-primary'],

	mealCost: null,
	tipPercentage: null,

    // preset calculations for 15%, 18%, and 20% tips
    // automatic calculations for 15%, 18%, and 20%.
    // When the user enters an amount for the cost of the meal, they should automatically see these three values.
	tipAmount: Ember.computed('mealCost', 'tipPercentage', {
    	get: function() {
    		let mealCost = this.get('mealCost'),
    			tipPercentage = this.get('tipPercentage'),
    			tipAmount = mealCost * (tipPercentage / 100);

    		return truncateDecimal(tipAmount) || 0;
    	}
    }),

	click: function() {
		this.send('setTipPercentage', this.get('tipPercentage'));
	},
	actions: {
		setTipPercentage: function(value) {
			this.sendAction('setTipPercentage', value);
		}
	}
});