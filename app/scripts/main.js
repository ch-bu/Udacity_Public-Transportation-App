(function(Backbone, $, MyApp, Handlebars) {
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

      // registration.addEventListener('updatefound', function() {
      //   registration.installing.addEventListener('statechange', function() {
      //     if (this.state == 'installed') {
      //       console.log('there is an update ready');
      //     }
      //   });
      // });
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
                console.log('installed');
                $('#modal1').openModal();
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;
              case 'activated':
                console.log('activated');
                break;
              case 'activating':
                console.log('activating');
                break;
              case 'redundant':
                console.log('redundant');
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
      ('Basic '.concat(btoa('16897ba2-c7cf-4a45-8803-fa2f46337f2f'))));
  };

  /*
   * Handlebars helper
   */
  Handlebars.registerHelper('myDate', function(date) {
    return date.replace(
      /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})/, '$4:$5');
  });

  Handlebars.registerHelper('minToHours', function(min) {
    var hours = Math.floor(parseFloat(min) / 60 / 60);
    var minutes = Math.ceil((min / 60) % 60);
    return hours + 'h ' + minutes + ' min';
  });

  Handlebars.registerHelper('ifvalue', function(conditional, options) {
    if (conditional === options.hash.equals) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  /*
   * Open database
   */
  var dbPromise = idb.open('transportationApp', 1, function(upgradeDB) {
    upgradeDB.createObjectStore('journeys');
  });

  // Document is loaded
  $(document).ready(function() {
    var StationCollection = Backbone.Collection.extend({
      /*
       * Collection of all stations that exist for
       * given operator.
       *
       */

      // Url of endpoint
      url: 'https://api.navitia.io/v1/coverage/de/networks/network%3Adb_regio_ag/stop_points',

      initialize: function() {
      },

      parse: function(response) {
        return response.stop_points;
      },

      byName: function() {
        // Return Object with name as key and null as value

        var stations = {};

        // Build stations object
        this.each(function(x) {
          stations[x.get('name')] = null;
        });

        return stations;
      }
    });

    var JourneyModel = Backbone.Model.extend({
      /*
       * Journey from to another destination
       */

      url: 'https://api.navitia.io/v1/journeys',

      parse: function(response) {
        return response.journeys;
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
      },

      renderLoad: function() {
        /*
         * Render progress bar
         */

        // Render search
        this.$el.html(MyApp.templates.loading());
        // return this;
      },

      emptyView: function() {
        this.$el.html('');
      },

      renderJourney: function(jsonData) {
        // Check if json data is empty
        if ($.isEmptyObject(jsonData)) {
          this.$el.html(MyApp.templates.journey());
        } else {
          this.$el.html(MyApp.templates.journey({journey: jsonData}));

          // Inititialize accordion functionality
          $('.collapsible').collapsible({
            accordion: false
          });
        }
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

      render: function(jsonData, stationData) {
        /*
         * Render searchbox
         */

        // Add searchbox
        this.$el.html(MyApp.templates.searchbox({stations:
          jsonData}));

        // Init select functionality in materialize
        $('select').material_select();

        // Init autocomplete functionality
        $('input.autocomplete').autocomplete({
          data: stationData
        });

        return this;
      },

      findConnection: function() {
        /*
         * Searches database for connection and renders
         * connections
         */

        var self = this;

        // Get IDs for stations
        var fromInput = this.$el.find('#autocomplete-input-from').val();
        var toInput = this.$el.find('#autocomplete-input-to').val();
        var connection = fromInput.concat(toInput);

        // Get coordinates
        var fromModel = applicationView.stationCollection.find(function(model) {
          return model.get('name') === fromInput;
        }).get('coord');
        var toModel = applicationView.stationCollection.find(function(model) {
          return model.get('name') === toInput;
        }).get('coord');

        // Concat coordinates for api url
        var fromCoord = fromModel.lon.concat(';', fromModel.lat);
        var toCoord = toModel.lon.concat(';', toModel.lat);

        // Render loading in main view
        applicationView.mainView.renderLoad();

        // Check if connection has been cached
        dbPromise.then(function(db) {
          var tx = db.transaction('journeys');
          var journeyStore = tx.objectStore('journeys');

          return journeyStore.get(connection);
        }).then(function(response) {
          // Data has not been cached
          if (response === undefined) {
            // Fetch journey
            applicationView.journeyModel.fetch({

              // Send api-key with request
              beforeSend: sendAuthentication,

              // Add parameters to api endpoint
              data: $.param({from: fromCoord, to: toCoord,
                count: 80, datetime: applicationView.datetime})
            // Journey could be fetched
            })
            .then(function() {
              dbPromise.then(function(db) {
                var tx = db.transaction('journeys', 'readwrite');
                var journeyStore = tx.objectStore('journeys');

                // Put connection to journeys
                journeyStore.put({
                  from: fromInput,
                  to: toInput,
                  connection: applicationView.journeyModel.toJSON(),
                  date: applicationView.today.toDateString()
                }, connection);

                // Return if transaction was successful
                return tx.complete;
              }).then(function() {
                // Render view
                applicationView.mainView.renderJourney(
                  applicationView.journeyModel.toJSON());
              });
            });
          // Journey has been cached
          } else {
            // Render view
            applicationView.mainView.renderJourney(response.connection);
          }
        });
      }
    });

    var ApplicationView = Backbone.View.extend({

      initialize: function() {
        // Init models and views
        this.stationCollection = new StationCollection();
        this.journeyModel = new JourneyModel();

        // Init views
        this.headerView = new HeaderView();
        this.searchBox = new SearchBox();
        this.mainView = new MainView();

        var self = this;

        // Get datetime
        this.today = new Date();
        var n = this.today.toISOString();
        this.datetime = n.replace(/-/g, '').slice(0, -13).concat('060000');

        // Render modal
        $('#modal1').leanModal();

        // Render load bar
        this.mainView.renderLoad();

        // Check if station data is in localStorage
        if (localStorage.getItem('stations')) {
          // Add local storage to collection
          self.stationCollection.add(
            JSON.parse(localStorage.getItem('stations')));

          // Immediately render searchbox
          self.searchBox.render();

          // Remove loading ring
          self.mainView.emptyView();

          // Enable autocomplete functionality
          self.searchBox.render(self.stationCollection.toJSON(),
            self.stationCollection.byName());
        // Station data not cached
        } else {
          // Get stations
          self.stationCollection.fetch({

            beforeSend: sendAuthentication,

            // Add parameters to api endpoint
            data: $.param({count: 500})

          }).then(function(response) {
            // Display search box
            self.searchBox.render(self.stationCollection.toJSON(),
              self.stationCollection.byName());

            // Remove loading ring
            self.mainView.emptyView();

            // Save data in localStorage
            localStorage.setItem('stations',
              JSON.stringify(self.stationCollection.toJSON()));
          }).catch(function(resp) {
            console.log('Could not fetch station data from api');
          });
        }
      }
    });

    var applicationView = new ApplicationView();
  });
})(Backbone, $, MyApp, Handlebars);
