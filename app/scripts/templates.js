this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <nav>\n    <div class=\"nav-wrapper\">\n      <a href=\"#\" class=\"brand-logo center\">Logo</a>\n    </div>\n  </nav>";
},"useData":true});
this["MyApp"]["templates"]["loading"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"progress col s10 offset-s1\">\n  <div class=\"indeterminate\"></div>\n</div>";
},"useData":true});
this["MyApp"]["templates"]["searchbox"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "          <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.Name : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<form id=\"searchbox\" class=\"col s10 offset-s1 m8 offset-m2\">\n\n  <div class=\"row\">\n    <div class=\"input-field\">\n      <select>\n        <option value=\"\" disabled selected>Choose your option</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </select>\n      <label>Where are you?</label>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"input-field\">\n      <select>\n        <option value=\"\" disabled selected>Choose your option</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </select>\n      <label>Where do you wanna go?</label>\n    </div>\n  </div>\n\n  <div class=\"row center-align\">\n      <a id=\"searchbox_button\" class=\"waves-effect waves-light btn\">Find trains.</a>\n  </div>\n</form>";
},"useData":true});