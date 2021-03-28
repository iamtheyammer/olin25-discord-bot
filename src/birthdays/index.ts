import { Message } from "discord.js";
import { Args } from "../index";
import set from "./set";
import get from "./get";

export default async function birthdays(msg: Message, args: Args) {
  switch (args.splitLower[1] || "") {
    case "set": {
      await set(msg, args);
      return;
    }
    case "get": {
      await get(msg, args);
      return;
    }
  }
}
