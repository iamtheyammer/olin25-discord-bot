import { Message } from "discord.js";
import { Args } from "../index";
import { errorEmbed, infoEmbed, successEmbed } from "../util/embeds";
import { Socials } from "../dynamo/types";
import update from "../dynamo/update";

const acceptableSocials = new Set([
  "instagram",
  "snapchat",
  "minecraft",
  "overwatch",
  "steam",
  "valorant",
]);

export default async function set(msg: Message, args: Args) {
  if (args.splitLower.length < 3) {
    await msg.reply(
      infoEmbed()
        .setTitle("Set social media accounts")
        .setDescription(
          "Once set, anyone can view your accounts.\n" +
            "Supported account types are: `insta` (or `instagram`), `snap` (or `snapchat`), `mc` (or `minecraft`), `overwatch`, `valorant`, and `steam`.\n" +
            'Add accounts like this `o.socials set instagram="myusername" [...]` (you can add more than one account in one command).'
        )
        .addFields({
          name: "Does your username have a space?",
          value:
            'Just enclose it in quotes, like `o.socials set valorant="this is my username#1234"`.',
        })
    );
    return;
  }

  // make sets and remove short social names
  const sets = args.split.slice(2).map((s) => {
    if (!s.includes("=")) {
      return s;
    }

    let [service, username] = s.split("=");

    switch (service) {
      case "insta": {
        service = "instagram";
        break;
      }
      case "snap": {
        service = "snapchat";
        break;
      }
      case "mc": {
        service = "minecraft";
        break;
      }
    }

    return [service, username];
  });

  if (!sets.every((s) => s.length > 1)) {
    await msg.reply(
      errorEmbed()
        .setTitle("Invalid set")
        .setDescription("One of your accounts to set is invalid.")
    );
    return;
  }

  const row: Socials = {};

  for (const [service, username] of sets) {
    if (!acceptableSocials.has(service)) {
      await msg.reply(
        errorEmbed()
          .setTitle("Invalid service")
          .setDescription(
            `Maybe you have, but Olin Man hasn't heard of \`${service}\`.`
          )
      );
      return;
    }

    switch (service) {
      case "instagram": {
        row.instagram = username;
        break;
      }
      case "snapchat": {
        row.snapchat = username;
        break;
      }
      case "minecraft": {
        row.minecraft = username;
        break;
      }
      case "overwatch": {
        row.overwatch = username;
        break;
      }
      case "steam": {
        row.steam = username;
        break;
      }
      case "valorant": {
        row.valorant = username;
        break;
      }
      default: {
        console.log(service, username);
      }
    }
  }

  try {
    await update("olin25-socials", { discord_id: msg.author.id }, row);
  } catch (e) {
    console.error(e);
    await msg.reply(
      errorEmbed()
        .setTitle("Error setting socials")
        .setDescription("If this happens a lot contact bot dev")
    );
    return;
  }

  await msg.reply(
    successEmbed()
      .setTitle("Successfully updated socials")
      .setDescription(
        `Now, others can request them by doing \`o.socials get \`${msg.author}`
      )
  );
}
