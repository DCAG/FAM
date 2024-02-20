#!/pwsh

mkdir server, client
Set-Location server
mkdir repositories, models, configs, services, controllers, logs

npm init --y

npm install axios cors express mongoose jsonfile

Set-Location ../client

# TODO: convert this code to run non-interactively
npm --% create vite@latest .

npm i axios jsonwebtoken react-router-dom

Set-Location ..