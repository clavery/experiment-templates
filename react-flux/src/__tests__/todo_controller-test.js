// need to not mock the unit under test
// plus any functions/objects used to create objects
// (i.e. util.ktov, EventEmitter and assign())
jest.dontMock('../todo_controller');
jest.dontMock('../util');
jest.dontMock('events');
jest.dontMock('object-assign');

var TodoStore;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('TodoController', function() {
  var TodoStore = require('../stores/todo');
  var TodoController = require('../todo_controller');

  beforeEach(function() {
  });

  it('Should register with the TodoStore', function() {
    var instance = TestUtils.renderIntoDocument(<TodoController />);

    expect(instance).toBeDefined();
    expect(TodoStore.addChangeListener).toBeCalled();
  });
});
