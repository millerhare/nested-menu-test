This is my solution to the coding challenge by Miller Hare. It loads a simple JSON object from a URL and then uses it to build a menu.

At global scope it exposes two functions: `loader` and `menu_bar`.

loader accepts two arguments: a `url` and a `callback`. The url should be for a JSON object which will be fetched via an async call. If the request for the URL is successful (a 200 response) then the callback is invoked with a single argument: the JSON response of the request.

menu_bar also accepts two arguments: a selector string and a configuration. The selector string can be either an id, a class or an element although for obvious reason an id is preferable. The configuration parameter should either be an array of elements or a url to a json object of the same which will be loaded using loader. The format of the configuration array should be similar to that of config.json: an array of elements, each element having a `name`property (which will be displayed as the menu item)  and either a `content` or `children` property. If the second property is `content` then it will be displayed when the menu item is clicked, otherwise another sub-menu will be added.

Tests are available in the `tests` folder. Assuming that the root (i.e. 'answer/') directory is being served at `localhost:8000` (e.g. using MAMP) then the tests can be run by navigating to `localhost:8000/tests/test.html`. Testing is done using qUnit and jQuery