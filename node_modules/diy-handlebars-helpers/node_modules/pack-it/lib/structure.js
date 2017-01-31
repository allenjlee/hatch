module.exports = function (length, threshold) {
    var tightPack = 0,
        loosePack = 0,
        tightPackSize = 0,
        loosePackSize = 0;
    
    tightPackMultiplier = Math.floor(length / threshold);
    tightPackSize = threshold;
    
    loosePack = length % threshold;
    
    if (loosePack === 0 && length % 2 === 0) {
        // Swap them to favor loose packing if the length is even
        loosePackSize = threshold - 1;
        loosePack = tightPackMultiplier * tightPackSize;
        
        // Reset tight pack
        tightPackMultipier = 0;
        tightPackSize      = 0;
    } else if (loosePack % 2 !== 0) {
        // If odd
        tightPackMultiplier--;
        loosePackSize = loosePack + 1;
        loosePack = Math.pow(loosePackSize, 2);
    } else {
        // Nice even remainder
        loosePackSize = loosePack;
    }
    
    tightPack = tightPackMultiplier * tightPackSize;
    
    var structure = [];
    
    var i = 0;
    for (i = 0; i < loosePack; i++) {
        structure.push(loosePackSize);
    }
    
    for (i = 0; i < tightPack; i++) {
        structure.push(tightPackSize);
    }
    
    return structure;
};
