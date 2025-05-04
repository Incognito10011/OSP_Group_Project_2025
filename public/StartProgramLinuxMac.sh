#!/bin/bash

echo "Starting Node server... "
(cd Server && node server.js &)

sleep 2

echo "Running Python script..."
python3 script.py

echo "Done."

