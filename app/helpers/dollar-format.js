import Ember from 'ember';

export function dollarFormat(params, namedArgs) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    return formatter.format(params[0]);
}

export default Ember.Helper.helper(dollarFormat);