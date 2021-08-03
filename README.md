# MyPassword
Bot Telegram Password Manager

## Wajib Baca
- Heroku-Cli (https://devcenter.heroku.com/articles/heroku-cli)
- Token telegram bot (https://core.telegram.org/bots#6-botfather)
- Telegraf js (https://telegraf.js.org/)
- DB JSON File (https://github.com/muhfirdaus19/MyPassword/blob/main/app/assets/pass.json)

## Cara Pakai
pertama, clone repository
```
git clone https://github.com/muhfirdaus19/MyPassword.git
```
selanjutnya, disini saya asumsikan anda sudah login Heroku via CLI \
jalankan deploy.sh dengan argumen pertama nama project dan argumen kedua token bot telegram
```
./deploy.sh nama_project token
```

jika lakukan perubahan di code tinggal commit seperti biasa dan push dengan cara
```
git push heroku main
```