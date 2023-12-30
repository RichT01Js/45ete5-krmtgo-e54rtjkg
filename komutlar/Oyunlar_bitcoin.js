const db = require('quick.db');

const commandCooldowns = new Map(); // Map kullanıyoruz
const cooldownTime = 2 * 60 * 60 * 1000; // 2 saat (milisaniye cinsinden)

function formatCurrency(amount, currency) {
  return `${amount.toLocaleString()} ${currency}`;
}

exports.run = async (client, message, args) => {
  const currency = client.ekoayarlar.parabirimi;
  const user = message.author;
  const hasAccount = db.fetch(`hesapdurumasreaper-${user.id}`);
  if (message.channel.type === 'dm') {
  return message.reply(client.ekoayarlar.dmmesajgondermemsg);
}

  if (!hasAccount) {
    return message.reply(client.ekoayarlar.hesapolusturmsg);
  }

  // Kullanıcının envanterini kontrol et
  const userInventory = db.fetch(`inventory_${user.id}`) || [];

  // "btcmakinesi" adlı ürünün envanterde olup olmadığını kontrol et
  if (!userInventory.includes('bilgisayar')) {
    return message.reply(`Sanırım mining yapabilmek için bir bilgisayarınız yok. \n**${client.ekoayarlar.botunuzunprefixi}mağaza**`);
  }

  let userBalance = db.fetch(`bakiyeasreaper-${user.id}`);

  if (userBalance === null || userBalance < 0) {
    userBalance = 0;
  }

  // Eğer kullanıcı daha önce /btc komutunu kullanmışsa ve cooldown süresi bitmemişse
  if (commandCooldowns.has(user.id) && Date.now() - commandCooldowns.get(user.id) < cooldownTime) {
    const kalanSure = (cooldownTime - (Date.now() - commandCooldowns.get(user.id))) / 1000;
    const formatliSure = sureFormatla(kalanSure);
    message.reply(`${formatliSure} sonra tekrar bitcoin kazabilirsin. <:deny:1188812328070819900>`);
    return;
  }

  const kazanmaSansi = Math.random() < 1.0;

  let sonucMesaji = '';

  if (kazanmaSansi) {
    // Kazanma durumunda yapılacak işlemler
    const kazanmaMesajlari = [
      { miktar: 20000, mesaj: `${user} **Gaforce ARTX 3060** ile 2 saat içerisinde **{miktar}** tutarında bitcoin kazdın. <a:slotcoin:1188515137716506736>` },
      { miktar: 9863291, mesaj: `${user} **Gaforce ARTX 4080** ile 2 saat içerisinde **{miktar}** tutarında bitcoin kazdın. <a:slotcoin:1188515137716506736>` },
      { miktar: 21344, mesaj: `${user} *TTX 1050** ile 2 saat içerisinde **{miktar}** tutarında bitcoin kazdın. <a:slotcoin:1188515137716506736>` },
      { miktar: 785, mesaj: `${user} **Replika ARTX 4090 ile** 2 saat içerisinde **{miktar}** tutarında bitcoin kazdın. <a:slotcoin:1188515137716506736>` },
      { miktar: 89965, mesaj: `${user} **Asuz Radenon 5500x  ile** 2 saat içerisinde **{miktar}** tutarında bitcoin kazdın. <a:slotcoin:1188515137716506736>` },
      { miktar: 8999627, mesaj: `${user} **ENVİYİDA QUADRO ARTX 6000  ile** 2 saat içerisinde **{miktar}** tutarında bitcoin kazdın. <a:slotcoin:1188515137716506736>` },
      { miktar: 0, mesaj: `${user} **Replika ARTX 2060** ile mining yapmak isterken ekran kartını patlattın..` },
      // Diğer kazanma mesajlarını ekleyin
    ];

    const kazanmaMesaji = kazanmaMesajlari[Math.floor(Math.random() * kazanmaMesajlari.length)];
    const kazancMiktari = kazanmaMesaji.miktar;
    userBalance += kazancMiktari;
    db.set(`bakiyeasreaper-${user.id}`, userBalance);

    const formatliKazancMiktari = formatCurrency(kazancMiktari, currency);
    sonucMesaji = kazanmaMesaji.mesaj.replace('{miktar}', formatliKazancMiktari);
  } else {
    // Kaybetme durumunda yapılacak işlemler
    const kaybetmeMesajlari = [
      `${user}, Sanırım bugün şanssız günündesin. <:deny:1188812328070819900>`,
      // Diğer kaybetme mesajlarını ekleyin
    ];

    sonucMesaji = kaybetmeMesajlari[Math.floor(Math.random() * kaybetmeMesajlari.length)];
  }

  // Kullanıcıya sonuç mesajını gönder
  message.channel.send(sonucMesaji);

  // Kullanıcının cooldown süresini set et
  commandCooldowns.set(user.id, Date.now());

  setTimeout(() => {
    // Kullanıcının cooldown süresini sıfırla
    commandCooldowns.delete(user.id);
  }, cooldownTime);
};

function sureFormatla(saniye) {
  const saat = Math.floor(saniye / 3600);
  const dakika = Math.floor((saniye % 3600) / 60);
  const kalanSaniye = Math.floor(saniye % 60);
  return `${saat}g, ${dakika}d, ${kalanSaniye} saniye`;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['btc'],
  permLevel: 0,
  category: 'Eğlence',
};

exports.help = {
  name: 'btc',
  description: 'Mining yaparak para kazanırsınız.',
  usage: 'btc',
};
