#!/bin/bash
#node server/index.js &
mysql.server start
npm start &
cd visage-app
npm start 
cd ..