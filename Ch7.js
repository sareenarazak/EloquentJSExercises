const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place !== this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place !== p.address);
            return new VillageState(destination, parcels);
        }
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));
            } while (place === address);
            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels);
    };

}
const villageState = VillageState.random();

function runRobot(state, robot, memory) {
    let turnsTaken;
    for (let turn = 0;; turn++) {
        if (state.parcels.length === 0 || turn === 40) {
            console.log(`Done in ${turn} turns`);
            turnsTaken = turn;
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
    return turnsTaken;
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

// **************** RANDOM ********************* //
//runRobot(villageState, randomRobot);


// ************** TWO PASS ******************//
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];


function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}


//runRobot(villageState, routeRobot, []);


// ******** Shortest path *********//

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}
function goalOrientedRobot({place, parcels}, route) {
    if (route.length === 0) {
        let parcel = parcels[0];
        if (parcel.place !== place) {
            // Robot goes to the location that has the first parcel
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            // if robot is already at the first parcel's location, it finds the route to the destination
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

//runRobot(villageState, goalOrientedRobot, []);

// Exercise 1 : Compare two pass robot and goal oriented robot performance
/**
 * Write a function compareRobots that takes two robots (and their starting memory).
 * It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.
 *
 * For the sake of fairness, make sure you give each task to both robots,
 * rather than generating different tasks per robot.
 */
function compareRobots(robot1, memory1, robot2, memory2, robot3, memory3) {
    let turnsTaken1 = [];
    let turnsTaken2 = [];
    let turnsTaken3 = []
    for(let round = 0; round < 100; round++) {
        let villageState = VillageState.random();
        turnsTaken1[round] = runRobot(villageState, robot1, memory1);
        turnsTaken2[round] = runRobot(villageState, robot2, memory2);
        turnsTaken3[round] = runRobot(villageState, robot3, memory3);

    }
    console.log(`${robot1.name} took an average of ${calculateAvg(turnsTaken1)}`);
    console.log(`${robot2.name} took an average of ${calculateAvg(turnsTaken2)}`);
    console.log(`${robot3.name} took an average of ${calculateAvg(turnsTaken3)}`);

}

function calculateAvg(numbers) {
    return numbers.reduce((n1, n2) => n1 + n2)/numbers.length;
}

//***** Better way --> 1) instead of robot starting with parcel[0] - we could go through all the parcels and calculate their delivery route
// sort by the shortest one ( closest) and deliver/pickup them in order
function shortestRouteRobot({place, parcels}, route) {
    if(route.length === 0) {
        let deliverRoutes = [];
        let pickUpRoutes = [];
        console.log("Calculating new routes");

        for(let parcel of parcels) {
            if (parcel.place !== place) {
                pickUpRoutes.push(findRoute(roadGraph, place, parcel.place));
            } else {
               deliverRoutes.push(findRoute(roadGraph, place, parcel.address));
            }
        }

        // IMPORTANT : js converts numbers to strings and sorts that way
        pickUpRoutes.sort((p1, p2) => p1.length - p2.length);
        deliverRoutes.sort((d1, d2) => d1.length - d2.length);

        // if rout is 0  -->  we need to pick up more parcels
        route = pickUpRoutes.length === 0 ? deliverRoutes[0] : pickUpRoutes[0];
    }

    return {direction: route[0] , memory: route.slice(1)};
}

compareRobots(routeRobot, [], goalOrientedRobot, [], shortestRouteRobot, []);
