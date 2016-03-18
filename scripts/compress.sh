#!/usr/bin/env bash
destination=${1:-"."}
ma_chrome_extension_dir=`pwd`;
ma_chrome_extension_name='netflix-imdb-extension.zip'

cd ${ma_chrome_extension_dir};
echo "Bulding all js files first.."
scripts/build.sh
echo "Complete!"
echo "Compressing file to ${destination}/${ma_chrome_extension_name}..";
zip -r ${destination}/${ma_chrome_extension_name} . -x "node_modules/*" "scripts/*" "src/*" "test/*" ".*";
echo "Complete!";
