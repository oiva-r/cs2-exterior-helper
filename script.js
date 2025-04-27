(function() {
    console.log('[CS2 Wear Helper] script running');    
    const originalGetEscapedNameForItem = GetEscapedNameForItem;

    window.GetEscapedNameForItem = function(item) {
        try {
            // check if this is a CS2 item with exterior tag
            if (item && item.description && 
                item.description.tags && 
                item.description.appid == 730) {

                // find exterior tag
                const exteriorTag = item.description.tags.find(tag => tag.category === "Exterior");
                
                if (exteriorTag && item.description.name) {
                    // Only modify if it doesn't already have wear condition
                    if (!item.description.name.includes("(Field-Tested)") && 
                        !item.description.name.includes("(Well-Worn)") && 
                        !item.description.name.includes("(Battle-Scarred)") && 
                        !item.description.name.includes("(Minimal Wear)") && 
                        !item.description.name.includes("(Factory New)")) {
                        
                        // get wear condition
                        const wearCondition = exteriorTag.localized_tag_name;

                        // update the name
                        if (wearCondition !== "Not Painted") {
                            item.description.name = `${item.description.name} (${wearCondition})`;
                            console.log(`[CS2 Wear Helper] Modified item name: ${item.description.name}`);
                        }   
                    }
                }
            }
        } catch (e) {
            console.error('[CS2 Wear Helper] Error in GetEscapedNameForItem hook:', e);
        }
        // Call original function with modified item
        return originalGetEscapedNameForItem.apply(this, arguments);
    };
})();