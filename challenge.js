// Rover object
// ================================
let marsRoverKata = {
  direction: "E",
  x: 0,
  y: 0,
  travelLog: [{ x: 0, y: 0 }]
};

let marsRoverAlt = {
  direction: "W",
  x: 9,
  y: 9,
  travelLog: [{ x: 9, y: 9 }]
};

// Grid
// ================================

let board = [
  ["", "", "", "", "", "", "X", "", "", ""],
  ["", "", "", "X", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "X", ""],
  ["", "", "X", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "X", "", "", "", ""],
  ["", "", "", "", "", "", "", "X", "", ""],
  ["", "", "", "", "X", "", "", "", "", ""],
  ["", "", "X", "", "", "", "", "", "", ""],
  ["X", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "X", "", "", ""]
];

// Turn sides
// ================================

function turnLeft(rover) {
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
}

function turnRight(rover) {
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
}

// Obstacle checking
// ================================

function checkObstacleFoward(rover) {
  if (
    (rover.direction === "N" && board[rover.y - 1][rover.x] === "X") ||
    (rover.direction === "E" && board[rover.y][rover.x + 1] === "X") ||
    (rover.direction === "S" && board[rover.y + 1][rover.x] === "X") ||
    (rover.direction === "W" && board[rover.y][rover.x - 1] === "X")
  ) {
    console.log("There is an obstacle in the way!");
    return true;
  }
}

function checkObstacleBackward(rover) {
  if (
    (rover.direction === "N" && board[rover.y + 1][rover.x] === "X") ||
    (rover.direction === "E" && board[rover.y][rover.x - 1] === "X") ||
    (rover.direction === "S" && board[rover.y - 1][rover.x] === "X") ||
    (rover.direction === "W" && board[rover.y][rover.x + 1] === "X")
  ) {
    console.log("There is an obstacle in the way!");
    return true;
  }
}

// Other rover in the way checking
// ================================

function checkOtherRoverInFront(rover, otherRover) {
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
}

function checkOtherRoverBehind(rover, otherRover) {
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
}

// Movements to outside the board checking
// =======================================

function checkInvalidForwardMovement(rover) {
  if (
    (rover.x === 0 && rover.direction === "W") ||
    (rover.x === 9 && rover.direction === "E") ||
    (rover.y === 0 && rover.direction === "N") ||
    (rover.y === 9 && rover.direction === "S")
  ) {
    console.log("You can't place rover outside of the board!");
    return true;
  }
}

function checkInvalidBackwardMovement(rover) {
  if (
    (rover.x === 0 && rover.direction === "E") ||
    (rover.x === 9 && rover.direction === "W") ||
    (rover.y === 0 && rover.direction === "S") ||
    (rover.y === 9 && rover.direction === "N")
  ) {
    console.log("You can't place rover outside of the board!");
    return true;
  }
}

// Movements
// ================================

function moveForward(rover, otherRover) {
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
}

function moveBackward(rover, otherRover) {
  if (checkInvalidBackwardMovement(rover) || checkObstacleBackward(rover) || checkOtherRoverBehind(rover, otherRover)) {
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
}

// Commands checking
// ================================

function command(rover, otherRover, orders) {
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
}

// Commands section
// ================================

// First rover
// ================================
console.log("Kata calls:")
command(marsRoverKata, marsRoverAlt, "rffrfflfrff"); // <= Commands go here
console.log("Kata travel log:");
console.log(marsRoverKata.travelLog);


// Second rover
// ================================
console.log("Alt calls:")
command(marsRoverAlt, marsRoverKata, ""); // <= Commands go here
console.log("Alt travel log:");
console.log(marsRoverAlt.travelLog);
