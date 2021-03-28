import { Client } from "discord.js";
import split from "splitargs2";
import { errorEmbed, infoEmbed } from "./util/embeds";
import birthdays from "./birthdays";

const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user ? client.user.tag : "unknown user"}`);
});

export interface Args {
  split: string[];
  splitLower: string[];
}

client.on("message", async (msg) => {
  if (
    (client.user && msg.author.id === client.user.id) ||
    !msg.content.startsWith("o.")
  ) {
    return;
  }

  const sanitizedContent = msg.content.slice(2);

  const args: Args = {
    split: split(sanitizedContent),
    splitLower: split(sanitizedContent.toLowerCase()),
  };

  if (args.splitLower.length < 1) {
    msg.reply(
      infoEmbed()
        .setTitle("Olin '25 Bot")
        .addFields({ name: "Birthdays", value: "o.birthdays" })
    );
    return;
  }

  const command = args.splitLower[0];

  switch (command) {
    case "birthdays": {
      await birthdays(msg, args);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
