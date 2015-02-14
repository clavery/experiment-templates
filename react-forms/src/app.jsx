var React = require('react/addons');
var {Required, MinLength} = require('./validation');
var _ = require('underscore');


var styles = require('./styles.css');
var cx = React.addons.classSet;

/**
 * Common on change functionality that reports validation
 * state to parent container
 */
var ValidatesOnChangeMixin = {
  getInitialState() {
    return { errors: [], dirty: false, value: '' };
  },
  _onChange(event) {
    var results = _.compact(_.map(this.props.validates, (func) => {
      return func(this.props.name, event.target.value); 
    }));

    this.setState({ 
      errors: results,
      dirty: true,
      value: event.target.value
    });

    if (results.length) {
      this.props.onValidation(this.props.name, false, results);
    } else {
      this.props.onValidation(this.props.name, true);
    }
  },
  getValue() {
    return this.state.value;
  }
};

var TextField = React.createClass({
  mixins: [ValidatesOnChangeMixin],
  render() {

    var classes = cx({
      'valid' : !this.state.errors.length,
      'invalid' : !!this.state.errors.length,
      'pristine' : !this.state.dirty,
      'dirty' : this.state.dirty
    });

    return (
      <input className={classes} type="text" ref="inputField" onChange={this._onChange} />
    );
  }
});

var FormGroup = React.createClass({
  getInitialState() {
    return {
      errors: {}
    };
  },

  _onValidation(name, isValid, messages) {
    if (this.state.errors[name] && isValid) {
      delete this.state.errors[name];
    } else if (!isValid) {
      this.state.errors[name] = messages;
    }
    this.setState({errors: this.state.errors});
  },

  _onSubmit(event) {
    if (_.keys(this.state.errors).length === 0) {
      var result = _.object(_.map(this.refs, (ref, name) => [name, ref.getValue()]));
      this.props.onSubmit(result);
    }
  },

  render() {
    return (
      <div>
        <ErrorMessages errors={this.state.errors} />

        <TextField name="Foo" ref="Foo" validates={[Required()]} 
          onValidation={this._onValidation}></TextField>
        <br/>
        <TextField name="Bar" ref="Bar" validates={[Required(), MinLength(10)]} 
          onValidation={this._onValidation}></TextField>
        <br/>

        <input type="submit" onClick={this._onSubmit} />
      </div>
    );
  }
});

var ErrorMessages = React.createClass({
  render() {
    var errorList = _.map(this.props.errors, (errors, name) => {
      return (<li key={name}>{errors.join(', ')}</li>);
    });

    return (
      <ul>
        {errorList}
      </ul>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  _onSubmit(result) {
    console.log("VALID FORM SUBMISSION");
    console.log(result);
  },

  render() {
    return (
      <FormGroup onSubmit={this._onSubmit} />
    );
  }
});



//debug
global.React = React;

// render into page
React.render(<App />, document.body);

