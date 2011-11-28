var drupal=drupal||{};drupal.api=function(){this.endpoint=drupal.endpoint||this.endpoint||"";this.resource=this.resource||""};drupal.api.prototype.getURL=function(a){var b=this.endpoint,b=b+(this.resource?"/"+this.resource:"");return b+=a&&a.id?"/"+a.id:""};drupal.api.prototype.call=function(a,b,c,d,e){a={url:a,dataType:b,type:c,success:function(a,b){"success"==b?e(a):console.log("Error: "+b)},error:function(a){console.log(a.responseText);e(null)}};d&&(a.data=d);jQuery.ajax(a)};
drupal.api.prototype.get=function(a,b,c){a=this.getURL(a);a=a+".jsonp"+(b?"?"+decodeURIComponent(jQuery.param(b,!0)):"");this.call(a,"jsonp","GET",null,c)};drupal.api.prototype.execute=function(a,b,c){this.call(this.getURL(b)+"/"+a,"json","POST",b,c)};drupal.api.prototype.save=function(a,b){var c=a.id?"PUT":"POST";this.call(this.getURL(a),"json",c,a,b)};drupal.api.prototype.remove=function(a,b){this.call(this.getURL(a),"json","DELETE",null,b)};drupal=drupal||{};
drupal.system=function(a){this.user=this.user||null;this.api=this.api||new drupal.system.api;a&&this.connect(a)};drupal.system.prototype.connect=function(a){var b=this;this.api.execute("connect",null,function(c){b.user=new drupal.user(c.user);b.user.sessid=c.sessid;a(b)})};drupal.system.prototype.get_variable=function(a,b,c){this.api.execute("get_variable",{name:a,"default":b},c)};drupal.system.prototype.set_variable=function(a,b,c){this.api.execute("set_variable",{name:a,value:b},c)};
drupal.system.prototype.del_variable=function(a,b){this.api.execute("del_variable",{name:a},b)};drupal=drupal||{};drupal.system=drupal.system||{};drupal.system.api=function(){this.resource=this.resource||"system";drupal.api.call(this)};drupal.system.api.prototype=new drupal.api;drupal.system.api.prototype.constructor=drupal.system.api;drupal=drupal||{};drupal.entity=function(a,b){this.id=this.id||"";this.api=this.api||null;this.update(a);b&&this.get(b)};
drupal.entity.prototype.get=function(a){if(this.api){var b=this;this.api.get(this.getObject(),this.getQuery(),function(c){c[0]?a(c):(b.update(c),a&&a(b))})}};drupal.entity.prototype.save=function(a){if(this.api){var b=this;this.api.save(this.getObject(),function(c){b.update(c);a&&a(b)})}};drupal.entity.prototype.remove=function(a){this.id&&this.api.remove(this.getObject(),a)};
drupal.entity.prototype.getQuery=function(){var a={};if(!this.id)for(var b in this)this.hasOwnProperty(b)&&this[b]&&"object"!=typeof this[b]&&(a["parameters["+b+"]"]=this[b]);return a};drupal.entity.prototype.update=function(a){if(a)for(var b in a)a.hasOwnProperty(b)&&this.hasOwnProperty(b)&&(this[b].update?this[b].update(a[b]):this[b]=a[b])};drupal.entity.prototype.getObject=function(){return{id:this.id}};drupal=drupal||{};
drupal.node=function(a,b){this.title=this.title||"";this.type=this.type||"";this.status=this.status||0;this.uid=this.uid||0;this.api=this.api||new drupal.node.api;drupal.entity.call(this,a,b)};drupal.node.prototype=new drupal.entity;drupal.node.prototype.constructor=drupal.node;drupal.node.prototype.update=function(a){drupal.entity.prototype.update.call(this,a);this.id=a&&a.nid||this.id};
drupal.node.prototype.getObject=function(){return jQuery.extend(drupal.entity.prototype.getObject.call(this),{title:this.title,type:this.type,status:this.status,uid:this.uid})};drupal=drupal||{};drupal.node=drupal.node||{};drupal.node.api=function(){this.resource=this.resource||"node";drupal.api.call(this)};drupal.node.api.prototype=new drupal.api;drupal.node.api.prototype.constructor=drupal.node.api;drupal=drupal||{};
drupal.user=function(a,b){this.name=this.name||"";this.mail=this.mail||"";this.pass=this.pass||"";this.status=this.status||1;this.sessid=this.sessid||"";this.session_name=this.session_name||"";this.api=this.api||new drupal.user.api;drupal.entity.call(this,a,b)};drupal.user.prototype=new drupal.entity;drupal.user.prototype.constructor=drupal.user;
drupal.user.prototype.login=function(a){var b=this;this.api.execute("login",{username:this.name,password:this.pass},function(c){b.sessid=c.sessid;b.session_name=c.session_name;b.update(c.user);a(b)})};drupal.user.prototype.register=function(a){var b=this;this.api.execute("register",this.getObject(),function(c){b.update(c);a(b)})};drupal.user.prototype.logout=function(a){this.api.execute("logout",null,a)};
drupal.user.prototype.update=function(a){drupal.entity.prototype.update.call(this,a);this.id=a&&a.uid||this.id};drupal.user.prototype.getObject=function(){return jQuery.extend(drupal.entity.prototype.getObject.call(this),{name:this.name,mail:this.mail,pass:this.pass,status:this.status})};drupal=drupal||{};drupal.user=drupal.user||{};drupal.user.api=function(){this.resource="user";drupal.api.call(this)};drupal.user.api.prototype=new drupal.api;drupal.user.api.prototype.constructor=drupal.user.api;
