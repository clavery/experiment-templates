var React = require('react/addons');
var {Required, MinLength} = require('./validation');
var _ = require('underscore');
var cx = React.addons.classSet;

/**
 * Shared field validation functionality for form field components
 */
var FieldValidationMixin = {
  getInitialState() {
    return {
      errors: [],
      dirty: false,
      value: this.props.defaultValue
    };
  },
  validate(value) {
    return results;
  },
  _onChange(event) {
    var errors = _.compact(_.map(this.props.validates, (func) => {
      return func(this.props.name, event.target.value); 
    }));

    this.props.onValidation(this.props.name, errors);

    this.setState({ 
      errors: errors,
      dirty: true,
      value: event.target.value
    });
  },
  getValue() {
    return this.state.value;
  },
  _getClasses() {
    return cx({
      'valid' : !this.state.errors.length,
      'invalid' : !!this.state.errors.length,
      'pristine' : !this.state.dirty,
      'dirty' : this.state.dirty
    });
  }
};

var TextField = React.createClass({
  mixins: [FieldValidationMixin],
  render() {

    return (
      <input className={this._getClasses()} type="text" ref="inputField" 
        onChange={this._onChange} defaultValue={this.props.defaultValue}/>
    );
  }
});

var FormGroup = React.createClass({
  getInitialState() {
    return {
      errors: {}
    };
  },

  _onValidation(name, errors) {
    if (this.state.errors[name] && !errors.length) {
      delete this.state.errors[name];
    } else if (errors.length) {
      this.state.errors[name] = errors;
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
          onValidation={this._onValidation} defaultValue="something"></TextField>
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

var Modal = React.createClass({
  componentDidMount() {
    $(this.getDOMNode()).modal({backdrop: 'static', keyboard: false, show: false});
  },
  componentWillUnmount() {
  },
  open() {
    $(this.getDOMNode()).modal('show');
  },
  close() {
    $(this.getDOMNode()).modal('hide');
  },
  render() {
    return (
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button onClick={this.close}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = {
  FormGroup: FormGroup,
  Modal: Modal
}
