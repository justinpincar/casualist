define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'models/post',
  'collections/posts',
  'views/news/post',
  'text!templates/news.html',
  'jquery_highlight'
], function ($, _, Backbone, Session, PostModel, PostsCollection, PostView, newsTemplate) {
  var newsView = Backbone.View.extend({
    el: $('.content'),
    events: {
      'click .edit-news-toggle': 'editNewsToggle',
      'click .edit-news-add': 'editNewsAdd'
    },
    initialize: function() {
      this.editable = false;
    },
    render: function () {
      this.$el.html(_.template(newsTemplate));
      $('.navigation li').removeClass("active");
      $('.navigation li.news').addClass("active");

      this.collection = new PostsCollection;
      this.collection.fetch({
        success: function(collection) {
          $('.posts-list').empty();
          collection.each(function(item) {
            var postView = new PostView({model: item});
            $('.posts-list').append(postView.render().el);
          });
        }
      });
    },
    editNewsToggle: function() {
      if (!this.editable) {
        $('*[data-editable]').addClass('editable');
      } else {
        $('*[data-editable]').removeClass('editable');
        $('*[data-editable]').removeAttr('contenteditable');
      }
      $('*[data-editable]').highlight();
      this.editable = !this.editable;
    },
    editNewsAdd: function() {
      var postView = new PostView({model: new PostModel});
      $('.posts-list').prepend(postView.render().el);
    }
  });
  return new newsView;
});

