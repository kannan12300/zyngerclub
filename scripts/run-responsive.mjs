import { spawn, spawnSync } from "node:child_process";
import http from "node:http";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const playwrightBin = path.join(root, "node_modules", "@playwright", "test", "cli.js");
const url = "http://127.0.0.1:3000";

let server;

function requestServer() {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(Boolean(res.statusCode && res.statusCode < 500));
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(timeoutMs = 20_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (await requestServer()) return true;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  return false;
}

function killServer() {
  if (!server?.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill.exe", ["/PID", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true
    });
  } else {
    server.kill("SIGTERM");
  }
}

async function main() {
  const alreadyRunning = await requestServer();
  if (!alreadyRunning) {
    server = spawn(process.execPath, [nextBin, "start"], {
      cwd: root,
      stdio: "inherit",
      windowsHide: true
    });

    const ready = await waitForServer();
    if (!ready) {
      killServer();
      console.error("Responsive test server did not start within 20 seconds.");
      process.exit(1);
    }
  }

  const test = spawn(
    process.execPath,
    [playwrightBin, "test", "tests/responsive.spec.ts", "--workers=1", "--reporter=line", "--timeout=60000"],
    {
      cwd: root,
      stdio: "inherit",
      env: {
        ...process.env,
        PLAYWRIGHT_SKIP_WEBSERVER: "1"
      },
      windowsHide: true
    }
  );

  const code = await new Promise((resolve) => test.on("exit", (exitCode) => resolve(exitCode ?? 1)));
  if (!alreadyRunning) killServer();
  process.exit(Number(code));
}

process.on("SIGINT", () => {
  killServer();
  process.exit(130);
});

process.on("SIGTERM", () => {
  killServer();
  process.exit(143);
});

main().catch((error) => {
  killServer();
  console.error(error);
  process.exit(1);
});
