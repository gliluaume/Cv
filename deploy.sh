#!/bin/bash

echo "Mot de passe distant : "
read -s yn


sshpass -p $yn scp <fichier source> pi@192.168.1.31:<répertoire de destination>
#sshpass -p $yn scp example.json pi@192.168.1.31:Documents/presenceServer/public/assets/
