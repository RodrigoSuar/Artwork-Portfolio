const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter commit message: ", (message) => {
  try {
    execSync("npm run build:ui", { stdio: "inherit" });
    execSync("npm run exit", { stdio: "inherit" });
    execSync("git add .", { stdio: "inherit" });
    execSync(`git commit -m "${message}"`, { stdio: "inherit" });
    execSync("git push", { stdio: "inherit" });
  } catch (err) {
    console.error("Error:", err.message);
  }
  rl.close();
});