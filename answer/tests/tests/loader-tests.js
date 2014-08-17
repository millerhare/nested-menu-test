/*
 * Tests for the loader module
 */

QUnit.test("test QUnit", function (assert) {
    assert.ok(true);   // better work...
    assert.ok(1);      // also should work
    assert.ok({});     
    assert.ok([1, ]);
});

QUnit.test("test presence", function (assert) {
    assert.ok(loader);
});

QUnit.asyncTest("test get something's loaded", function (assert) {
    loader('/config.json', function (loaded) {
        assert.ok(loaded);
        // Let qunit know the async tests are complete
        QUnit.start();
    });
});

QUnit.asyncTest("test loaded thing is correct", function (assert) {
    var expected_length = [4, 3, 3];

    loader('/config.json', function (loaded) {
        console.log(loaded);
        assert.equal(loaded.length, 3);

        for (var parent = loaded.length - 1; parent >= 0; parent--) {
            assert.equal(loaded[parent].children.length, expected_length[parent]);
        }
        // Let qunit know the async tests are complete
        QUnit.start();
    });
});



