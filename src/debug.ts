import { DEBUG, DEBUG_MODE } from "./constants";

/**
 * Logs the provided arguments to the console if DEBUG is enabled.
 * @param args - The arguments to be logged.
 */
const consoleLog = (...args: unknown[]) => {
  if (!DEBUG) return;
  console.log(...args);
};

const consoleLogVerbose = (...args: unknown[]) => {
  if (!DEBUG || DEBUG_MODE !== "verbose") return;
  console.log(...args);
};

const consoleError = (...args: unknown[]) => {
  if (!DEBUG) return;
  console.error(...args);
};

const logger = {
  log: consoleLog,
  verbose: consoleLogVerbose,
  error: consoleError,
};

export default logger;
