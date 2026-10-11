const r = require("raylib");

function setup() {
  const TITLE = "Points around a circle";
  const FPS = 50;

  const HEIGHT = 400;
  const WIDTH = 400;

  const center = { x: 200, y: 200 };
  const radius = 150;
  const numberOfPoints = 12;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    HEIGHT,
    WIDTH,
    center,
    radius,
    numberOfPoints,
  };
}

function draw(world) {
  const spacingBetweenPoints = 2 * Math.PI / world.numberOfPoints;

  r.DrawCircle(world.center.x, world.center.y, world.radius, r.WHITE);

  for (let i = 0; i < world.numberOfPoints; i++) {
    const radian = i * spacingBetweenPoints;
    const x = Math.round(world.center.x + world.radius * Math.cos(radian));
    const y = Math.round(world.center.y + world.radius * Math.sin(radian));

    r.DrawCircle(x, y, 3, r.RED)
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