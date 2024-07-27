// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let draggedBlock = null;
    let offsetX, offsetY;
    let isCloning = false;

    function createBlock(x, y) {
        const newBlock = document.createElement('div');
        newBlock.classList.add('block');
        newBlock.style.left = `${x}px`;
        newBlock.style.top = `${y}px`;
        newBlock.style.backgroundColor = '#4CAF50'; // You can randomize color or use specific colors
        container.appendChild(newBlock);

        // Add drag functionality to the new block
        addDragListeners(newBlock);
    }

    function addDragListeners(block) {
        block.addEventListener('mousedown', (e) => {
            draggedBlock = block;
            offsetX = e.clientX - block.getBoundingClientRect().left;
            offsetY = e.clientY - block.getBoundingClientRect().top;
            block.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (draggedBlock) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                draggedBlock.style.left = `${x}px`;
                draggedBlock.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (draggedBlock) {
                if (isCloning) {
                    createBlock(parseInt(draggedBlock.style.left, 10), parseInt(draggedBlock.style.top, 10));
                    isCloning = false;
                } else {
                    snapToGrid(draggedBlock);
                }
                draggedBlock.style.cursor = 'grab';
                draggedBlock = null;
            }
        });
    }

    function snapToGrid(block) {
        const gridSize = 50;
        const x = parseInt(block.style.left, 10);
        const y = parseInt(block.style.top, 10);

        const snapX = Math.round(x / gridSize) * gridSize;
        const snapY = Math.round(y / gridSize) * gridSize;

        block.style.left = `${snapX}px`;
        block.style.top = `${snapY}px`;
    }

    // Initialize the source block with drag listeners
    const sourceBlock = document.getElementById('sourceBlock');
    addDragListeners(sourceBlock);

    sourceBlock.addEventListener('mousedown', () => {
        isCloning = true;
    });
});
