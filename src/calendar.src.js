// mini/calendar.js - http://timmorgan.org/mini

function $(e){if(typeof e=='string')e=document.getElementById(e);return e};
function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n};

calendar={};
calendar.days=['S','M','T','W','T','F','S'];
calendar.months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
calendar.selectors=['&laquo;','&raquo;'];
calendar.build=function(month,year,wkstart){var s=wkstart||0;var d=new Date(year,month-1,1);var a=[];do{var p=d.getDay()-s;if(p<0)p=7+p;if(p==0||a.length==0)a.push([]);a[a.length-1][p]=d.getDate();d.setDate(d.getDate()+1)}while(d.getDate()>1);return a};
calendar.table=function(month,year,wkstart,heading,content){var s=wkstart||0;content=content||'%d';var h='<table class="calendar">';if(heading)h+=heading;var d=[];for(var i=0;i<7;i++){var p=i-s;if(p<0)p=7+p;d[p]=calendar.days[i]}h+='<tr><th>'+d.join('</th><th>')+'</th></tr>';var b=calendar.build(month,year,wkstart);collect(b,function(r){h+='<tr><td>'+collect(r,function(c){return c?content.replace(/%d/g,c).replace(/%m/g,month).replace(/%y/g,year):''}).join('</td><td>')+'</td></tr>'});h+='</table>';return h};
calendar.selmonth=function(elm,month,year){var d=[new Date(year,month-2),new Date(year,month)];d=collect(d,function(i){return '<a href="#" onclick="calendar.selector(\''+elm+'\','+(i.getMonth()+1)+','+i.getFullYear()+');return false">'});return d[0]+calendar.selectors[0]+'</a>'+calendar.months[month-1]+d[1]+calendar.selectors[1]+'</a>'};
calendar.selyear=function(elm,month,year){var y=[year-1,year+1];y=collect(y,function(i){return '<a href="#" onclick="calendar.selector(\''+elm+'\','+month+','+i+');return false">'});return y[0]+calendar.selectors[0]+'</a>'+year+y[1]+calendar.selectors[1]+'</a>'};
calendar.selector=function(elm,month,year,wkstart,content){var e=$(elm);if(wkstart!=null)e.setAttribute('calwkstart',wkstart);else wkstart=e.getAttribute('calwkstart');if(content!=null)e.setAttribute('calcontent',content);else content=e.getAttribute('calcontent');if(!month){var d=new Date();month=d.getMonth();year=d.getYear()}var h='<tr class="select"><th class="sel-month" colspan="3">'+calendar.selmonth(elm,month,year)+'</th><th></th><th class="sel-year" colspan="3">'+calendar.selyear(elm,month,year)+'</th></tr>';$(elm).innerHTML=calendar.table(month,year,wkstart,h,content)};
calendar.makepickers=function(wkstart){
  wkstart=wkstart||0;
  var e=collect(document.getElementsByTagName('input'),function(i){if(i.className=='mini-calendar-datepicker')return i});
  collect(e,function(i){
    var t=new Date();var m=t.getMonth()+1;var y=t.getFullYear();
    i.onfocus='this.p=document.createElement("div");this.p.style.position="absolute";document.appendChild(this.p);alert(this.p);calendar.selector(this.p,'+m+','+y+','+wkstart+',"$('+this.id+').value=%d")';
    i.onblur='document.removeChild(this.p)';
  })
};