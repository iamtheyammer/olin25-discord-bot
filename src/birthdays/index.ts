import { Message } from "discord.js";
import { Args } from "../index";
import set from "./set";
import get from "./get";
import { infoEmbed } from "../util/embeds";

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
          .setTitle("Birthdays")
          .setDescription(
            "Olin Man has a great memory. Tell him your birthday, eh? He'll let everyone know on your special day!"
          )
          .addFields(
            {
              name: "Set your birthday",
              value: "`o.birthdays set month day year`",
            },
            {
              name: "Get your birthday (in case you forgot)",
              value: "`o.birthdays get`",
            }
          )
      );
      return;
    }
  }
}
