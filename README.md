## wifi-watcher

This simple node app will frequently request a small web resource (on S3) to see if your HTTP requests are being redirected by a wifi hotspot. 

If you get redirected, the app can try to detect which hotspot you're on and log in with the specified credentials.

To get it running:

1. Clone or otherwise download this repository:

    git clone git://github.com/brianshaler/wifi-watcher.git && cd wifi-watcher
    OR
    wget https://github.com/brianshaler/wifi-watcher/archive/master.zip && unzip master.zip && cd wifi-watcher-master

2. Install npm (Node.js Package Manager) if you don't have it yet:

    sudo apt-get install npm

3. Install this app's dependencies:

    npm install

4. Then, run the app:

    node app.js

You can edit app.js to add rules for new wifi hotspots. Right now, it's set up to detect and log in on the wifi at [Cartel Coffee in Tempe](http://cartelcoffeelab.com/)
