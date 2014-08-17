/*
 * Tests for the menu bar component
 */

QUnit.test("test presence", function (assert) {
    assert.ok(menu_bar);
});

QUnit.test("test single node construction", function (assert) {
    menu_bar('#qunit-fixture', [{name: 'test', content:'foo'}]);
    // Should have one unordered list with one list item
    assert.equal( $('#qunit-fixture ul').length, 1);
    assert.equal( $('#qunit-fixture li').length, 1);
});

QUnit.test("test child node construction", function (assert) {
    var config = [{
            name: 'test', children: [{
                name:'foo', content: 'baz'
            }]
        }];

    menu_bar('#qunit-fixture', config);
    // Should have one unordered list with one list item
    assert.equal( $('#qunit-fixture ul').length, 2);
    assert.equal( $('#qunit-fixture li').length, 2);
});

QUnit.test("test click response", function (assert) {
    var config =  [{
            name: 'test', children: [{
                name:'foo', content: 'baz'
            }]
        }],
        parent_item, child_menu, child_item, child_content;

    menu_bar('#qunit-fixture', config);

    parent_item = $( '#menu__item--0' );
    assert.ok(parent_item);
    // root menu items should always be visible
    assert.notEqual(parent_item.css('display'), 'none');

    // Child items should be hidden until their parent is clicked
    child_menu = $( '#menu--0' );
    assert.equal(child_menu.css('display'), 'none');
    parent_item.trigger('click');
    assert.notEqual(child_menu.css('display'), 'none');

    // Now that the parent has been click the child items should also be visible
    child_item = $( '#menu__item--0-0' );
    assert.notEqual(child_item.css('display'), 'none');

    // Child content should be hidden until the child is clicked
    child_content = $('#menu__content--0-0');
    assert.equal(child_content.css('display'), 'none');
    child_item.trigger('click');
    assert.notEqual(child_content.css('display'), 'none');

});
