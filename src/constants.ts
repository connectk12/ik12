const BASE_URL = "https://app.informedk12.com/api/v1";
const API_KEY = process.env.IK12_API_KEY || "";
const DEBUG = process.env.IK12_DEBUG === "true";
const DEBUG_MODE = process.env.IK12_DEBUG_MODE;
const MAX_PAGES = process.env.IK12_MAX_PAGES;

export { BASE_URL, API_KEY, DEBUG, DEBUG_MODE, MAX_PAGES };
