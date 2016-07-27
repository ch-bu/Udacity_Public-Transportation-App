this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <nav>\n    <div class=\"nav-wrapper\">\n      <a href=\"#\" class=\"brand-logo center\">Logo</a>\n    </div>\n  </nav>";
},"useData":true});
this["MyApp"]["templates"]["loading"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"progress\">\n  <div class=\"indeterminate\"></div>\n</div>";
},"useData":true});
this["MyApp"]["templates"]["searchbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n  \n  <form class=\"col s12\">\n\n    <div class=\"row\">\n      <div class=\"input-field col s12 m6\">\n        <input id=\"autocomplete\" type=\"text\" class=\"validate searchbox_from\">\n        <label for=\"autocomplete\">Where are you?</label>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"input-field col s12 m6\">\n        <input id=\"autocomplete\" type=\"text\" class=\"validate searchbox_to\">\n        <label for=\"autocomplete\">Where do you wanna go?</label>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col s12\">\n        <a id=\"searchbox_button\" class=\"waves-effect waves-light btn\">Find trains.</a>\n      </div>\n    </div>\n  </form>\n</div>";
},"useData":true});