import { Message } from "discord.js";
import { Args } from "../index";
import { infoEmbed } from "../util/embeds";
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
    default: {
      await msg.reply(
        infoEmbed()
          .setTitle("Socials")
          .setDescription(
            "Tell Olin Man your social media accounts and he'll remember them!"
          )
          .addFields(
            {
              name: "Set your social media accounts",
              value: "Run `o.socials set` for more info.",
            },
            {
              name: "Get someone's social media accounts",
              value:
                "`o.socials get <another user>` (run `o.socials get` for more info)",
            }
          )
      );
      return;
    }
  }
}
