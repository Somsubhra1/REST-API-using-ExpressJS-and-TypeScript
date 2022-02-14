import pino from "pino";
import dayjs from "dayjs";

const log = pino({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
