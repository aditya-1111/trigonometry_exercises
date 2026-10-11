const r = require("raylib");

function setup() {
  const TITLE = "";
  const FPS = 0;

  const WIDTH = 1000;
  const HEIGHT = 800;
  const origin = { x: 300, y: 200 };
  const horizontalRadius = 200;
  const verticalRadius = 100;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    WIDTH,
    HEIGHT,
    origin,
    horizontalRadius,
    verticalRadius,
  };
}

function getRadian(angle) {
  return (angle * Math.PI / 180);
}

function draw(world) {
  for (let i = 0; i <= 360; i = i + 1) {
    const rad = getRadian(i);
    const x = world.origin.x + world.horizontalRadius * Math.cos(rad);
    const y = world.origin.y + world.verticalRadius * Math.sin(rad);

    const st = { x, y };
    const end = {
      x: world.origin.x + world.horizontalRadius * Math.cos(getRadian(i + 1)),
      y: world.origin.y + world.verticalRadius * Math.sin(getRadian(i + 1))
    }
    // Point
    r.DrawCircle(x, y, 1, r.BLUE);

    //Line
    r.DrawLineEx(st, end, 2, r.BLUE);
  }
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