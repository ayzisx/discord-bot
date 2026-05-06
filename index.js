if (message.content === ",lock") {
  if (!message.member.permissions.has("ManageChannels")) {
    return message.reply("You don't have permission.");
  }

  try {
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: false,
    });

    message.channel.send("🔒 Locked");
  } catch (err) {
    console.log(err);
    message.channel.send("❌ Failed to lock channel");
  }
}
