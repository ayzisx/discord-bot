client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === ",lock") {
    if (!message.member.permissions.has("ManageChannels")) return;

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: false,
    });

    message.channel.send("🔒 Locked");
  }

  if (message.content === ",unlock") {
    if (!message.member.permissions.has("ManageChannels")) return;

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: true,
    });

    message.channel.send("🔓 Unlocked");
  }
});
