var React = require('react/addons');
var {FormGroup, Modal} = require('./components');

var bootstrap = require('../node_modules/bootstrap/dist/css/bootstrap.css');
var styles = require('./styles.css');

require('bootstrap');

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

  _edit() {
    this.refs.modal.open();
  },

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <button onClick={this.edit}>Edit</button>
            </div>
          </div>

          <Modal ref="modal" title="Foobar">
            <FormGroup onSubmit={this._onSubmit} />
          </Modal>
        </div>
      </div>
    );
  }
});


//debug
global.React = React;

// render into page
React.render(<App />, document.body);

