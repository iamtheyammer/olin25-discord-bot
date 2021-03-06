import { MessageEmbed } from "discord.js";

export const defaultEmbed = (): MessageEmbed =>
  new MessageEmbed().setFooter("Olin '25 bot by iamtheyammer#7072");

export const errorEmbed = (): MessageEmbed =>
  defaultEmbed().setColor("#ff0000");

export const warnEmbed = (): MessageEmbed => defaultEmbed().setColor("#ffff00");

export const successEmbed = (): MessageEmbed =>
  defaultEmbed().setColor("#00ff00");

export const infoEmbed = (): MessageEmbed => defaultEmbed().setColor("#0099ff");
