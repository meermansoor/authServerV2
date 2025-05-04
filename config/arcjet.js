import arcjet, { shield, detectBot, tokenBucket } from "arcjet";
import { ARCJET_KEY } from "../config/env.js";



const aj = arcjet({
  log: console.log(), // ✅ Required for logging
  key: ARCJET_KEY, // ✅ Required for logging
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
