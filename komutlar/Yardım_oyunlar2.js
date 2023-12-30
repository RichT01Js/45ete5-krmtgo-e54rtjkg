const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (message.channel.type === 'dm') {
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setAuthor(client.ekoayarlar.botismi + ' Oyun Komutları')
    .setDescription(`
    > tüm oyun komutları aşağıda listelenmiştir:
    > 
    > \`${client.ekoayarlar.botunuzunprefixi}sl <miktar>\` **->** Slot oyunu oynarsınız.
    > \`${client.ekoayarlar.botunuzunprefixi}sc\` **->** Rastgele kazanç sağlarsınız.
    > \`${client.ekoayarlar.botunuzunprefixi}st <miktar> <yazı/tura>\` **->** Yazı Tura oynarsınız.
    > \`${client.ekoayarlar.botunuzunprefixi}btc\` **->** Mining yaparak kazarsınız.
    > \`${client.ekoayarlar.botunuzunprefixi}cf\` **->** CarkıFelek oynayarak para kazanırsınız.
    > \`${client.ekoayarlar.botunuzunprefixi}fish\` **->** Balık tutarak para kazanırsınız.
    
    > **Premium Oyunlar**
    >
    > \`${client.ekoayarlar.botunuzunprefixi}sl <miktar>\` **->** Slot oyunu oynarsınız. 
    > \`${client.ekoayarlar.botunuzunprefixi}sl <miktar>\` **->** Slot oyunu oynarsınız. 
    > \`${client.ekoayarlar.botunuzunprefixi}sl <miktar>\` **->** Slot oyunu oynarsınız.
    >
    > oyun hakkında daha fazla bilgi almak için: \`${client.ekoayarlar.botunuzunprefixi}chelp\`.
    
    
    `)
     .setFooter(client.ekoayarlar.embedmesajyapimci)
     .setImage(client.ekoayarlar.embedgif)// Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['games','oyunlar','oyun'],
  permLevel: 0,
};

exports.help = {
  name: 'games',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'games',
};