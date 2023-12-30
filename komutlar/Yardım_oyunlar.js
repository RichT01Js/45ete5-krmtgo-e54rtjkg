const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (message.channel.type === 'dm') {
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setAuthor( client.ekoayarlar.botismi + ' Oyunlar')
    .setDescription(`
    > tüm bilgi komutları aşağıda listelenmiştir:
    > 
    > Slot Oyunu hakkında bilgi almak için **->** \`${client.ekoayarlar.botunuzunprefixi}slhelp\`
    > Yazı-Tura Oyunu hakkında bilgi almak için **->** \`${client.ekoayarlar.botunuzunprefixi}sthelp\`
    > BTC Oyunu hakkında bilgi almak için **->** \`${client.ekoayarlar.botunuzunprefixi}btchelp\`
    > SC Oyunu hakkında bilgi almak için **->** \`${client.ekoayarlar.botunuzunprefixi}sc\`
    > CarkıFelek Oyunu hakkında bilgi almak için **->** \`${client.ekoayarlar.botunuzunprefixi}cfhelp\`
    > Balık Oyunu hakkında bilgi almak için **->** \`${client.ekoayarlar.botunuzunprefixi}fish\`
    > 
    > komutlar hakkında daha fazla bilgi almak için: \`@${client.ekoayarlar.botismi}\`.
    
    
    `)
     .setFooter(client.ekoayarlar.embedmesajyapimci)
    .setImage(client.ekoayarlar.embedgif)// Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['commandhelp' , 'ch'],
  permLevel: 0,
};

exports.help = {
  name: 'chelp',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'help',
};