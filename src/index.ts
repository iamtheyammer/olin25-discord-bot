import { Client } from "discord.js";
import split from "splitargs2";
import { infoEmbed } from "./util/embeds";
import birthdays from "./birthdays";
import socials from "./socials";

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
    !msg.content.toLowerCase().startsWith("o.")
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
      return;
    }
    case "birthday": {
      await birthdays(msg, args);
      return;
    }
    case "socials": {
      await socials(msg, args);
      return;
    }
    case "social": {
      await socials(msg, args);
      return;
    }
    case "repo": {
      await msg.reply(
        infoEmbed()
          .setTitle("Oh, so you want to see my skeleton?")
          .setDescription(
            "Good news: I'm open-source! https://github.com/iamtheyammer/olin25-discord-bot"
          )
          .addFields({
            name: "Want to add a bone to my body?",
            value:
              "Please do! I love a good _pull_ request!\n" +
              "I'm written in TypeScript and my brain is backed by AWS DynamoDB.",
          })
      );
      return;
    }
    default:
      {
        await msg.reply(
          infoEmbed()
            .setTitle("Olin Man comes to Discord!")
            .setDescription(
              "He can't do that much yet, but he's still learning!\n" +
                "If you need something, `@maker of bot` and I'll get someone to help."
            )
            .addFields(
              {
                name: "Birthdays",
                value:
                  "Olin Man will remember your birthday! `o.birthdays` for more info.",
              },
              {
                name: "Socials",
                value:
                  "Olin Man remembers social media accounts, too! `o.socials` for more info.",
              }
            )
        );
      }
      return;
  }
});

client.login(process.env.DISCORD_TOKEN);
