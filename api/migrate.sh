#!/bin/sh
# run.sh
set -e
retries=10
until PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c '\q' || [ $retries -eq 0 ]; do
  >&2 echo "Waiting for postgres server at $DB_HOST:$DB_PORT, $((retries)) remaining attempts..."
  retries=$((retries-=1))
  sleep 2s
done

if [ $retries -eq 0 ];
then
    >&2 echo "Reached max number of retries trying to connect to postgres server at $DB_HOST:5432. Exiting."
    exit 1
fi

>&2 echo "Postgres connection is ready, running migrations"

npm run migrate