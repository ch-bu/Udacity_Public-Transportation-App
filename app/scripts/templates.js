this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <nav>\n    <div class=\"nav-wrapper\">\n      <a href=\"#\" class=\"brand-logo center\">Logo</a>\n    </div>\n  </nav>";
},"useData":true});
this["MyApp"]["templates"]["searchbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n  <form class=\"col s12\">\n\n    <div class=\"row\">\n      <div class=\"input-field col s12 m6\">\n        <input id=\"password\" type=\"text\" class=\"validate\">\n        <label for=\"password\">Where are you?</label>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"input-field col s12 m6\">\n        <input id=\"email\" type=\"text\" class=\"validate\">\n        <label for=\"email\">Where do you wanna go?</label>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col s12\">\n        <a class=\"waves-effect waves-light btn\">Find trains.</a>\n      </div>\n    </div>\n  </form>\n</div>";
},"useData":true});