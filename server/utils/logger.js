const pino = require("pino");
// const pretty = require('pino-pretty')

// Create a logging instance
// const logger = pino({
//   level: process.env.NODE_ENV === "production" ? "info" : "debug",
//   prettyPrint: process.env.NODE_ENV !== "production",
// });

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
    },
  },
});

module.exports.logger = logger;
