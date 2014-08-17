/*
 * A simple class that generates menus in DOM given a list of 
 * menu items. Each menu item can have children when when their parent is
 * clicked will be displayed.
 */

menu_bar = function () {
    'use strict';

    function _menuGenerator (parent, config, depth_str) {
        var child_node, sub_node, item, this_depth,
            len = config.length;
        depth_str = depth_str || '';

        for (var i = 0; i < len; i++) {
            this_depth = depth_str+'-'+i;
            item = config[i];
            child_node = document.createElement('li');
            child_node.innerHTML = item.name;
            child_node.id = 'menu__item-' + this_depth;

            console.log(i, depth_str +'-'+i);

            if (item.children) {
                sub_node = document.createElement('ul');
                sub_node.id = 'menu-'+this_depth;
                _menuGenerator(sub_node, item.children, this_depth);
            } else {
                sub_node = document.createElement('span');
                sub_node.id = 'menu__content-'+this_depth;
                sub_node.innerHTML = item.content;
            }
            // Make sure everything starts off as hidden
            sub_node.style.display = 'none';
            // Set up the child node so when its clicked it makes the sub_node
            // visible
            child_node.onclick = _getToggleVisibilityFunction(sub_node);

            child_node.appendChild(sub_node);
            parent.appendChild(child_node);
        }
    }

    function _getToggleVisibilityFunction (elementToToggle) {
        return function (event) {
            event.stopPropagation();
            var status = window.getComputedStyle(elementToToggle, null).display;
            if (status === 'none') {    
                elementToToggle.style.display = 'block';
            } else {
                elementToToggle.style.display = 'none';
            }
        };
    }

    function _startIt (parentNode, configuration) {
        var topElement = document.createElement('ul');
        topElement.id = 'menu__root';
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