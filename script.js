const rows = 1;
const cols = 10;
const grid = document.getElementById('grid');

for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'cell'+(i+1));
    grid.appendChild(cell);
}