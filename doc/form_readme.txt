form.js - Mini
==============

Provides simple form validation.

Functions and Attributes
------------------------

form.validate(f)
  f = the form you wish to validate
  
  This function is typically called by the onsubmit event of a form, e.g.
  ``<form onsubmit="return form.validate(this)">``.
  
  This function simply validates that a field has a value other than
  blank or spaces. To indicate that a field is required, add
  ``required="required"`` to it like this:
  ``<input name="field1" required="required"/>``
  
  Currently, this function can only validate text fields (input type="text"),
  select fields, and textareas. Radio buttons and checkboxes can not be
  validated by this function.
  
  If the form is submitted with one or more fields empty or containing
  just spaces, then the user is alerted (see the "form.errmsg" property)
  and the invalid field's label(s) will be highlighted. This is done by
  changing the label's class to "error" (see the "form.errclass" property);
  you must provide this class definition in your HTML's stylesheet.
  See form_test.html for more help.

form.label(elm)
  elm = the (name of the) element for which you wish to find the label
  
  This function returns the label element linked to the specified field
  element. This is done by searching all labels for a "for" attribute
  pointing to the field element's id. This function is used by the
  form.validate() function.
  
form.errmsg = 'One or more fields are required.'
  The error message displayed when one or more fields are found invalid.

form.errclass = 'error'
  The class to which to change an invalid field's label

form.noerrclass = ''
  The class to which to change a now-valid field's label
  (after once being invalid)