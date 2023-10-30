import winston from "winston";
import "winston-daily-rotate-file";

// const logger = winston.createLogger({
//   level: "debug",
//   format: winston.format.simple(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({
//       dirname: "log",
//       filename: "test.log",
//       maxsize: 1024,
//     }),
//   ],
// });

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    // winston.format.label({
    //   label: "tag",
    // }),
    // winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: "info",
      dirname: "log2",
      filename: "test-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH-mm",
      maxSize: "1k",
      format: winston.format.json(),
    }),
    // new winston.transports.Http({
    //   host: "localhost",
    //   port: "3000",
    //   path: "winstonLog",
    // }),
  ],
});

logger.info("胖胖胖胖胖胖胖胖胖胖");
logger.error("不不不");
logger.debug(666666);

winston.loggers.add("console", {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

winston.loggers.add("file", {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      dirname: "log4",
      filename: "test.log",
      format: winston.format.json(),
    }),
  ],
});

const logger1 = winston.loggers.get("console");

logger1.info("aaaaa");
logger1.error("bbbbb");

const logger2 = winston.loggers.get("file");

logger2.info("xxxx");
logger2.info("yyyy");
