*The !JavaScript library with a small footprint.*

Overview
--------

This is my attempt to package together some of my most-used !JavaScript code
in one place. The focus here is compactness. I haven't placed any hard
constraints on myself when creating this (like with the 1k DOM API), except
that the library has to be small and efficient. I have tried to limit the
use of globals to keep Mini from stepping on your namespace too much, but
again the focus is on compactness and efficiency, so a few globals are used
to make things easy.

Furthermore, I have tried to make things a bit more readable by using
appropriate identifier names where the identifier will be used by code
outside the library. Of course, the library could be a bit smaller by making
identifiers one-letter long, but I feel the tradeoff of further losing
readability isn't worth the tiny size improvement. Bottom line: one-letter
identifiers are used inside functions to keep the library small, but not
for things a human being might need to use in his/her code.

Usage
-----

Each component of the Mini library is meant to be a standalone unit. At
this point in Mini's life, none of the components depend on any of the
others. This might change in the future, but hopefully not.

To use a Mini component in your HTML page, include the script with a
standard script tag like this::

  <script type="text/javascript" src="mini/form.js"></script>

For each component you require, use one script tag to include it in your
HTML page.

Each component defines a global object of the same name as the file
(minus the ".js"). For example, the *form.js* component defines a *form*
object that houses all the form-related functions.

More detailed usage instructions can be found in the readme file for
each component, e.g. "form_readme.txt".

Components
----------

ajax.js
  Provides very basic Ajax communication between client and server.

form.js
 Provides simple form validation.
