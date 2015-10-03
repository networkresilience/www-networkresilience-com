#!/bin/bash
# script name : edit.bash
# script args : $1 -- file to be edited [ALL for working+sub directories]
#       $2 -- comments for git
#       $3 -- remove interactivity if parameter equals "noprompting"
#
# Make certain that you are only editing the development branch.
# Edit the file supplied as an argument to this script.
#
# The script ensures that edits are pushed to the development 
# branch at the origin before checking out dev to merge
# the edits previously made into dev. The script then pushes
# the merge into the dev branch back at the origin.
#
# After pushing the merge to dev at the origin we are ready to
# deploy to Heroku. Consequently the script lets git know about the
# dev Heroku app for the domain and identifies it as "dev-
# heroku". Then the push is made.
#
git remote remove origin
git remote add origin https://github.com/networkresilience/www-networkresilience-com.git
git checkout development || git checkout -b development
if [ $1 == "ALL" ] ; then
	git add --all .
else
	git add $1
fi
git commit -m "$2"
git push origin development
[ $3 == "noprompting" ] || while true; do
    read -p "shall we push changes to the dev GitHub repository and the dev instance on Heroku? " yn
    case $yn in
        [Yy]* ) echo "proceeding..."; break;;
        [Nn]* ) exit;;
        * ) echo "please answer yes or no.";;
    esac
done
git checkout dev || git checkout -b dev
git merge development
git push origin dev
cat ~/.netrc | grep heroku || heroku login && heroku keys:add ~/.ssh/id_rsa.pub
heroku apps:destroy dev-networkresilience-com --confirm dev-networkresilience-com
heroku apps:create dev-networkresilience-com
heroku domains:add dev.networkresilience.com --app dev-networkresilience-com
heroku git:remote -a dev-networkresilience-com -r dev-heroku
git push dev-heroku dev:master
git checkout development
