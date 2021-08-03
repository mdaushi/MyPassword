module.exports = bot =>{
    bot.start((ctx)=>{
        ctx.reply('Hai '+ctx.from.first_name+', senang bisa bertemu disini.')
        ctx.reply(`
        saya adalah asisten pribadi anda, yang akan mengatur semua password anda
        `)
    })

    bot.help((ctx)=>{
        let pesan = `
        Daftar perintah yang bisa anda lakukan :
        /list - Lihat daftar password
        /tambah - Menambah password
        /hapus - Menghapus password
        ---------------------------
        /help - untuk bantuan
        `
        ctx.reply(pesan)
    })

}