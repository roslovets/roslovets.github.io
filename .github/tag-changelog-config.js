module.exports = {
  types: [
    { types: ["feat", "feature"], label: "๐ New Features" },
    { types: ["fix", "bugfix"], label: "๐ Bugfixes" },
    { types: ["improvements", "enhancement"], label: "๐จ Improvements" },
    { types: ["perf"], label: "๐๏ธ Performance Improvements" },
    { types: ["build", "ci"], label: "๐๏ธ Build System" },
    { types: ["refactor"], label: "๐  Refactors" },
    { types: ["doc", "docs"], label: "๐ Documentation Changes" },
    { types: ["test", "tests"], label: "๐ Tests" },
    { types: ["style"], label: "๐ Code Style Changes" },
    { types: ["chore"], label: "๐งน Chores" },
    { types: ["other"], label: "Other Changes" },
  ],

  excludeTypes: ["other"],

  renderTypeSection: function (label, commits) {
    commits = commits.filter((commit) => !commit.subject.endsWith("[skip ci]"));
    if (commits.length > 0) {
      let text = `\n## ${label}\n`;
      commits.forEach((commit) => {
        text += `- ${commit.subject}\n`;
      });
      return text;
    } else {
      return "";
    }
  },

  renderChangelog: function (release, changes) {
    return changes;
  },
};
