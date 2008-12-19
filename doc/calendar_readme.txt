calendar.js - Mini
==============

Provides calendar building functions and a date selector form widget.

Functions and Attributes
------------------------

ajax.days
  An array of days displayed at the top of a calendar.
  
  These days must be in order Sunday..Saturday. The wkstart argument to
  other functions will reorder them appropriately. By default, only 'S', 'M',
  etc. are set; you can change them to suit your needs.

ajax.months
  An array of month names used to display the month at the top of a calendar.
  
  The months can be changed to suit your needs (i.e. another language,
  different abreviations, etc.).

ajax.selectors
  An array containing the two strings used to build the selector links on
  either side of the month and year at the top of a calendar. By default,
  their set to '&laquo;' and '&raquo;.' You may wish to change them to '-'
  and '+' or similar.

ajax.build(month, year, wkstart)
  wkstart = the number of the day of the week you wish to start on
  (0=Sunday, 1=Monday, and so on)
  
  This function returns an array of arrays containing calendar data.
  The outer array is the weeks of the month; the inner array is each
  day of each week. If the day is for the previous month or next month,
  then it is null; otherwise it is the integer date of the month.

calendar.table(month, year, wkstart, heading, content)
  heading = html inserted just after the <table> tag (used by the
  calendar.selector() function to build a navigatable calendar).
  
  content = the html content of each cell of the table; %d is replaced
  by the integer date of the month
  
  This function builds an html table calendar for the specified month
  and year and wkstart.

calendar.selector(elm, month, year, wkstart, content)
  elm = the name of the element into which you wish to insert the calendar
  
  content = the html content to use for each table cell
  (see calendar.table above)
  
  This function builds a navigatable calendar and inserts it into the
  specified element.