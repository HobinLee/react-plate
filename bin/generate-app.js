#! /usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx hov-react-plate my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = 'https://github.com/hobinlee/react-ts.git';

if (projectName !== ".") {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(projectName);
      console.log(
        `The file ${projectName} already exist in the current directory, please give it another name.`
      );
    } else {
      console.log(error);
    }
    process.exit(1);
  }
}

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`); // 우리의 보일러 플레이트를 clone!

    if (projectName !== ".") {
      process.chdir(projectPath); // cd입니다 clone을 마친 후 projectPath로 진입
    }

    console.log("Installing dependencies...");
    execSync("yarn"); // package.json에 있는 의존성 설치

    console.log("Removing useless files");
    execSync("npx rimraf ./.git"); // 이제 보일러플레이트 git과 관련된 내용 제거


    /*
      echo "# interview" >> README.md
      git init
      git add README.md
      git commit -m "first commit"
      git branch -M main
      git push -u origin main
    */

    console.log("Initialize git files");
    execSync(`echo "# ${projectName}" >> README.md`);
    execSync("git init");
    execSync("git add .");
    execSync(`git commit -m "init: initial commit"`);
    execSync("git branch -M main");

    console.log("The installation is done, this is ready to use !");
    console.log("To connect with your git repository, type this: ");
    console.log("    git remote add origin https://YOUR_GIT_REPOSITORY.git");
    console.log("    git push -u origin main")
  } catch (error) {
    console.log(error);
  }
}

main();