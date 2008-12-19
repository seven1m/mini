// mini/form.js - http://timmorgan.org/mini

function $(e){if(typeof e=='string')e=document.getElementById(e);return e};
function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n};

form={};
form.errmsg='One or more fields are required.'
form.errclass='error'
form.noerrclass=''
form.validate=function(frm){var g=function(n){var a=[];var e=frm.getElementsByTagName(n);for(var i=0;i<e.length;i++)a.push(e[i]);return a};var f=g('input').concat(g('select')).concat(g('textarea'));if(collect(f,function(i){var l=form.label(i);if(i.getAttribute('required')&&i.value.replace(' ','')==''){if(l)l.className=form.errclass;return i}else if(l)l.className=form.noerrclass}).length>0){alert(form.errmsg);return false}else return true};
form.label=function(elm){var l=collect(document.getElementsByTagName('label'),function(i){var f=i.getAttribute('for')||i.getAttribute('htmlFor');if($(f)==$(elm))return i});if(l.length>0)return l[0]};