// stokyenile.js
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

const items = [
  { name: 'VIP', key: 'vip_stock', stock: 70 },
  { name: 'bilgisayar', key: 'computer_stock', stock: 70 },
  { name: 'carkbileti', key: 'carkbileti_stock', stock: 70 },
  { name: 'birlira', key: 'birlira_stock', stock: 70 },
  { name: 'olta', key: 'olta_stock', stock: 70 },
];

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}

exports.run = async (client, message, args) => {
  if (message.author.id !== '767682747560755222') {
    return message.reply('Bunu yapabilmek için gerekli yetkiye sahip değilsin! <:deny:1188812328070819900>');
  }

  for (const item of items) {
    const currentStock = db.fetch(item.key);
    if (currentStock === null || currentStock < item.stock) {
      db.set(item.key, item.stock);
    }
  }

  const embed = new MessageEmbed()
    .setColor(client.ekoayarlar.renk)
    .setAuthor('Mağaza')
    .setDescription(`
    > Tüm ürünlere 70 adet stok başarıyla getirildi! <:accepts:1188812293048369233>

    `)
    .setFooter(client.ekoayarlar.embedmesajyapimci)
    .setImage(client.ekoayarlar.embedgif) // Embedin içinde büyük bir resim (image)
    .setTimestamp() // Embedin gönderildiği tarih ve saat

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stokyenile'],
  permLevel: 0,
  category: 'System',
};

exports.help = {
  name: 'stt',
  description: 'Mağaza stoklarını belirli bir miktarla doldurur.',
  usage: 'stokyenile',
};
