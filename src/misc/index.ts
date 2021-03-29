import { Message } from "discord.js";
import { Args } from "../index";
import { infoEmbed } from "../util/embeds";
import flip from "./flip";

export default async function misc(msg: Message, args: Args) {
  switch (args.splitLower[1] || "") {
    case "flip": {
      await flip(msg, args);
      return;
    }
    default: {
      await msg.reply(
        infoEmbed()
          .setTitle("Miscellaneous commands")
          .setDescription(
            "I can do some miscellaneous stuff, too (like spelling the word miscellaneous)!"
          )
          .addFields({ name: "Flip a coin", value: "`o.misc flip`" })
      );
      return;
    }
  }
}
