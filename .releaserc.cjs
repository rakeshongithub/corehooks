// .releaserc.js
module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/rakeshongithub/corehooks.git", // update to your repo URL
  plugins: [
    "@semantic-release/commit-analyzer", // determines release type from commits
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          "package.json",
          "package-lock.json",
          "dist/**",
          "CHANGELOG.md",
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
