const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // LOCK
  if (message.content === "!lock") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply("You don't have permission.");
    }

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: false,
    });

    message.channel.send("🔒 Channel locked.");
  }

  // UNLOCK
  if (message.content === "!unlock") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply("You don't have permission.");
    }

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: true,
    });

    message.channel.send("🔓 Channel unlocked.");
  }
});

client.login(TOKEN);
