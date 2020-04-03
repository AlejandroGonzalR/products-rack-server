#!/bin/bash

echo "Waiting for postgres..."
./assets/wait-for-it.sh postgres:5432 -t 0
echo "PostgreSQL started"
npm start
