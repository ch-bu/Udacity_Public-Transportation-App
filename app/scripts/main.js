/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */

(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  var sendAuthentication = function(xhr) {
    xhr.setRequestHeader('Authorization',
      ("Basic ".concat(btoa('16897ba2-c7cf-4a45-8803-fa2f46337f2f'))));
  };

  var StationCollection = Backbone.Collection.extend({
    /*
     * Collection of all stations that exist for
     * given operator.
     *
     */

    // https://api.navitia.io/v1/journeys?from=7.842104%3B47.999008&to=8.682127%3B50.110922&datetime=20160805T160000&

    // Url of endpoint
    url: 'https://api.navitia.io/v1/coverage/de/networks/network%3Adb_regio_ag/stop_points',

    initialize: function() {
      // Bahn API key
      // this.apiKey = '16897ba2-c7cf-4a45-8803-fa2f46337f2f';
    },

    parse: function(response) {
      return response.stop_points;
    },

    byName: function() {
      var filtered = this.filter(function(station) {
        console.log(station.get('name'));
        return station.get('name');
      });

      return filtered;
    }
  });

  var MainView = Backbone.View.extend({
    /*
     * MainView. Displays connections
     *
     */

    el: '#mainview',

    initialize: function() {
      // Init searchbox
      var searchBox = new SearchBox();

      var self = this;

      // Render load bar
      this.renderLoad();

      // Check if station data is in localStorage
      if (localStorage.getItem('stations')) {
        // Add local storage to collection
        stationCollection.add(JSON.parse(localStorage.getItem('stations')));

        // Immediately render searchbox
        searchBox.render();

        // Remove loading ring
        self.$el.html('');
      // Station data not cached
      } else {
        // Get stations
        stationCollection.fetch({

          beforeSend: sendAuthentication,

          // Add parameters to api endpoint
          data: $.param({count: 500})

        }).then(function(response) {
          // Display search box
          searchBox.render();

          // Remove loading ring
          self.$el.html('');

          // Save data in localStorage
          localStorage.setItem('stations',
            JSON.stringify(stationCollection.toJSON()));
        }).catch(function(resp) {
          console.log('Problem');
        });
      }
    },

    renderLoad: function() {
      /*
       * Render progress bar
       */

      // Render search
      this.$el.html(MyApp.templates.loading());
      // return this;
    }

  });

  // Your custom JavaScript goes here
  var HeaderView = Backbone.View.extend({
    /*
     * Header on top of app
     *
     */

    el: 'header',

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(MyApp.templates.header());
      return this;
    }
  });

  var SearchBox = Backbone.View.extend({
    /*
     * Search Box for user input
     *  defines destination where user is and want's to go
     *
     */

    el: '#searchbox',

    events: {
      'click #searchbox_button': 'findConnection'
    },

    initialize: function() {

    },

    render: function() {
      /*
       * Render searchbox
       */

      // Add searchbox
      this.$el.html(MyApp.templates.searchbox({stations:
        stationCollection.toJSON()}));

      // Init select functionality in materialize
      $('select').material_select();

      // Init autocomplete functionality
      $('input.autocomplete').autocomplete({
        data: {
          'Apple': null,
          'Microsoft': null,
          'Google': 'http://placehold.it/250x250'
        }
      });

      console.log(stationCollection.byName());

      return this;
    },

    findConnection: function() {
      /*
       * Searches database for connection and renders
       * connections
       */

      // Get IDs for stations
      var fromInput = this.$el.find('#searchboxFrom').val();
      var fromTo = this.$el.find('#searchboxTo').val();
    }
  });

  // Document is loaded
  $(document).ready(function() {
    var mainView = new MainView();
  });

  // Variable declaration
  var stationCollection = new StationCollection();
  var headerView = new HeaderView();
})();
