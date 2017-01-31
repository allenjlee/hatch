var structure = require('../lib/structure'),
    test      = require('tap').test;


test("Structure with odd pack items", function (t) {
    var length    = 5,
        threshold = 3,
        wanted    = [ 2, 2, 3, 3, 3 ];
        
    var found = structure(length, threshold);
    
    t.equals(found.toString(), wanted.toString(), "Should produce 1 2up and 1 3up");
    
    t.end();
});

test("Structure with even pack items", function (t) {
    var length    = 6,
        threshold = 3,
        wanted    = [ 2, 2, 2, 2, 2, 2 ];

    var found = structure(length, threshold);
    
    t.equals(found.toString(), wanted.toString(), "Should produce 3 2up");
    
    t.end();
});

test("Structure with 11 items", function (t) {
    var length    = 9,
        threshold = 3,
        wanted    = [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ];

    var found = structure(length, threshold);
    
    t.equals(found.toString(), wanted.toString(), "Should produce 3 2up");
    
    t.end();
});


test("Structure with 45 items", function (t) {
    var length    = 42,
        threshold = 3,
        wanted    = [ 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2 ];

    var found = structure(length, threshold);
    
    t.equals(found.toString(), wanted.toString(), "Should produce 3 2up");
    
    t.end();
});
