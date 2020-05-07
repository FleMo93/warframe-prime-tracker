set -e

npm ci
rm -rf dist
mkdir -p dist

node ./calculateData.js

./node_modules/.bin/webpack --env.production

cp -vr public/* dist/
mkdir -p ./public/img/warframe-img
cp ./warframe-items/data/img/* ./public/img/warframe-img/

HASH="$(git rev-parse HEAD)"
HTML_HASH="<!-- $HASH -->"
JS_HASH="//$HASH"

sed -i "1i ${HTML_HASH}" dist/index.html
for filename in ./dist/*.js; do
  sed -i "1i ${JS_HASH}" "$filename"
done

echo " "
echo "dist conent:"
( cd dist && find . )

echo " "
echo "warframe-items content:"
( cd warframe-items && ls )