/* global window: false */
/* global navigator: false */
/* global $: false */
/* global document: false */
/* global idb: false */
/* global btoa: false */
/* global Handlebars: false */
/* global MyApp: false */
/* global Backbone: false */
/* global localStorage: false */

(function(Backbone, $, MyApp, Handlebars, window, navigator, localStorage,
  document, btoa, idb) {
  'use strict';

  // App
  var applicationView;

  /**
  * Check to make sure service workers are supported in the current browser,
  *   and that the current page is accessed from a secure origin.
  */
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  /**
   * Check if service worker is implementend and if
   *   protocols are appropriate for service worker
   */
  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    // Service worker has been registered
    .then(function(registration) {
      // Fire updatefound when service-worker.js changes
      registration.onupdatefound = function() {
        // Check if serviceWorker is already controlled
        if (navigator.serviceWorker.controller) {
          // Is service worker installing?
          var installingWorker = registration.installing;

          // Listen if status of service worker changes
          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                console.log('installed service worker');
                break;
              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');
              default:
            }
          };
        }
      };
    // Service worker could not be installed
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  /**
   * Sends api authentification for api get request
   * @param  {[type]} xhr [description]
   */
  var sendAuthentication = function(xhr) {
    xhr.setRequestHeader('Authorization',
      ('Basic '.concat(btoa('16897ba2-c7cf-4a45-8803-fa2f46337f2f'))));
  };

  /**
   * Turns a ISO date string to a simple hours:minutes
   *  representation
   * @param  {String} myDate - Date in ISO 8601 format
   * @return {String} Date with only hours and minutes, e.g. 15:45
   */
  Handlebars.registerHelper('myDate', function(date) {
    return date.replace(
      /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})/, '$4:$5');
  });

  /**
  * Handlebar helper that converts minutes to an hour and
  *   minutes format
  * @param {number} minToHours - Integer of minutes a train ride neads
  * @returns {String} Hour and minutes representation of train time
  *                   e.g. 1h 15min
  */
  Handlebars.registerHelper('minToHours', function(min) {
    var hours = Math.floor(parseFloat(min) / 60 / 60);
    var minutes = Math.ceil((min / 60) % 60);
    return hours + 'h ' + minutes + ' min';
  });

  /**
   * Handlebar helper that adds adds value check in if statetent
   *   if(5 == variable)
   * @param  {String} ifvalue
   * @param  {Function} Helper function
   * @return Helper function
   */
  Handlebars.registerHelper('ifvalue', function(conditional, options) {
    if (conditional === options.hash.equals) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  /**
   * Opens an indexedDB database
   */
  var dbPromise = idb.open('transportationApp', 1, function(upgradeDB) {
    upgradeDB.createObjectStore('journeys');
  });

  /**
   * Checks if DOM has been loaded
   */
  $(document).ready(function() {
    /**
     * Collection of all stations that exist for a
     *  given network.
     */
    var StationCollection = Backbone.Collection.extend({
      // Url of endpoint
      url: 'https://api.navitia.io/v1/coverage/de/networks/' +
           'network%3Adb_regio_ag/stop_points',

      parse: function(response) {
        return response.stop_points;
      },

      // Return Object with name as key and null as value for
      // autocomplete inputs
      byName: function() {
        // Initialize empty stations object
        var stations = {};

        // Build stations object
        this.each(function(x) {
          stations[x.get('name')] = null;
        });

        return stations;
      }
    });

    /**
     * Model for a single journey from between two points
     */
    var JourneyModel = Backbone.Model.extend({

      // Url of api endpoint
      url: 'https://api.navitia.io/v1/journeys',

      parse: function(response) {
        return response.journeys;
      }
    });

    /**
     * Main view of application. Displays search results
     */
    var MainView = Backbone.View.extend({

      el: '#mainview',

      // Render progress bar when data is fetched
      renderLoad: function() {
        // Render search
        this.$el.html(MyApp.templates.loading());
      },

      // Empty main view
      emptyView: function() {
        this.$el.html('');
      },

      // Render journey if data has been fetched or
      // comes from cache
      renderJourney: function(jsonData) {
        // There are existing journey for the query
        if ($.isEmptyObject(jsonData)) {
          this.$el.html(MyApp.templates.journey());
        // There are no journey for the query
        } else {
          this.$el.html(MyApp.templates.journey({journey: jsonData}));

          // Inititialize accordion functionality of materialize.css
          $('.collapsible').collapsible({
            accordion: false
          });
        }
      },

      // If fetch was unsuccessful render fetch error
      renderJourneyError: function(jsonData) {
        this.$el.html(MyApp.templates.journeyerror({cachedJourneys: jsonData}));
      }
    });

    /**
     * Header view with nav element
     */
    var HeaderView = Backbone.View.extend({

      el: 'header',

      // Render header immediately
      initialize: function() {
        this.render();
      },

      // Render header
      render: function() {
        this.$el.html(MyApp.templates.header());
        return this;
      }
    });

    /*
     * Search Box for user input
     *   defines destination where user is and want's to go
     *
     */
    var SearchView = Backbone.View.extend({

      el: '#searchbox',

      events: {
        // User clicks search bar (Find journeys)
        'click #searchbox_button': 'findConnection'
      },

      // Render search bar
      render: function(jsonData, stationData) {
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

      // Searches database for connection and renders
      //  connections
      findConnection: function() {
        // Get string values for stations
        var fromInput = this.$el.find('#autocomplete-input-from').val();
        var toInput = this.$el.find('#autocomplete-input-to').val();

        // Concatenate both stations to string for indexedDB key
        var connection = fromInput.concat(toInput);

        // Get coordinates from stations
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

        // Get journey from indexedDB
        dbPromise.then(function(db) {
          var tx = db.transaction('journeys');
          var journeyStore = tx.objectStore('journeys');

          return journeyStore.get(connection);
        // Transaction was successfull
        }).then(function(response) {
          // Journey has not been cached
          if (response === undefined) {
            // Fetch journey from api
            applicationView.journeyModel.fetch({

              // Send api-key with request
              beforeSend: sendAuthentication,

              // Add parameters to api request
              data: $.param({from: fromCoord, to: toCoord,
                count: 80, datetime: applicationView.datetime}),

              success: function() {
                console.log('yeah');
              },

              error: function() {
                console.log('nope');
              },
            })
            // Fetch was successful
            .then(function() {
              dbPromise.then(function(db) {
                var tx = db.transaction('journeys', 'readwrite');
                var journeyStore = tx.objectStore('journeys');

                // Put connection to journeys in indexedDB
                journeyStore.put({
                  from: fromInput,
                  to: toInput,
                  connection: applicationView.journeyModel.toJSON(),
                  date: applicationView.today.toDateString()
                }, connection);

                // Return if transaction was successful
                return tx.complete;
              // Journey has been put into indexedDB
              }).then(function() {
                // Render view
                applicationView.mainView.renderJourney(
                  applicationView.journeyModel.toJSON());
              });
            // Fetch was not successful
            }).catch(function() {
              // Get all connections
              dbPromise.then(function(db) {
                return db.transaction('journeys')
                  .objectStore('journeys').getAll();
              // Transaction was successfull
              }).then(function(allObj) {
                // Render fetch error
                applicationView.mainView.renderJourneyError(allObj);
              });
            });
          // Journey has already been cached
          } else {
            // Render view
            applicationView.mainView.renderJourney(response.connection);
          }
        // Journey could not be found in indexedDB
        }).catch(function() {
          console.log('Could not fetch connection from indexDB');
        });
      }
    });

    /**
     * Application view with logic
     */
    var ApplicationView = Backbone.View.extend({

      initialize: function() {
        // Init models and collections
        this.stationCollection = new StationCollection();
        this.journeyModel = new JourneyModel();

        // Init views
        this.headerView = new HeaderView();
        this.searchBox = new SearchView();
        this.mainView = new MainView();

        var self = this;

        // Get datetime
        this.today = new Date();
        var n = this.today.toISOString();
        this.datetime = n.replace(/-/g, '').slice(0, -13).concat('060000');

        // Render load bar
        this.mainView.renderLoad();

        // Check if station data is in localStorage
        if (localStorage.getItem('stations')) {
          // Add local storage to collection
          self.stationCollection.add(
            JSON.parse(localStorage.getItem('stations')));

          // Render searchbox
          self.searchBox.render();

          // Remove loading ring
          self.mainView.emptyView();

          // Render search bars
          self.searchBox.render(self.stationCollection.toJSON(),
            self.stationCollection.byName());
        // Station data not in localStorage
        } else {
          // Get stations
          self.stationCollection.fetch({

            // Send authentification header to api endpoint
            beforeSend: sendAuthentication,

            // Add parameter count to api endpoint
            data: $.param({count: 500})

          // Stations were successfully fetched
          }).then(function() {
            // Display search box
            self.searchBox.render(self.stationCollection.toJSON(),
              self.stationCollection.byName());

            // Remove loading ring
            self.mainView.emptyView();

            // Save data in localStorage
            localStorage.setItem('stations',
              JSON.stringify(self.stationCollection.toJSON()));
          // Station data could not be fetched from api endpoint
          }).catch(function() {
            console.log('Could not fetch station data from api');
          });
        }
      }
    });

    // Fire up application
    applicationView = new ApplicationView();
  });
})(Backbone, $, MyApp, Handlebars, window, navigator, localStorage,
  document, btoa, idb);
