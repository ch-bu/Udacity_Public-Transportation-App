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

  // http://download-data.deutschebahn.com/static/apis/fahrplan/Fpl-API-Doku-Open-Data-BETA-0_81_2.pdf

  var StationModel = Backbone.Collection.extend({
      
    url: 'https://open-api.bahn.de/bin/rest.exe/location.name?lang=de&format=json',

    initialize: function() {
      // Bahn API key
      this.apiKey = 'DBhackFrankfurt0316';
    }

  });

  var MainView = Backbone.View.extend({

    el: '#mainview',

    initialize: function() {
    },

    renderLoad: function() {
      /*
       * Render progress bar
       */

      // Find stations
      stationModel.fetch({

        dataType: 'json',

        data: $.param({authKey: stationModel.apiKey, input: 'Ulm'})

      }).then(function() {
        console.log("yeah");
      }).catch(function() {
        console.log("there was an error");
      });

      // Render search
      this.$el.html(MyApp.templates.loading());
      // return this;
    }

  });

  // Your custom JavaScript goes here
  var HeaderView = Backbone.View.extend({

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
    el: '#searchbox',

    events: {
      'click #searchbox_button': 'findConnection'
    },

    initialize: function() {
      this.render();

    },

    render: function() {
      /*
       * Render searchbox
       */

      this.$el.html(MyApp.templates.searchbox());
      return this;
    },

    findConnection: function() {
      /*
       * Searches database for connection and renders
       * connections
       */

      // Get input variables
      var fromInput = this.$el.find('.searchbox_from').val().trim();
      var toInput = this.$el.find('.searchbox_to').val().trim();

      // Connections can only be found when from and to destination
      // are specified
      if (!fromInput || !toInput) {
        console.log('some value is missing');
      } else {
        // Load progress bar in mainview
        mainView.renderLoad();
      }
    }
  });

  var mainView = new MainView();
  var headerView = new HeaderView();
  var searchBox = new SearchBox();
  var stationModel = new StationModel();

})();
