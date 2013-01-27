## wifi-watcher

This simple node app will frequently request a small web resource (on S3) to see if your HTTP requests are being redirected by a wifi hotspot. 

If you get redirected, the app can try to detect which hotspot you're on and log in with the specified credentials.

To get it running, clone this repository and then install dependencies:

    npm install

(You'll need to install npm / node.js in order to run npm install, if you don't have it already.)

Then, run the app:

    node app.js

You can edit app.js to add rules for new wifi hotspots. Right now, it's set up to detect and log in on the wifi at [Cartel Coffee in Tempe](http://cartelcoffeelab.com/)
