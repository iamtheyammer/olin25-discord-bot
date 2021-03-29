import { Message } from "discord.js";
import { Args } from "../index";
import { errorEmbed, infoEmbed, successEmbed } from "../util/embeds";
import dayjs from "dayjs";
import update from "../dynamo/update";

export default async function set(msg: Message, args: Args) {
  if (args.splitLower.length < 5) {
    await msg.reply(
      infoEmbed()
        .setTitle("Setting a birthday")
        .setDescription(
          "Add your birthday! `o.birthdays set month day year`, like `o.birthdays set 01 24 2003`"
        )
    );
    return;
  }

  const [, , strMonth, strDay, strYear] = args.splitLower;
  const month = parseInt(strMonth);
  const day = parseInt(strDay);
  const year = parseInt(strYear);

  if (isNaN(month + day + year)) {
    await msg.reply(
      errorEmbed()
        .setTitle("Invalid values")
        .setDescription(
          "Either your month, day, or year is invalid. Make sure they're all numbers."
        )
    );
    return;
  }

  const time = dayjs(new Date(year, month - 1, day));

  if (!time.isValid || time.isAfter(dayjs())) {
    await msg.reply(
      errorEmbed()
        .setTitle("Invalid values")
        .setDescription("Looks like your birthday isn't valid. Try again!")
    );
    return;
  }

  try {
    await update(
      "olin25-birthdays",
      { discord_id: `${msg.author.id}` },
      { day, month, year }
    );
  } catch (e) {
    console.error(e);
    await msg.reply(
      errorEmbed()
        .setTitle("Error updating birthday")
        .setDescription("Let admins know if this keeps happening.")
    );
    return;
  }

  await msg.reply(
    successEmbed()
      .setTitle("Successfully set birthday")
      .setDescription(
        `Your birthday has been set to ${time.format("MM/DD/YYYY")}.`
      )
  );
}
