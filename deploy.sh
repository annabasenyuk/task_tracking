#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# initialize git in the build output directory
git init

# add and commit all files
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# replace <USERNAME> with your GitHub username and <REPO> with your repository name
git push -f git@github.com:annabasenyuk/task_tracking.git master:gh-pages

cd -