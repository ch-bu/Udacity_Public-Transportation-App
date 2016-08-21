this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return " <nav>\n    <div class=\"nav-wrapper\">\n      <a href=\"#\" class=\"brand-logo center\">Logo</a>\n    </div>\n  </nav>";
},"useData":true});
this["MyApp"]["templates"]["journey"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	 <ul class=\"collapsible col s12 m10 offset-m1\" data-collapsible=\"accordion\">\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.journey : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	 </ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "	    <li>\n	      <div class=\"collapsible-header\">\n	      	<i class=\"material-icons\">card_travel</i>"
    + alias3((helpers.myDate || (depth0 && depth0.myDate) || alias2).call(alias1,(depth0 != null ? depth0.departure_date_time : depth0),{"name":"myDate","hash":{},"data":data}))
    + " - "
    + alias3((helpers.myDate || (depth0 && depth0.myDate) || alias2).call(alias1,(depth0 != null ? depth0.arrival_date_time : depth0),{"name":"myDate","hash":{},"data":data}))
    + " &rarr; "
    + alias3((helpers.minToHours || (depth0 && depth0.minToHours) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),{"name":"minToHours","hash":{},"data":data}))
    + "\n	      </div>\n	      	\n\n	      	<div class=\"collapsible-body\">\n	      		 \n	      		 <table class=\"highlight\">\n			        <thead>\n			          <tr>\n			              <th data-field=\"id\">Departure</th>\n			              <th data-field=\"name\">Arrival</th>\n			              <th data-field=\"price\">From</th>\n			              <th data-field=\"price\">To</th>\n			              <th data-field=\"name\">Type</th>\n			          </tr>\n			        </thead>\n\n			        <tbody>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.sections : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			        </tbody>\n			      </table>\n	      </div>\n	    </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "				          <tr>\n				            <td>"
    + alias3((helpers.myDate || (depth0 && depth0.myDate) || alias2).call(alias1,(depth0 != null ? depth0.departure_date_time : depth0),{"name":"myDate","hash":{},"data":data}))
    + "</td>\n				            <td>"
    + alias3((helpers.myDate || (depth0 && depth0.myDate) || alias2).call(alias1,(depth0 != null ? depth0.arrival_date_time : depth0),{"name":"myDate","hash":{},"data":data}))
    + "</td>\n				            <td>"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.from : depth0)) != null ? stack1.name : stack1), depth0))
    + "</td>\n				            <td>"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.to : depth0)) != null ? stack1.name : stack1), depth0))
    + "</td>\n"
    + ((stack1 = (helpers.ifvalue || (depth0 && depth0.ifvalue) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"ifvalue","hash":{"equals":"waiting"},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifvalue || (depth0 && depth0.ifvalue) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"ifvalue","hash":{"equals":"public_transport"},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifvalue || (depth0 && depth0.ifvalue) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"ifvalue","hash":{"equals":"street_network"},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifvalue || (depth0 && depth0.ifvalue) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"ifvalue","hash":{"equals":"transfer"},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifvalue || (depth0 && depth0.ifvalue) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"ifvalue","hash":{"equals":"crow_fly"},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				          </tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "						        <td><img src=\"../images/waiting.png\" alt=\"waiting\"></td>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "						        <td><img src=\"../images/public_transport.png\" alt=\"public transport\"></td>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "						        <td><img src=\"../images/street_network.png\" alt=\"street network\"></td>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "						        <td><img src=\"../images/walking.png\" alt=\"transfer\"></td>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "						        <td><img src=\"../images/crow_fly.png\" alt=\"crow fly\"></td>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"row\">\n      <div class=\"col s12 m10 offset-m1\">\n        <div class=\"card-panel teal\">\n          <p>Unfortunately, this journey doesn't exist.</p>\n        </div>\n      </div>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.journey : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
this["MyApp"]["templates"]["loading"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"progress col s12 m8 offset-m2\">\n  <div class=\"indeterminate\"></div>\n</div>";
},"useData":true});
this["MyApp"]["templates"]["searchbox"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form id=\"searchbox\" class=\"col s10 offset-s1 m10 offset-m1\">\n\n  <div class=\"row\">\n    <div class=\"input-field\">\n      <input type=\"text\" id=\"autocomplete-input-from\" class=\"autocomplete\">\n      <label for=\"autocomplete-input\">From</label>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"input-field\">\n      <input type=\"text\" id=\"autocomplete-input-to\" class=\"autocomplete\">\n      <label for=\"autocomplete-input\">To</label>\n    </div>\n  </div>\n\n  <div class=\"row center-align\">\n      <a id=\"searchbox_button\" class=\"waves-effect waves-light btn\">Find journey.</a>\n  </div>\n</form>";
},"useData":true});