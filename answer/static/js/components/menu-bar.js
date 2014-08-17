/*
 * A simple class that generates menus in DOM given a list of 
 * menu items. Each menu item can have children when when their parent is
 * clicked will be displayed.
 */

menu_bar = function () {
    'use strict';

    function _menuGenerator (parent, config, depth) {
        var child_node, sub_node, item, depth_str,
            len = config.length;
        depth = depth + 1 || 0;
        depth_str = depth.toString(10);

        for (var i = 0; i < len; i++) {
            item = config[i];
            child_node = document.createElement('li');
            child_node.innerHTML = item.name;
            child_node.classList.add('menu__item--'+depth_str);

            if (item.children) {
                sub_node = document.createElement('ul');
                _menuGenerator(sub_node, item.children, depth);
            } else {
                sub_node = document.createElement('span');
                sub_node.innerHTML = item.content;
            }
            child_node.appendChild(sub_node);

            parent.appendChild(child_node);
        }
    }

    function _startIt (parentNode, configuration) {
        var topElement = document.createElement('ul');
        topElement.classList.add('menu__root');
        parentNode.appendChild(topElement);
        _menuGenerator(topElement, configuration);
    }

    // The top level function, checks the selector checks the configuration
    function _menuBar (parentSelector, configuration) {
        var parentNode;

        // Approximation to CSS style selectors
        if (/^\./.test(parentSelector)) {
            parentSelector = parentSelector.substring(1); 
            parentNode = document.getElementsByClassName(parentSelector);
        } else if (/^#/.test(parentSelector)) {
            parentSelector = parentSelector.substring(1);
            parentNode = document.getElementById(parentSelector);
        } else {
            parentNode = document.getElementByTagName(parentSelector);
        }

        if ( !parentNode ) {
            console.error('No parent node found for: ', parentSelector);
            return;
        } else if (parentNode.length !== undefined) {
            console.warn('Found multiple nodes for: ', parentSelector, 'using first');
            parentNode = parentNode[0];
        }

        if (typeof configuration === 'string' && loader) {
            // if it's a string assume it's a path to a config and load it
            loader(configuration, function (loaded) {
                _startIt(parentNode, loaded);
            });
        } else {
            _startIt(parentNode, configuration);
        }
    }

    return _menuBar;
}();