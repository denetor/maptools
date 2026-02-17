
## Development
Start the project for development purposes with
```shell
nvm use 24
npm run dev
```


## Class structure

Terrain: the cells of the map
Cell: a single square portion of the map. It has coordinates starting from (0,0)
CellType: the type of terrain in the cell
CellImprovement: a single improvement/construction in the cell (road, house, mine, forest, irrigation, etc...)
CellImprovements: the list of all improvements in all the terrain cells


## Wave Function Collapse Service

### Implementation strategies
#### Basic
First strategy is the most basic. It receives as input a Terrain with empty cells.
Starting from a cell with random position and type, it randomly sets the neighbour cells according to the
allowed cell types of the surrounding area.

#### Multiple tiles
In a more advanced strategy the algorithm tests tile rules basing on multiple tile blocks, and can place multiple
contigous tiles. As example a 2x2 square of water tiles results in a hith probability of having more than one water
tiles as neighbour.


### Resources
- https://excaliburjs.com/blog/Wave%20Function%20Collapse
- https://github.com/mxgmn/WaveFunctionCollapse
