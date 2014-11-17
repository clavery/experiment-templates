(function() {

  var BackboneMixin = {
    componentDidMount: function () {
      this.getBackboneCollections().forEach(function (collection) {
        collection.on('add remove change', this.forceUpdate.bind(this, null));
      }, this);
    },
    componentWillUnmount: function () {
      this.getBackboneCollections().forEach(function (collection) {
        collection.off(null, null, this);
      }, this);
    }
  };

  var Person = Backbone.Model.extend({
    idAttribute: "_id",
    defaults: {
      name: ''
    }
  });

  var People = Backbone.Collection.extend({
    model: Person,
    url: 'json/people.json'
  });

  var people = new People();

  var PeopleWidget = React.createClass({
    mixins: [BackboneMixin],
    getBackboneCollections: function () {
      return [this.props.people];
    },
    render: function() {
      return  (
        <ul>
          {this.props.people.map(function(person, i){
            return <li key={person.id}>{i} Person {person.get('name')}</li>
          })}
        </ul>
      );
    }
  });

  React.render(
    <PeopleWidget people={people} />,
    document.getElementById('app')
  );

  people.fetch();
})();
