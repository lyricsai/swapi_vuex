#!/usr/bin/env sh

set -e
yarn build

cd dist

git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:lyricsai/swapi-vuex.git master:gh-pages

cd -