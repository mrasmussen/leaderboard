#!/usr/bin/env bash

# Get root up in here
sudo su

# Just a simple way of checking if we need to install everything
if [ ! -d "/var/www" ]
then
    # Add MongoDB to apt
    apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

    # Update and begin installing some utility tools
    apt-get -y update
    apt-get install -y python-software-properties
    apt-get install -y vim git subversion curl
    apt-get install -y memcached build-essential

    # Add nodejs repo
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get -y update

    # Install nodejs
    apt-get install -y nodejs

    # Install latest stable version of MongoDB
    apt-get install -y mongodb-10gen

    # Install git
    apt-get install git-core
    git config --global user.name "mrasmussen"
    git config --global user.email mattras@gmail.com

    #Install forever
    npm install forever -g

    #Install Express
    npm install -g express-generator
    cd /var/www/
    # express - no need to add default files anymore
    npm install

    #Start Node Server with Forever
    forever -w start bin/www

    # Copy node-forever to startup folder so that server will start on machine reboot
    mv /var/www/server_scripts/node-forever /etc/init.d/
    cd /etc/init.d/
    chown root:root node-forever
    chmod 755 node-forever
    update-rc.d node-forever defaults

    # Production ONLY: Find a way to add the below line to /etc/rc.local this forwards port 80 to port 3000
    # iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000


    # Symlink our host www to the guest /var/www folder
    ln -s /vagrant/www /var/www

    # Victory!
    echo "You're all done! Your default node server should now be listening on http://10.0.33.34/. For code, see: node-mongo-vagrant/www/default/server.js."

    # Run it
    node /var/www/default/server.js
fi