#!/usr/bin/env bash
./node_modules/watchify/bin/cmd.js -t reactify -o public/javascripts/main-bundle.js app/javascripts/main.js -v &

for job in `jobs -p`
do
  wait ${job}
done
