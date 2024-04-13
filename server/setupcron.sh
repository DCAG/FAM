#!/bin/bash

# Path to your Node.js script
NODE_SCRIPT_PATH="./resetActionsCounters.task.js"

# Add the cron job to run the Node.js script every day at midnight
echo "0 0 * * * node $NODE_SCRIPT_PATH" >> /etc/crontab

# Restart the cron service (optional, may vary depending on your system)
service cron restart

echo "Cron job set up successfully! Your Node.js script will run every day at midnight."
