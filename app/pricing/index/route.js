import AbstractIndexRoute from 'hospitalrun/routes/abstract-index-route';
import Ember from 'ember';
export default AbstractIndexRoute.extend({
    category: null,
    modelName: 'pricing',
    pageTitle: 'All Pricing Items',    
        
    _getStartKeyFromItem: function(item) {
        var category = this.get('category'),
            keyPrefix = this.get('keyPrefix'),
            name = this.get('name'),
            type = this.get('type');
        return [category, name, type, keyPrefix+item.get('id')];        
    },
    
    _modelQueryParams: function() {
        var category = this.get('category'),
            keyPrefix = this.get('keyPrefix'),
            maxValue = this.get('maxValue'),
            queryParams = {
                options: {
                    startkey: [category, null, null, keyPrefix],
                    endkey: [category, maxValue, maxValue, keyPrefix+maxValue]
                },
                mapReduce: 'pricing_by_category'
            };
        if (Ember.isEmpty(category)) {
            queryParams.options.endkey[0] = maxValue;
        }
        return queryParams;
    }    
});