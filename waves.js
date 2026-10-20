const r = require("raylib");

function setup() {
  const TITLE = "";
  const FPS = 50;

  const WIDTH = 600;
  const HEIGHT = 400;
  const origin = { x: 50, y: 200 };
  const amplitude = 100;
  const frequency = 0.025;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    WIDTH,
    HEIGHT,
    origin,
    amplitude,
    frequency
  };
}

function drawLine(c1, c2) {
  r.DrawLineEx(c1, c2, 2, r.RED);
}

function drawAxis(world) {
  const origin = world.origin;

  // Horizontal Axis
  r.DrawLineEx({ x: 0, y: origin.y }, { x: world.WIDTH, y: origin.y }, 2, r.BLACK);
  // Vertical Axis
  r.DrawLineEx({ x: origin.x, y: 0 }, { x: origin.x, y: world.WIDTH }, 2, r.BLACK);
}

function drawSinWave(world) {
  for (let i = 0; i < world.WIDTH; i = i + 5) {
    const x = world.origin.x + i;
    const y = world.origin.y - Math.sin((i) * world.frequency) * world.amplitude;

    const st = { x, y };
    const end = {
      x: x + 5,
      y: world.origin.y - Math.sin(((i + 5)) * world.frequency) * world.amplitude
    }

    r.DrawCircle(x, y, 1, r.RED);
    r.DrawLineEx(st, end, 2, r.RED);
  }
}

function drawCosWave(world) {
  for (let i = 0; i < world.WIDTH; i = i + 5) {

    const x = world.origin.x + i;
    const y = world.origin.y - Math.cos((i) * world.frequency) * world.amplitude;

    const st = { x, y };
    const end = {
      x: x + 5,
      y: world.origin.y - Math.cos(((i + 5)) * world.frequency) * world.amplitude
    }

    r.DrawCircle(x, y, 1, r.GREEN);
    r.DrawLineEx(st, end, 2, r.GREEN);
  }
}

function drawLabel(world) {
  r.DrawText("0", world.origin.x - 15, world.origin.y - 15, 15, r.BLACK);
  r.DrawText("1", world.origin.x - 20, world.origin.y - world.amplitude, 15, r.BLACK);
  r.DrawText("-1", world.origin.x - 20, world.origin.y + world.amplitude, 15, r.BLACK);

}

function draw(world) {
  drawAxis(world);

  drawSinWave(world);
  drawCosWave(world);

  drawLabel(world);
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