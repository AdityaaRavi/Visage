kill $(ps aux | grep '[n]pm start' | awk '{print $2}')
sleep 2
npm start &>> output.log &
