import { Message, User } from "discord.js";
import { Args } from "../index";
import { errorEmbed, infoEmbed, successEmbed } from "../util/embeds";
import { Socials } from "../dynamo/types";
import read from "../dynamo/read";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export default async function get(msg: Message, args: Args) {
  let userId: string;

  if (msg.mentions.members && msg.mentions.members.size > 0) {
    userId = msg.mentions.members.first()!.id;
  } else if (args.split.length > 2) {
    const user = args.split[2];

    if (user.includes("#")) {
      await msg.reply(
        errorEmbed()
          .setTitle("Olin Man doesn't take usernames#tags")
          .setDescription(
            "Unfortunately the Discord API doesn't let me use username#1234-style pulls. Sorry!"
          )
      );
      return;
    } else {
      // user id
      userId = user;
    }
  } else {
    // request for current user
    userId = msg.author.id;
  }

  if (!/^[0-9]+$/.test(userId)) {
    await msg.reply(
      errorEmbed()
        .setTitle("Unable to find the user you mentioned")
        .setDescription("Try again, or just @ them.")
    );
    return;
  }

  const { Item: rawSocials } = await read("olin25-socials", {
    discord_id: userId,
  });

  if (!rawSocials) {
    await msg.reply(
      errorEmbed()
        .setTitle("Unable to find socials for that user")
        .setDescription(
          `I couldn't find socials for <@${userId}>. Have them add their socials!`
        )
    );
    return;
  }

  const socials = unmarshall(rawSocials) as Socials;

  delete socials.discord_id;

  const fields = Object.entries(socials).map(([service, username]) => ({
    name: service,
    value: username,
    inline: true,
  }));

  await msg.reply(
    successEmbed()
      .setTitle(`Got socials`)
      .setDescription(`Got <@${userId}>'s socials.`)
      .addFields(...fields)
  );
}
