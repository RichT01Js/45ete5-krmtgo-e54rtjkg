const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (message.channel.type === 'dm') {
if (!client.ekoayarlar.admin.includes(message.author.id)) return message.reply(`sg amk`)
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}
  const helpEmbed = new Discord.MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setAuthor('Emoji Listesi')
    .setDescription(`
<a:slotcoin:1188515137716506736><a:slotcoin:1188515137716506736><a:slotcoin:1188515137716506736> **-->** \`<a:slotcoin:1188515137716506736>\`
<a:slotcointrigged:1188531674062012499><a:slotcointrigged:1188531674062012499><a:slotcointrigged:1188531674062012499> **-->** \`<a:slotcointrigged:1188531674062012499>\`
<a:slotrun:1188536403978616842><a:slotrun:1188536403978616842><a:slotrun:1188536403978616842> **-->** \`<a:slotrun:1188536403978616842>\`
<a:slotwin:1188538218170286110><a:slotwin:1188538218170286110><a:slotwin:1188538218170286110> **-->** \`<a:slotwin:1188538218170286110>\`
<a:slotwin2:1188541128383926312><a:slotwin2:1188541128383926312><a:slotwin2:1188541128383926312> **-->** \`<a:slotwin2:1188541128383926312>\`
<a:store:1188549296413495346><a:store:1188549296413495346><a:store:1188549296413495346> **-->** \`<a:store:1188549296413495346>\`

<:cuzdan:1188540963153530930> **-->** \`<:cuzdan:1188540963153530930>\`
<:parabirimi:1188541316607524865> **-->** \`<:parabirimi:1188541316607524865>\`
<:slotlost:1188543753644933120> **-->** \`<:slotlost:1188543753644933120>\`
<:slotrushvip:1188551679780589608> **-->** \`<:slotrushvip:1188551679780589608>\`
<:slotrushcomputer:1188552164344340571> **-->** \`<:slotrushcomputer:1188552164344340571>\`
<:slotrushticket:1188553012558446622> **-->** \`<:slotrushticket:1188553012558446622>\`
<:slotrushfish:1188553678441938954> **-->** \`<:slotrushfish:1188553678441938954>\`


`)
     .setFooter(client.ekoayarlar.embedmesajyapimci)
     .setImage(client.ekoayarlar.embedgif) // Embedin içinde büyük bir resim (image)
     .setTimestamp() // Embedin gönderildiği tarih ve saat
  message.channel.send(helpEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'emoji',
  description: 'Kullanılabilir komutları gösterir.',
  usage: 'help',
};