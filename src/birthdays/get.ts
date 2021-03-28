import { Message } from "discord.js";
import { Args } from "../index";
import client from "../dynamo";
import read from "../dynamo/read";
import { errorEmbed, successEmbed } from "../util/embeds";
import dayjs from "dayjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Birthday } from "../dynamo/types";

export default async function get(msg: Message, args: Args) {
  try {
    const { Item: birthdayRow } = await read("olin25-birthdays", {
      discord_id: msg.author.id,
    });
    if (!birthdayRow) {
      await msg.reply(
        errorEmbed()
          .setTitle("You haven't set your birthday!")
          .setDescription("Use `o.birthdays set` to do so.")
      );
      return;
    }

    const { year, month, day } = unmarshall(birthdayRow) as Birthday;
    await msg.reply(
      successEmbed()
        .setTitle("Got your birthday")
        .setDescription(
          `${msg.author}, your birthday is ${dayjs(
            new Date(year, month - 1, day)
          ).format("MM/DD/YYYY")}.`
        )
    );
  } catch (e) {
    await msg.reply(
      errorEmbed()
        .setTitle("Error getting your birthday")
        .setDescription("If this keeps happening, let us know.")
    );
  }
}
