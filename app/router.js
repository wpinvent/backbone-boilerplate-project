define([
  'app',
  'modules/menu',
  'modules/home'
],

function(app, Menu, Home) {

  return Backbone.Router.extend({

    defaultLayout: 'main',

    routes: {
      'about': 'about',
      '*default': 'index'
    },

    index: function(route) {
      this.setViewsAndLayout({
        '.content': new Home.Views.Home({
          model: new Home.Model({
            name: 'world'
          })
        })
      });
      this.render();
    },

    about: function(route) {
      this.setViewsAndLayout({
        '.content': new Home.Views.About({
          model: new Home.Model({
            time: '2012-10-02T12:23:39.037Z'
          })
        })
      });
      this.render();
    },

    go: function() {
      return this.navigate(_.toArray(arguments).join('/'), true);
    },

    render: function() {
      app.layout.render();
    },

    setViewsAndLayout: function(views, selectedItem, layout) {
      layout = layout || this.defaultLayout;
      this.menu.each(function(m) {
        m.set('active', m.get('className') === selectedItem);
      });
      app.useLayout(layout).setViews(_.extend({
        '.menu': new Menu.Views.List({ collection: this.menu })
      }, views));
    },

    initialize: function() {
      this.menu = new Menu.Collection(_($('.menu > li > a')).map(function(el) {
        return { item: el.innerHTML, path: el.href.replace(/^.*\//, ''), className: el.className };
      }));
      this.menu = new Menu.Collection([
        { item: 'Home', path: '/', className: 'home' },
        { item: 'About', path: '/about', className: 'about' }
      ]);
      return this.start && this.start();
    }
  });

});
