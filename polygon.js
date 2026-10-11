const r = require("raylib");

function setup() {
  const TITLE = "";
  const FPS = 50;

  const WIDTH = 800;
  const HEIGHT = 800;

  const center = { x: 200, y: 200 };
  const radius = 150;
  const totalSides = 7;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    WIDTH,
    HEIGHT,
    center,
    radius,
    totalSides,
  };
}

function drawLine(st, end) {
  r.DrawLineEx(st, end, 1, r.RED);
}

function drawPixel(x, y) {
  r.DrawPixel(x, y, r.RED)
}

function draw(world) {
  const radianBetweenEach = 2 * Math.PI / world.totalSides;
  const coordinates = [];

  for (let i = 0; i < world.totalSides; i++) {
    const radian = i * radianBetweenEach;
    const x = Math.round(world.center.x + world.radius * Math.cos(radian));
    const y = Math.round(world.center.y + world.radius * Math.sin(radian));

    coordinates.push({ x, y });
    drawPixel(x, y);
  }

  for (let i = world.totalSides - 1; i >= 0; i--) {
    drawLine(coordinates.at(i), coordinates.at(i - 1));
  }
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

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