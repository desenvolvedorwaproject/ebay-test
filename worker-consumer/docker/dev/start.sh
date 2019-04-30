set -e

/bin/sh -c "
  while ! nc -z $MONGO_HOST $MONGO_PORT;
  do
    echo 'Waiting database';
    sleep 1;
  done;
  echo 'Database ready!'!;
"

yarn start:dev