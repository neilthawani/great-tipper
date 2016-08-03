import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',
	classNames: ['btn', 'btn-primary'],

	computedTip: null,
	tipAmount: null,

	click: function() {
		this.send('setTipAmount', amount);
	},
	actions: {
		setTipAmount: function(amount) {
			this.sendAction('setTipAmount', amount);
		}
	}
});