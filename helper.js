function addWearToItemNames() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('script.js');
    (document.head || document.documentElement).appendChild(script);
    script.onload = function() {
        script.remove();
    };
    return true;
}

// script handles everything
function initialize() {
    addWearToItemNames();
}

console.log('[CS2 Wear Helper] Extension loaded');
initialize();