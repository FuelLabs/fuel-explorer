#!/bin/bash

check_var () {
	cd packages/graphql
    echo ""
    echo "Checking the .env file"
    sleep .5
    if [ ! -f .env ]; then
        echo "Fail! .env file is missing, please copy from .env.example"
        exit 1
    else
        echo "Done! .env file found successfully"
    fi
    echo "Loading the .env file variables..."
    sleep 2
    export $(grep -v '^#' .env | xargs)
    env_vars=(
        FUEL_PROVIDER
        SERVER_PORT
        SERVER_API_KEY
        DB_HOST
        DB_PORT
        DB_USER
        DB_PASS
        DB_NAME
        RABBITMQ_HOST
        RABBITMQ_PORT
        RABBITMQ_USER
        RABBITMQ_PASS
        QUEUE_CONCURRENCY
        SSL
        DEBUG
    )
    echo "Checking .env file variables..."
    for env_var in "${env_vars[@]}"; do
        if [[ -z "${!env_var}" ]]; then
            echo $env_var not found, please set the variable on .env file
            exit 1
        else
            echo "$env_var = ${!env_var}"
        fi
    done
    sleep 1
    echo "Done! .env file was configured successfully"
    echo ""
	cd ../..
}

start_database () {
    echo ""
    export PGPASSWORD='postgres'
    pg_isready -h localhost -U postgres -d postgres -p 5435 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "Database is already started"
        echo ""
        return
    fi
    echo "Starting database using docker compose..."
    export PROFILE=indexer-local
    pnpm node:start &> /dev/null 2>&1
	status=1
	limit=0
	while [ $status -gt 0 ]; do
		if [ $limit -eq 20 ]; then
			echo "Could not start PostgreSQL, please check your environment"
			echo ""
			return
		fi
		sleep 1
		echo "Waiting PostgreSQL connection..."
		pg_isready -h localhost -U postgres -d postgres -p 5435 > /dev/null 2>&1
		status=$?
		limit=$((limit+1))
	done
    echo "Done! PostgreSQL is ready and accepting connections."
    echo ""
}

apply_migrations () {
	cd packages/graphql
    echo "Checking psql installation..."
    if command -v psql &> /dev/null 2>&1
    then
        echo "Done! psql is installed"
    else
        echo "Fail! psql is not installed, to install psql use: brew install libpq"
        exit 1
    fi
    export PGPASSWORD='postgres'
    pg_isready -h localhost -U postgres -d postgres -p 5435 > /dev/null 2>&1
    sleep 2
    if [ $? -eq 0 ]; then
        echo "Done! PostgreSQL is ready and accepting connections successfully"
    else
        echo "Fail! PostgreSQL is not running"
        exit 1
    fi
    for sql_file in `/bin/ls database/*.sql`; do
        psql -h localhost -U postgres -d postgres -p 5435 -f $sql_file > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "Done! Successfully applied $sql_file"
        else
            echo "Fail! Error applying $sql_file"
            exit 1
        fi
    done
    echo "Done! Database has the schema migrations"
    echo ""
	cd ../..
}

update_migrations () {
	cd packages/graphql
    echo "Checking psql installation..."
    if command -v psql &> /dev/null 2>&1
    then
        echo "Done! psql is installed"
    else
        echo "Fail! psql is not installed, to install psql use: brew install libpq"
        exit 1
    fi
    export PGPASSWORD='postgres'
    pg_isready -h localhost -U postgres -d postgres -p 5435 > /dev/null 2>&1
    sleep 2
    if [ $? -eq 0 ]; then
        echo "Done! PostgreSQL is ready and accepting connections successfully"
    else
        echo "Fail! PostgreSQL is not running"
        exit 1
    fi
    # get actual version
    version=`psql -t -X -h localhost -U postgres -d postgres -p 5435 -c "select version from indexer.migration;"`
    for sql_file in `/bin/ls database/*.sql`; do
        file_version=$(echo "$sql_file" | grep -o -E '[0-9]+')
        if (($file_version > $version)); then
            psql -h localhost -U postgres -d postgres -p 5435 -f $sql_file > /dev/null 2>&1
            if [ $? -eq 0 ]; then
                echo "Done! Successfully applied $sql_file"
            else
                echo "Fail! Error applying $sql_file"
                exit 1
            fi
        fi
    done
    echo "Done! Database has the schema migrations"
    echo ""
	cd ../..
}

sync_blocks () {
	cd packages/graphql
    echo "Sync block range (max interval is 10)..."
    read -p "From: " from
    read -p "To: " to
    echo "Syncing blocks from ${from} to ${to}"
    npx tsx src/sync-block-range.ts $from $to  > /dev/null 2>&1
    echo "Done! Setup finished successfully, backend is ready to use"
    echo ""
	cd ../..
}

init () {
echo "
    ______            _                     
    |  ____|          | |                    
    | |__  __  ___ __ | | ___  _ __ ___ _ __ 
    |  __| \ \/ / '_ \| |/ _ \| '__/ _ \ '__|
    | |____ >  <| |_) | | (_) | | |  __/ |   
    |______/_/\_\ .__/|_|\___/|_|  \___|_|   
                | |                          
                |_|                         
    "
    echo ""
    echo "Welcome to Explorer Setup Tool"
    sleep 2
    echo ""
}

menu () {
    COLUMNS=0
    PS3="Please enter your choice: "
    select choice_main in "Execute complete setup (from scratch)" "Check .env variables" "Start database" "Apply database migrations (all)" "Update database schema (diff)" "Sync blocks" "Exit"
    do
        case $choice_main in
            "Execute complete setup (from scratch)" )
                check_var
                start_database
                apply_migrations
                sync_blocks
                echo "Done! Type pnpm run:backend to run the backend"
                exit 0
                ;;
            "Check .env variables" )
                check_var
                menu
                ;;
            "Start database" )
                start_database
                menu
                ;;
            "Apply database migrations (all)" )
                start_database
                apply_migrations
                menu
                ;;
            "Update database schema (diff)" )
                start_database
                update_migrations
				menu
                ;;
            "Sync blocks" )
                sync_blocks
                menu
                ;;
            "Exit" )
                exit 0
                ;;
        esac
    done
}

init
menu
