var structure = require('./lib/structure');

module.exports.getStructure = function (items, threshold, offset) {
    threshold = typeof offset !== 'undefined' && threshold > 0 ? threshold : 3;
    offset    = typeof offset !== 'undefined' && offset > 0 ? offset : 0;
    
    var struct = structure(items.length - offset, threshold);
    
    // Prepend 1up items based on offset
    for (var i = 0; i < offset; i++) {
        struct.unshift(1);
    }
    
    return struct;
}
