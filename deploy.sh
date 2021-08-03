#!/bin/sh
heroku create $1
heroku config:set BASE_URL=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set BOT_TOKEN=$2
git push heroku main
heroku logs --tail
heroku apps:destroy