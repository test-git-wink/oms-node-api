import winston from "winston";

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({
      filename: "combined.log",
      level: "info",
    }),
  ],
});

export default logger;
