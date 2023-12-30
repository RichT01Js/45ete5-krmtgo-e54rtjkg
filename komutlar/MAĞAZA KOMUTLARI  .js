const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (message.channel.type === 'dm') {
if (!client.ekoayarlar.admin.includes(message.author.id)) return message.reply(`sg amk`)
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
  
     .setFooter(client.ekoayarlar.embedmesajyapimci)
     .setImage(client.ekoayarlar.embedgif) // Embedin içinde büyük bir resim (image)
     .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sth' , 'sthelps'],
  permLevel: 0,
};

exports.help = {
  name: 'test',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'he456456456',
};