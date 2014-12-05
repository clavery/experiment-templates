
(function() {

  var Note = Backbone.Model.extend({});

  var Notes = Backbone.Collection.extend({
    model: Note,
    url: '/api/notes',
    parse: function(response) {
      return response.notes;
    }
  });

  var NoteView = Backbone.View.extend({
    tagName:  "li",
    template: _.template($('#noteTemplate').html()),
    events: {
      "click .delete" : "del"
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    del: function(ev) {
      ev.preventDefault();
      this.model.destroy();
    }
  });

  var NoteApp = Backbone.View.extend({
    el: $('#noteApp'),
    initialize: function(notes) {
      this.notes = notes;
      this.listenTo(notes, 'add', this.addOne);
      this.listenTo(notes, 'reset', this.addAll);
    },
    events: {
      "click .btn-primary": "save",
    },
    save: function(ev) {
      ev.preventDefault();
      var title = this.$('#title');
      allNotes.create({title: title.val() });
      title.val('');
    },
    addOne: function(note) {
      var view = new NoteView({model: note});
      this.$("#notesList").append(view.render().el);
    },
    addAll: function() {
      this.notes.each(this.addOne, this);
    },
  });

  var allNotes = new Notes();
  var noteApp = new NoteApp(allNotes);

  allNotes.fetch();
})();
