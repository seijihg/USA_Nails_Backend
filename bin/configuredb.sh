#!/bin/bash

database="usanailsdb"

echo "Configuring databe: $database"

dropdb -U postgres usanailsdb
createdb -U postgres usanailsdb

echo "$database configured"