(function () {
    "use strict";
    let dragAndDropModule = function (draggableElements) {

        let elemYoureDragging = null
            , dataString = 'text/html'
            , elementDragged = null
            , draggableElementArray = Array.prototype.slice.call(draggableElements) //Turn NodeList into array
            , dragonDrop = {}; //Put all our methods in a lovely object

        // Change the dataString type since IE doesn't support setData and getData correctly.
        dragonDrop.changeDataStringForIe = (function () {
            let userAgent = window.navigator.userAgent,
                msie = userAgent.indexOf('MSIE '),       //Detect IE
                trident = userAgent.indexOf('Trident/'); //Detect IE 11

            if (msie > 0 || trident > 0) {
                dataString = 'Text';
                return true;
            } else {
                return false;
            }
        })();


        dragonDrop.bindDragAndDropAbilities = function (elem) {
            elem.setAttribute('draggable', 'true');
            elem.addEventListener('dragstart', dragonDrop.handleDragStartMove, false);
            elem.addEventListener('dragenter', dragonDrop.handleDragEnter, false);
            elem.addEventListener('dragover', dragonDrop.handleDragOver, false);
            elem.addEventListener('dragleave', dragonDrop.handleDragLeave, false);
            elem.addEventListener('drop', dragonDrop.handleDrop, false);
            elem.addEventListener('dragend', dragonDrop.handleDragEnd, false);
        };

        dragonDrop.handleDragStartMove = function (e) {
            let dragImg = document.createElement("img");
            // dragImg.src = "http://alexhays.com/i/long%20umbrella%20goerge%20bush.jpeg";

            elementDragged = this;

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData(dataString, this.innerHTML);
            //e.dataTransfer.setDragImage(dragImg, 20, 50); //idk about a drag image
        };

        dragonDrop.handleDragEnter = function (e) {
            if (elementDragged !== this) {
                this.style.boxShadow = "0 0 6px #00000029";
            }
        };

        dragonDrop.handleDragOver = function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        };

        dragonDrop.handleDragLeave = function (e) {
            this.style.boxShadow = "initial";
        };

        dragonDrop.handleDrop = function (e) {
            if (elementDragged !== this) {
                let data = e.dataTransfer.getData(dataString);
                elementDragged.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData(dataString);
            }
            this.style.boxShadow = "initial";
            e.stopPropagation();
            return false;
        };

        dragonDrop.handleDragEnd = function (e) {
            this.style.boxShadow = "initial";
        };

        // Actiavte Drag and Dropping on whatever element
        draggableElementArray.forEach(dragonDrop.bindDragAndDropAbilities);
    };

    let allDraggableElements = document.querySelectorAll('.dishes-item-bar');
    dragAndDropModule(allDraggableElements);

})();
