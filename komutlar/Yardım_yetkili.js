const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (message.channel.type === 'dm') {
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setAuthor(client.ekoayarlar.botismi + ' Admin Paneli')
    .setDescription(`
    > tüm yetkili komutları aşağıda listelenmiştir:
    > 
    > \`${client.ekoayarlar.botunuzunprefixi}addp\` **->** komut açıklaması gizlendi.⛔️
    > \`${client.ekoayarlar.botunuzunprefixi}delp\` **->** komut açıklaması gizlendi.⛔️
    > \`${client.ekoayarlar.botunuzunprefixi}setm\` **->** komut açıklaması gizlendi.⛔️
    > \`${client.ekoayarlar.botunuzunprefixi}addm\` **->** komut açıklaması gizlendi.⛔️
    > \`${client.ekoayarlar.botunuzunprefixi}delm\` **->** komut açıklaması gizlendi.⛔️
    > \`${client.ekoayarlar.botunuzunprefixi}delacc\` **->** komut açıklaması gizlendi.⛔️
    > 
    > komutlar hakkında daha fazla bilgi almak için: \`@${client.ekoayarlar.botismi}\`.
    
    
    `)
     .setFooter(client.ekoayarlar.embedmesajyapimci)
    .setImage(client.ekoayarlar.embedgif) // Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili' , 'staff'],
  permLevel: 0,
};

exports.help = {
  name: 'staff',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'staff',
};