export const mongoURL = (env: string) => {
  return {
    development: "mongodb://localhost:27017/lime",
    test: "mongodb://localhost:27017/limeTest",
  }[env || "development"];
};
