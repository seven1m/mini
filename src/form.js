// form.js source (minified version in pkg directory)

if(!window.mini)mini={};
if(!mini.form)mini.form={};

if(!window.$)
$=function(e){
  if(typeof e=='string')e=document.getElementById(e);
  return e
}

function collect(a,f){
  var n=[];
  for(var i=0;i<a.length;i++){
    var v=f(a[i]);
    if(v!=null)n.push(v)
  }
  return n
}

mini.form.errmsg='One or more fields are required.';

mini.form.errclass='error';

// Use in the onsubmit handler of your form to validate that required fields are completed, e.g. @<form onsubmit="return mini.form.validate(this)">@
// Indicate required fields with class="required"
// Add @label.error { color: red; }@ or similar to your stylesheet so that errored fields will stand out.
mini.form.validate=function(frm){
  var g=function(n){
    var a=[];
    var e=frm.getElementsByTagName(n);
    for(var i=0;i<e.length;i++)a.push(e[i]);
    return a
  };
  var f=g('input').concat(g('select')).concat(g('textarea'));
  if(
    collect(
      f,
      function(i){
        var l=mini.form.labelfor(i);
        if(i.className.match(/required/)){
          var t=i.getAttribute('type');
          if(
            (t=='radio'&&collect(frm.elements[i.getAttribute('name')],function(o){if(o.checked)return o}).length==0)||
            (t=='checkbox'&&!i.checked)||
            (i.value.replace(' ','')=='')
          ){
            if(l)l.className=mini.form.errclass;
            return i
          }else if(l){
            l.className=l.className.replace(mini.form.errclass, '')
          }
        }
      }
    ).length>0
  ){
    alert(mini.form.errmsg);
    return false
  };
  return true
}

mini.form.labelfor=function(elm){
  return collect(
    document.getElementsByTagName('label'),
    function(i){
      var f=i.getAttribute('for')||i.getAttribute('htmlFor');
      if($(f)==$(elm))return i
    }
  )[0]
}
