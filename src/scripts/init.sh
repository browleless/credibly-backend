echo Start

SCHEMA=credibly

rm ./init.sql

cat ./schema.sql >> ./init.sql
echo "USE $SCHEMA;" >> ./init.sql
cat ./tables.sql >> ./init.sql
cat ./keys.sql >> ./init.sql

echo Done
