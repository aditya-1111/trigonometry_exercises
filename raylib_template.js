const r = require("raylib");

function setup() {
  const TITLE = "";
  const FPS = 50;

  const WIDTH = 800;
  const HEIGHT = 800;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    WIDTH,
    HEIGHT,
  };
}

function draw(world) {
  r.DrawRectangle(0, 0, 100, 100, r.RED);
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