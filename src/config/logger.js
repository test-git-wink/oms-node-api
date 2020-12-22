import winston from "winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  levels: winston.config.syslog.levels,
  format: combine(
    format.splat(),
    format.simple(),
    label({ label: "sysco_oms" }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({
      filename:
        "/home/windulakularatne/sysco-test-project/oms-node/log/combined.log",
      level: "info",
    }),
  ],
});

export default logger;
