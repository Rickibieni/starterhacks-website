// script.js
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    let draggedBlock = null;
    let offsetX, offsetY;

    blocks.forEach(block => {
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
                snapToGrid(draggedBlock);
                draggedBlock.style.cursor = 'grab';
                draggedBlock = null;
            }
        });
    });

    function snapToGrid(block) {
        const gridSize = 50;
        const x = parseInt(block.style.left, 10);
        const y = parseInt(block.style.top, 10);

        const snapX = Math.round(x / gridSize) * gridSize;
        const snapY = Math.round(y / gridSize) * gridSize;

        block.style.left = `${snapX}px`;
        block.style.top = `${snapY}px`;
    }
});
