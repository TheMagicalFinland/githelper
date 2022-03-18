const menu = require("readline-sync");
const { exec } = require("child_process");

const execute = async(command) => {
  exec(command, (error, stdout, stderr) => {
      if (error) {
          returnToMain("The process failed:\n" + error);
      }
      if (stderr) {
          returnToMain(`stderr: ${stderr}`);
      }
  });
}

const returnToMain = async(error, time) => {
  console.clear();
  console.log(error);
  setTimeout(function(){ main(); }, time);
}

const gitPull = async() => {
  var path;
  console.clear();
  var questionpath = menu.questionPath("What is the file path your project is located in? > ");
  if (questionpath != "") {
    path = questionpath;
      pullfrom = menu.questionpullfrom;
      console.log("Pulling...");
      execute("cd " + questionpath + " && git pull").then(returnToMain("Pull executed successfully! Returning to the main menu soon.", 3000));
  } else {
    returnToMain("Invalid path, returning to main menu in 1,5 seconds...", 1500);
  }
}

const gitClone = async() => {
  var path;
  console.clear();
  var questionpath = menu.questionPath("Where would you like to clone to? (Enter the path location) > ");
  if (questionpath != "") {
    path = questionpath;
    var questionfrom = menu.question("What is the address you'd like to clone from? > ");
    if (questionfrom.startsWith("https://") || questionfrom.startsWith("http://") || questionfrom.startsWith("www.")) {
      pullfrom = menu.questionpullfrom;
      console.log("Cloning...");
      execute("cd " + questionpath + " && git clone " + questionfrom).then(returnToMain("Cloned successfully! The cloned git repository can be found from " + questionpath + ".", 3000));
    } else {
      returnToMain("Invalid cloning path. Returning to the main menu in a few seconds!", 2000);
    }
  } else {
    returnToMain("Invalid path, returning to main menu in a few seconds seconds...", 1500);
  }
}

const gitStash = async() => {
  var path;
  console.clear();
  var questionpath = menu.questionPath("Where would you like to stash changes at? (Enter the path location of your project) > ");
  if (questionpath != "") {
    path = questionpath;
      console.log("Stashing changes...");
      execute("cd " + questionpath + " && git stash").then(returnToMain("Stashing completed successfully!", 3000));
  } else {
    returnToMain("Invalid path, returning to main menu in a few seconds seconds...", 1500);
  }
}

const gitPush = async() => {
  var path;
  console.clear();
  var questionpath = menu.questionPath("Where would you like to push the changes at? (Enter the path location of your project) > ");
  if (questionpath != "") {
    path = questionpath;
      console.log("Pushing changes...");
      execute("cd " + questionpath + " && git push").then(returnToMain("Stashing completed successfully!", 3000));
  } else {
    returnToMain("Invalid path, returning to main menu in a few seconds seconds...", 1500);
  }
}

const gitCommit = async() => {
  var path;
  console.clear();
  var questionpath = menu.questionPath("Where is your project located at? (Enter the file path) > ");
  if (questionpath != "") {
    path = questionpath;
      var questionfiles = menu.question("What files would you like to commit? Use \"*\" for all. > ");
      if (!questionfiles) {
        return returnToMain("Didn't detect any files in the commit menu.", 3000);
      }
      var note = "";
      var questionreason = menu.question("Would you like to leave a note for the commit? If not, leave empty and just hit the enter key and we will add an appropriate note for it. > ");
      if (!questionreason) {
       note = "Updated things.";
      }
      await exec("cd " + questionpath + " && git commit \"" + questionfiles + "\" && git notes add -m \"" + note + "\"");
      returnToMain("Commit requested! Returning to the main menu in a few seconds.");
  } else {
    returnToMain("Invalid path, returning to main menu in a few seconds seconds...", 1500);
  }
}

const questions = async(answer) => {
  if (!answer) {
    returnToMain("Invalid option, returning to main menu in 3 seconds...", 3000);
  }
  if (answer != "1" && answer != "2" && answer != "3") {
    returnToMain("Invalid option, returning to main menu in 3 seconds...", 3000);
  }
  if (answer == "1") {
    gitPull();
  } else if (answer == "2") {
    gitStash();
  } else if (answer == "3") {
    gitPush();
  } else if (answer == "4") {
    gitClone();
  } else if (answer == "5") {
    gitCommit();
  }
}

const main = () => {
  console.log("Choose an option to begin.");
  console.log("Options:\n\n1. Git pull\n2. Git stash\n3. Git push\n4. Git clone\n5. Git commit");
  var answer = menu.question("What would you like to do > ");
  questions(answer);
}

main();