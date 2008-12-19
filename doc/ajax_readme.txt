ajax.js - Mini
==============

Provides very basic Ajax communication between client and server.

Functions and Attributes
------------------------

ajax.x
  The XMLHttpRequest object (or MS equivalent) used for communication

ajax.serialize(f)
  f = the form element you wish to be serialized
  
  This function serializes all the fields in a form so that they can be passed
  as a query string in the form "arg1=val1&arg2=val2".

ajax.get(url, func)
  url = the url to query (can contain arguments after a '?')
  
  func = the function to call once the response is returned
  
  This function uses a GET request to query the specified url and return a
  response to the specified function.

ajax.post(url, func, args)
  url = the url to query
  
  func = the function to call once the response is returned
  
  args = a string containing arguments to be passed to the url
  
  This function uses a POST request to query the specified url and return a
  response to the specified function.

ajax.update(url, elm)
  url = the url to query
  
  elm = the (name of the) element to update
  
  This function uses a GET request to query the specified url and insert
  the result into the specified element.

ajax.submit(url, elm, frm)
  url = the url to query
  
  elm = the (name of the) element to update
  
  frm = the form element to submit
  
  This function is typically used in the onsubmit handler of a function.
  The form is not submitted the usual way; the form is instead serialized
  using "ajax.serialize" and submitted using "ajax.post". The result is
  then inserted into the specified element.