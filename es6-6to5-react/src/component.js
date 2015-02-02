import React from 'react';
import _ from 'underscore';


var LIFECYCLE_EVENTS = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
];

/**
 * React component base class that implements react-lifecycle
 * compatible mixins methods.
 */
export default class Component extends React.Component {

  constructor() {
    var mixins = this.constructor.mixins;

    if (mixins) {
      mixins.forEach( (mixin) => {
        for (var prop in mixin) {
          console.log(prop);

          if (LIFECYCLE_EVENTS.indexOf(prop) >= 0) {
            var ownEvent = this[prop];
            var events = this[prop] && this[prop]._events ? this[prop]._events : [];

            if (!events.length) {
              if (ownEvent) {
                events.unshift(ownEvent);
              }

              // replace/add the lifecycle event on the target class
              // and call all mixed in events first in list order
              () => {
                var _prop = prop;
                this[_prop] = () => {
                  var args = arguments;
                  return _.every(this[_prop]._events.map((event) => {
                    return event.apply(this, args);
                  }));
                };
              }();

              this[prop]._events = events;
            }

            events.unshift(mixin[prop]);
          } else if (this[prop]) {
            // non-lifecycle events must be unique (render, etc)
            throw `Cannot mixin existing method ${prop}`;
          } else {
            // otherwise simply mix method
            this[prop] = mixin[prop].bind(this);
          }
        }
      });
    }
  }
}
