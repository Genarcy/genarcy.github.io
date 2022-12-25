(function(){
    const q = (selector) => document.querySelector(selector);

    const gCanvasElement = q('#unity-canvas');
    const gameContainer = q('body')    

    const initialDimensions = {width: parseInt(gCanvasElement.style.width, 10), height: parseInt(gCanvasElement.style.height, 10)};

    gameContainer.style.width = '100%';
    gameContainer.style.height = '100%';

    const getCanvasFromMutationsList = (mutationsList) => {
        for (let mutationItem of mutationsList){
            for (let addedNode of mutationItem.addedNodes){
                if (addedNode.id === '#canvas'){
                    return addedNode;
                }
            }
        }
        return null;
    }

    const setDimensions = () => {
        gameContainer.style.position = 'absolute';
        gameContainer.style.overflow = 'hidden';
        var winW = parseInt(window.getComputedStyle(gameContainer).width, 10);
        var winH = parseInt(window.getComputedStyle(gameContainer).height, 10);

        const widthDim = initialDimensions.width == 0 ? minW : winW / initialDimensions.width;
        const heightDim = initialDimensions.height == 0 ? winH : winH / initialDimensions.height;

        var scale = Math.min(widthDim, heightDim);

        gCanvasElement.style.display = '';
        gCanvasElement.style.overflow = 'hidden';
        gCanvasElement.setAttribute('scrolling','no');

        var fitW = Math.round(initialDimensions.width * scale * 100) / 100;
        var fitH = Math.round(initialDimensions.height * scale * 100) / 100;

        gCanvasElement.style.width = fitW + "px";
        gCanvasElement.style.height = fitH + "px";
    }

    window.setDimensions = setDimensions;

    const registerCanvasWatcher = () => {
        let debounceTimeout = null;
        const debouncedSetDimensions = () => {
            if (debounceTimeout !== null) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = setTimeout(setDimensions, 200);
        }
        window.addEventListener('resize', debouncedSetDimensions, false);
        setDimensions();
    }

    const i = 0;
    registerCanvasWatcher();

    new MutationObserver(function (attributesMutation) {
        this.disconnect();
        setTimeout(setDimensions, 1)                
    }).observe(gameContainer, {attributes:true});
})();