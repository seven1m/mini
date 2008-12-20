// ajax.js source (minified version in pkg directory)

if(!window.mini)mini={};
if(!mini.form)mini.form={};
if(!mini.ajax)mini.ajax={};

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

// Serializes all the fields in a form so that they can be passed as a query string in the form "arg1=val1&arg2=val2".
mini.form.serialize=function(f){
  var g=function(n){
    return f.getElementsByTagName(n)
  };
  var nv=function(e){
    if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value);
    else return ''
  };
  var i=collect(
    g('input'),
    function(i){
      if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i)
    }
  );
  var s=collect(g('select'),nv);
  var t=collect(g('textarea'),nv);
  return i.concat(s).concat(t).join('&')
}

// The XMLHttpRequest object (or MS equivalent) used for communication
mini.ajax.x=function(){
  try{
    return new ActiveXObject('Msxml2.XMLHTTP')
  }catch(e){
    try{
      return new ActiveXObject('Microsoft.XMLHTTP')
    }catch(e){
      return new XMLHttpRequest()
    }
  }
}

// Send a basic Ajax request.
mini.ajax.send=function(u,f,m,a){
  var x=mini.ajax.x();
  x.open(m,u,true);
  x.onreadystatechange=function(){
    if(x.readyState==4)f(x.responseText)
  };
  if(m=='POST')x.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  x.send(a)
}

// Uses a GET request to query the specified url and return a response to the specified function.
mini.ajax.get=function(url,func){
  mini.ajax.send(url,func,'GET')
}

// Uses a GET request to query the specified url and return a response synchronously. Use this sparingly, as synchronous calls can lock up the browser.
mini.ajax.gets=function(url){
  var x=mini.ajax.x();
  x.open('GET',url,false);
  x.send(null);
  return x.responseText
}

// Uses a POST request to query the specified url and return a response to the specified function.
mini.ajax.post=function(url,func,args){
  mini.ajax.send(url,func,'POST',args)
}

// Uses a POST request to query the specified url and insert the result into the specified element.
// * @method@ = GET or POST (default)
// * @args@ = arguments as string (not used if specifying GET -- instead pass args with url like this: "url?arg=val")
mini.ajax.update=function(url,elm,method,args){
  method=method||'POST';
  var e=$(elm);
  var f=function(r){e.innerHTML=r};
  mini.ajax.send(url,f,method,args)
}

// Used in the onsubmit handler of a function. The form is not submitted the usual way; the form is instead serialized using "ajax.serialize" and submitted using "ajax.post". The result is then inserted into the specified element.
// * @frm@ = form element
// * @elm@ (optional) = element to update with returned content; if blank, returned content will be assumed to be javascript, and will be evaluated
// Example: @<form action="fallback/url" onsubmit="mini.ajax.submit('ajax/form/url', this, 'div_to_update')@
mini.ajax.submit=function(url,frm,elm){
  var e=$(elm);
  var f=function(r){
    e?e.innerHTML=r:eval(r)
  };
  mini.ajax.post(url,f,mini.form.serialize(frm))
}
