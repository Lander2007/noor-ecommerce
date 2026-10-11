import { spawn } from "node:child_process";

const action = process.argv[2] || "dev";
const port = process.env.PORT || "8443";

let args = [];
if (action === "dev") {
  args = ["next", "dev", "--webpack", "-H", "0.0.0.0", "-p", port];
} else if (action === "build") {
  args = ["next", "build"];
} else if (action === "start") {
  args = ["next", "start", "-H", "0.0.0.0", "-p", port];
}

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, ...(action === "build" ? { NODE_ENV: "production" } : {}) },
});

child.on("exit", (code) => process.exit(code ?? 0));
