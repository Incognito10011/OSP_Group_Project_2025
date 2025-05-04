@echo off


echo Connecting to MongoAtlas...
start cmd /k "cd Server && node server.js"

timeout /t 2

echo Connecting to AI...

python script.py
echo Finished!

pause