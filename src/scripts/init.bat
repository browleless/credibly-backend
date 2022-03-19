@echo off

echo Start

SET SCHEMA=credibly

DEL %CD%\init.sql

type %CD%\schema.sql > %CD%\init.sql
echo USE %SCHEMA%; >> %CD%\init.sql
type %CD%\tables.sql >> %CD%\init.sql
type %CD%\keys.sql >> %CD%\init.sql

echo Done
