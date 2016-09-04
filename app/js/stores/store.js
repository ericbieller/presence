var Flux = require('delorean').Flux;
var _ = require('underscore');

module.exports = function(definition) {
  return Flux.createStore(_.extend({

    initialize: function() {

    },

    clearState: function() {
      // if we have a schema then reset to defaults
      if (this.scheme) {
        var props = {};
        _.each(Object.keys(this.scheme), function(key) {
          props[key] = this.scheme[key].default;
        }.bind(this));
  
        this.set(props);
  
      // otherwise, just empty the store state
      } else {
        this.state = {};
        this.emit('change');
      }

      return this;
    },
    
    where: function(props) {
      return _.where(this.state, props);
    },
  
    update: function(id, props) {
      // allows passing all parameters as an object in first parameter
      if (id && typeof id == 'object') {
        props = _.clone(id);
        id = props.id;
      }
      
      this.state[id] = _.extend((this.state[id] || {}), props);
      this.emit('change');
      return this.state[id];
    },
    
    push: function(id, prop, value) {
      var item = this.get(id);
      var existing = item && item[prop];
      var props = {};
      if (existing) {
        item[prop].push(value);
      } else {
        props[prop] = [value];
      }
      
      this.update(id, props);
    }
  }, definition));
};