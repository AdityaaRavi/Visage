kill $(ps aux | grep '[n]pm start' | awk '{print $2}')
kill $(ps aux | grep '[n]ode index.js' | awk '{print $2}')
sleep 2
npm start &>> output.log &
