/*
Write a function that receives an array of strings that represent friend connections along with the names of the two people and returns a number representing the degress of separation between the two people
The connections will be represented by an array of strings with each string taking the format name1: name2 (for example alice: bob). You can assume that the strings representing the connections will always be lower case a-z only.
The names of the people to find the degress of separation between will always be non-empty string e.g. "alice" or "bob"
Your function will return the number of degrees of separation between the two people. If no connection can be made through friends or friends of friends etc then return -1

Example 1

connections = ["fred: joe", "joe: marry", "marry: fred", "marry: bill"]
name1 = fred
name2 = bill
result = 2
*/

// Create a graph structure

class Graph {
    constructor(){
        this.adjList = {}
    }

    addVertex(vertex) {
        if (!this.adjList[vertex]) this.adjList[vertex] = [];
    }

    addEdge(v1, v2) {
        if (!this.adjList[v1].includes(v2)) this.adjList[v1].push(v2);
        if (!this.adjList[v2].includes(v1)) this.adjList[v2].push(v1);
    }

    BFS(startVertex) {
        let result = [];
        let queue = [startVertex];
        let visited = new Set();
        visited.add(startVertex);
        let popVertex;

        while(queue.length > 0) {
            popVertex = queue.pop();
            result.push(popVertex);

            this.adjList[popVertex].forEach(adjVertex => {
                if(!visited.has(adjVertex)) {
                    visited.add(adjVertex);
                    queue.unshift(adjVertex);
                }
            })
        }
        return result;
    }

    BFSDistance(startVertex, destVertex) {
        let queue = [[startVertex, 0]];
        let visited = new Set();
        visited.add(startVertex);
        let popVertex;
        let distance;

        while(queue.length > 0) {
            [popVertex, distance] = queue.shift();
            
            if (popVertex === destVertex) return distance;

            this.adjList[popVertex].forEach(adjVertex => {
                if(!visited.has(adjVertex)) {
                    visited.add(adjVertex);
                    queue.push([adjVertex, distance + 1]);
                }
            })
        }
        return -1;
    }
};

function extractString(string) {
    let res = string.split(":");
    return res;
}

function solution(connections, name1, name2) {

    // Extract pair names from connections
    // Convert the connections to graph, then try to find a way from name1 to name2
    let graph = new Graph();
    let data;

    connections.forEach(pair => {
        data = extractString(pair);
        graph.addVertex(data[0]);
        graph.addVertex(data[1]);
        graph.addEdge(data[0], data[1]);
    });

    function BFS(graph, startVertex, destVertex) {

        let queue = [[startVertex, 0]];
        let visited = new Set();
        visited.add(startVertex);
        let popVertex, distance;

        while(queue.length > 0) {
            [popVertex, distance] = queue.pop();
            
            if (popVertex === destVertex) return distance;

            graph.adjList[popVertex].forEach(adjVertex => {
                if(!visited.has(adjVertex)) {
                    visited.add(adjVertex);
                    queue.unshift([adjVertex, distance+1]);
                }
            })
        }
        return -1;
    };

    return BFS(graph, name1, name2);
};

// let g = new Graph();
// g.addVertex('Haven');
// g.addVertex('Dungeon');
// g.addVertex('Academy');
// g.addVertex('Necro');
// g.addVertex('Fortress');
// g.addVertex('Stronghold');
// g.addEdge('Necro', 'Haven');
// g.addEdge('Necro', 'Academy');
// g.addEdge('Necro', 'Dungeon');
// g.addEdge('Haven', 'Academy');
// g.addEdge('Fortress', 'Stronghold');

// console.log(g.BFSDistance('Dungeon', 'Fortress'));


// console.log(extractString('Necro:Haven'));

let connection = ['Necro:Haven','Necro:Academy', 'Necro:Dungeon', 'Academy:Haven', 'Fortress: Stronghold'];
const name1 = 'Necro';
const name2 = 'Haven';
const name3 = 'Dungeon';
console.log(solution(connection, name3, name2));