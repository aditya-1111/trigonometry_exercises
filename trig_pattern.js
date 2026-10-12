const r = require("raylib");

function setup() {
  const TITLE = "Trigonometric Pattern";
  const FPS = 30;

  const WIDTH = 800;
  const HEIGHT = 800;
  const points = 180;
  const origin = { x: WIDTH / 2, y: HEIGHT / 2 };
  const baseRadius = 150;
  const frequency = 12;
  const amplitude = 50;
  const color = {
    r: 0,
    g: 0,
    b: 255,
    a: 255
  }

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);

  return {
    WIDTH,
    HEIGHT,
    origin,
    points,
    baseRadius,
    amplitude,
    frequency,
    color
  };
}

function getRadian(angle) {
  return angle * Math.PI / 180;
}

function draw(world) {
  for (let i = 0; i <= world.points * 20; i++) {

    let angle = getRadian(i * 360 / world.points);
    const radius = world.baseRadius + world.amplitude * Math.sin(world.frequency * angle * 0.2);
    const x = world.origin.x + radius * Math.cos(angle);
    const y = world.origin.y + radius * Math.sin(angle);

    const next = {
      x: world.origin.x + (world.baseRadius + world.amplitude * Math.sin(world.frequency * (angle + getRadian(1)) * 0.2)) * Math.cos(angle + getRadian(1)),

      y: world.origin.y + (world.baseRadius + world.amplitude * Math.sin(world.frequency * (angle + getRadian(1)) * 0.2)) * Math.sin(angle + getRadian(1))
    }

    r.DrawCircle(x, y, radius * 0.02, world.color);
    r.DrawLineEx({ x, y, }, next, 2, r.GREEN);
  }

}

function loop(world) {
  while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    // r.ClearBackground(r.BLACK);

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