// Rover object
// ================================
let marsRoverKata = {
  name: "Kata",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [{ x: 0, y: 0 }]
};

let marsRoverAlt = {
  name: "Alt",
  direction: "S",
  x: 9,
  y: 9,
  travelLog: [{ x: 9, y: 9 }]
};

// Grid
// ================================

let board = [];
for (let i = 0; i < 10; i++) {
  board.push([]);
  for (let j = 0; j < 10; j++) {
    board[i].push("");
  }
}
for (let i = 0; i < 10; i++) {
  board[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)] = "X";
}
board[0][0] = "";
board[9][9] = "";
console.table(board); // <- Show grid and its obstacles

// Turn sides
// ================================

let turnLeft = rover => {
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  console.log("turnLeft was called");
};

let turnRight = rover => {
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log("turnRight was called");
};

// Obstacle checking
// ================================

let checkObstacleFoward = rover => {
  if (
    (rover.direction === "N" && board[rover.y - 1][rover.x] === "X") ||
    (rover.direction === "E" && board[rover.y][rover.x + 1] === "X") ||
    (rover.direction === "S" && board[rover.y + 1][rover.x] === "X") ||
    (rover.direction === "W" && board[rover.y][rover.x - 1] === "X")
  ) {
    console.log("There is an obstacle in the way!");
    return true;
  }
};

let checkObstacleBackward = rover => {
  if (
    (rover.direction === "N" && board[rover.y + 1][rover.x] === "X") ||
    (rover.direction === "E" && board[rover.y][rover.x - 1] === "X") ||
    (rover.direction === "S" && board[rover.y - 1][rover.x] === "X") ||
    (rover.direction === "W" && board[rover.y][rover.x + 1] === "X")
  ) {
    console.log("There is an obstacle in the way!");
    return true;
  }
};

// Other rover in the way checking
// ================================

let checkOtherRoverInFront = (rover, otherRover) => {
  if (
    (rover.direction === "N" &&
      rover.y - 1 === otherRover.y &&
      rover.x === otherRover.x) ||
    (rover.direction === "E" &&
      rover.y === otherRover.y &&
      rover.x + 1 === otherRover.x) ||
    (rover.direction === "S" &&
      rover.y + 1 === otherRover.y &&
      rover.x === otherRover.x) ||
    (rover.direction === "W" &&
      rover.y === otherRover.y &&
      rover.x - 1 === otherRover.x)
  ) {
    console.log("There is another rover in the way!");
    return true;
  }
};

let checkOtherRoverBehind = (rover, otherRover) => {
  if (
    (rover.direction === "N" &&
      rover.y + 1 === otherRover.y &&
      rover.x === otherRover.x) ||
    (rover.direction === "E" &&
      rover.y === otherRover.y &&
      rover.x - 1 === otherRover.x) ||
    (rover.direction === "S" &&
      rover.y - 1 === otherRover.y &&
      rover.x === otherRover.x) ||
    (rover.direction === "W" &&
      rover.y === otherRover.y &&
      rover.x + 1 === otherRover.x)
  ) {
    console.log("There is another rover in the way!");
    return true;
  }
};

// Movements to outside the board checking
// =======================================

let checkInvalidForwardMovement = rover => {
  if (
    (rover.x === 0 && rover.direction === "W") ||
    (rover.x === 9 && rover.direction === "E") ||
    (rover.y === 0 && rover.direction === "N") ||
    (rover.y === 9 && rover.direction === "S")
  ) {
    console.log("You can't place rover outside of the board!");
    return true;
  }
};

let checkInvalidBackwardMovement = rover => {
  if (
    (rover.x === 0 && rover.direction === "E") ||
    (rover.x === 9 && rover.direction === "W") ||
    (rover.y === 0 && rover.direction === "S") ||
    (rover.y === 9 && rover.direction === "N")
  ) {
    console.log("You can't place rover outside of the board!");
    return true;
  }
};

// Movements
// ================================

let moveForward = (rover, otherRover) => {
  if (
    checkInvalidForwardMovement(rover) ||
    checkObstacleFoward(rover) ||
    checkOtherRoverInFront(rover, otherRover)
  ) {
    return;
  }
  switch (rover.direction) {
    case "N":
      rover.y--;
      break;
    case "E":
      rover.x++;
      break;
    case "S":
      rover.y++;
      break;
    case "W":
      rover.x--;
      break;
  }
  let newPosition = { x: rover.x, y: rover.y };
  rover.travelLog.push(newPosition);
  console.log("moveForward was called");
};

let moveBackward = (rover, otherRover) => {
  if (
    checkInvalidBackwardMovement(rover) ||
    checkObstacleBackward(rover) ||
    checkOtherRoverBehind(rover, otherRover)
  ) {
    return;
  }
  switch (rover.direction) {
    case "N":
      rover.y++;
      break;
    case "E":
      rover.x--;
      break;
    case "S":
      rover.y--;
      break;
    case "W":
      rover.x++;
      break;
  }
  let newPosition = { x: rover.x, y: rover.y };
  rover.travelLog.push(newPosition);
  console.log("moveBackward was called");
};

// Commands checking
// ================================

let command = (rover, otherRover, orders) => {
  console.log(`${rover.name} calls:`);
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i].toLowerCase();
    switch (order) {
      case "f":
        moveForward(rover, otherRover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "b":
        moveBackward(rover, otherRover);
        break;
      default:
        break;
    }
  }
  console.log(`${rover.name} travel log:`);
  console.log(rover.travelLog);
};

// Commands section
// ================================

// First rover
// ================================
command(marsRoverKata, marsRoverAlt, "rffrfflfrff"); // <- Commands go here

// Second rover
// ================================
command(marsRoverAlt, marsRoverKata, "rffrfflfrff"); // <- Commands go here
