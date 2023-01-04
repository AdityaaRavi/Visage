#!/bin/bash
node server/index.js &
cd visage-app
npm start
cd ..