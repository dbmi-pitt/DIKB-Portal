# DIKB-Portal
A web portal for the DIKB MP evidence base

This project is for the web front end that connects to the OHDSI WebAPI customized for the DIKB project (https://github.com/dbmi-pitt/DIKB-EvidenceBase).

TODO: explain how to configure and deploy this project


# PostgreSQL 

export postgresDB table
$ pg_dump -h localhost -p 5432 -U user -W --table="table-name" --column-inserts database-name > table.sql