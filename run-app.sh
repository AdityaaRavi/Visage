#!/bin/bash
#node server/index.js &

# set environment variables
export NODE_ENV=development

mysql.server start
npm start &
cd visage-app
npm start 
cd ..