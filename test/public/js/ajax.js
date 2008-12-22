if(!window.mini)mini={};if(!mini.form)mini.form={};if(!mini.ajax)mini.ajax={};
if(!window.$)$=function(e){if(typeof e=='string')e=document.getElementById(e);return e}
function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n}
mini.ajax.bustcache='nocache';
mini.form.serialize=function(f){var g=function(n){return f.getElementsByTagName(n)};var nv=function(e){if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value)};var i=collect(g('input'),function(i){if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i)});var s=collect(g('select'),nv);var t=collect(g('textarea'),nv);return i.concat(s).concat(t).join('&')}
mini.ajax.x=function(){try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}}
mini.ajax.send=function(u,f,m,a){var x=mini.ajax.x();if(mini.ajax.bustcache){var c=mini.ajax.bustcache+'='+new Date().getTime();if(m=='GET')u+=u.indexOf('?')==-1?'?':'&'+c;else if(a&&a!='')a+='&'+c;else a=c};x.open(m,u,true);x.onreadystatechange=function(){if(x.readyState==4)f(x.responseText)};if(m=='POST')x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.send(a)}
mini.ajax.get=function(url,func){mini.ajax.send(url,func,'GET')}
mini.ajax.gets=function(url){var x=mini.ajax.x();x.open('GET',url,false);x.send(null);return x.responseText}
mini.ajax.post=function(url,func,args){mini.ajax.send(url,func,'POST',args)}
mini.ajax.update=function(url,elm,method,args){method=method||'POST';var e=$(elm);var f=function(r){e.innerHTML=r};mini.ajax.send(url,f,method,args)}
mini.ajax.submit=function(url,frm,elm){var e=$(elm);var f=function(r){e?e.innerHTML=r:eval(r)};mini.ajax.post(url,f,mini.form.serialize(frm))}