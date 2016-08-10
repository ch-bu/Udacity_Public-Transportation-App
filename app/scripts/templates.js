this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <nav>\n    <div class=\"nav-wrapper\">\n      <a href=\"#\" class=\"brand-logo center\">Logo</a>\n    </div>\n  </nav>";
},"useData":true});
this["MyApp"]["templates"]["journey"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <li>\n      <div class=\"collapsible-header\">\n      	<i class=\"material-icons\">my_location</i>First</div>\n      	<div class=\"collapsible-body\">\n      		<p>"
    + container.escapeExpression(((helper = (helper = helpers.arrival_data_time || (depth0 != null ? depth0.arrival_data_time : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"arrival_data_time","hash":{},"data":data}) : helper)))
    + "</p>\n      </div>\n    </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <ul class=\"collapsible col s12 m8 offset-m2\" data-collapsible=\"accordion\">\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.journey : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n </ul>";
},"useData":true});
this["MyApp"]["templates"]["loading"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"progress col s12 m8 offset-m2\">\n  <div class=\"indeterminate\"></div>\n</div>";
},"useData":true});
this["MyApp"]["templates"]["searchbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form id=\"searchbox\" class=\"col s10 offset-s1 m8 offset-m2\">\n\n  <div class=\"row\">\n    <div class=\"input-field\">\n      <input type=\"text\" id=\"autocomplete-input-from\" class=\"autocomplete\">\n      <label for=\"autocomplete-input\">From</label>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"input-field\">\n      <input type=\"text\" id=\"autocomplete-input-to\" class=\"autocomplete\">\n      <label for=\"autocomplete-input\">To</label>\n    </div>\n  </div>\n\n  <div class=\"row center-align\">\n      <a id=\"searchbox_button\" class=\"waves-effect waves-light btn\">Find trains.</a>\n  </div>\n</form>";
},"useData":true});