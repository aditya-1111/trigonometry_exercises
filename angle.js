const r = require("raylib");

function setup() {
  const TITLE = "Angle";
  const FPS = 0;

  const WIDTH = 1000;
  const HEIGHT = 800;
  const pointA = { x: 100, y: 300 };
  const pointB = { x: 350, y: 150 };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    WIDTH,
    HEIGHT,
    pointA,
    pointB
  };
}

function getDegree(rad) {
  return rad * 180 / Math.PI;
}

function getDistance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function drawPoints(world) {
  r.DrawCircle(world.pointA.x, world.pointA.y, 5, r.RED);
  r.DrawCircle(world.pointB.x, world.pointB.y, 5, r.RED);
}

function draw(world) {
  drawPoints(world);
  r.DrawLineEx(world.pointA, world.pointB, 2, r.RED);

  const hypotenuse = getDistance(world.pointA, world.pointB);
  const horizontalDiff = getDistance(world.pointA, { x: world.pointB.x, y: world.pointA.y });
  const verticalDiff = getDistance(world.pointB, { x: world.pointB.x, y: world.pointA.y })

  const angle = Math.acos(horizontalDiff / hypotenuse);
  const degree = getDegree(angle);

  r.DrawCircleSectorLines(world.pointA, 100, 90, 90 + degree, 40, r.BLACK);

  r.DrawLineEx(world.pointA, { x: world.pointB.x, y: world.pointA.y }, 2, r.RED);
  r.DrawLineEx(world.pointB, { x: world.pointB.x, y: world.pointA.y }, 2, r.RED);

  r.DrawText(`${degree.toFixed(2)}°`, world.pointA.x, world.pointA.y + 10, 20, r.RED);
  r.DrawText(`A`, world.pointA.x - 25, world.pointA.y + 5, 20, r.RED);
  r.DrawText(`B`, world.pointB.x + 5, world.pointB.y - 25, 20, r.RED);
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    draw(world);

    r.EndDrawing();
  }
}

function teardown() {
  r.CloseWindow();
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}

main();