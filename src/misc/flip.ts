import { Message } from "discord.js";
import { Args } from "../index";
import { infoEmbed } from "../util/embeds";

const headsEmbed = infoEmbed()
  .setImage(
    "https://cdn.discordapp.com/attachments/800505117631447080/826211782301188096/America_the_Beautiful_quarter_obverse.jpeg"
  )
  .setTitle("Heads")
  .setDescription("My head is blue. Is yours?");

const tailsEmbed = infoEmbed()
  .setImage(
    "https://cdn.discordapp.com/attachments/800505117631447080/826211762482315264/Quarter_new.png"
  )
  .setTitle("Tails")
  .setDescription("Well, you've got tails.");

export default async function flip(msg: Message, args: Args) {
  const isHeads = Math.round(Math.random()) === 1;

  await msg.reply(isHeads ? headsEmbed : tailsEmbed);
}
