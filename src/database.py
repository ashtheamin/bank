# 2023 Copyright Ash Amin
# Functions are from and modified from the guide here:
# https://www.postgresqltutorial.com/postgresql-python/connect/
# Big thank you for the clear and coherent tutorial.

import psycopg2
from configparser import ConfigParser

# Function is from: https://www.postgresqltutorial.com/postgresql-python/connect/
def databaseConfig(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

# Function to test connection to database
def databaseConnect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = databaseConfig()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        cur = conn.cursor()
        
	# execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)
       
	# close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

# Initialise Database
def databaseInit():
    """ create tables in the PostgreSQL database"""
    commands = [
        ("""
        CREATE TABLE users (
            userID SERIAL PRIMARY KEY,
            userName VARCHAR(255) NOT NULL
        )
        """),
        ("""
        CREATE TABLE accounts (
            accountID SERIAL PRIMARY KEY,
            userID SERIAL,
            balance VARCHAR,
            FOREIGN KEY (userID)
            REFERENCES users (userID)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """),
        ]
    conn = None
    try:
        # read the connection parameters
        params = databaseConfig()
        # connect to the PostgreSQL server
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        # create table one by one
        for command in commands:
            cur.execute(command)
        # close communication with the PostgreSQL database server
        cur.close()
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# Create a new user
def databaseUserNew(name):
    sql = """INSERT INTO users(userName)
             VALUES(%s) RETURNING userID;"""
    conn = None
    user = None
    try:
        # read database configuration
        params = databaseConfig()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (name,))
        user = cur.fetchone()

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return user

# Retrieve a user
def databaseUserGetByID(userID):
    """
    Inputs: id:
    Outputs: User tuple (id, name)
    """
    sql = """SELECT * FROM users WHERE
            userID=(%s);"""
    conn = None
    user = None
    try:
        # read database configuration
        params = databaseConfig()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (userID,))
        user = cur.fetchone()

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return user

# Delete a user
def databaseUserDeleteByID(userID):
    sql = """DELETE FROM users WHERE userID=(%s);"""
    conn = None
    user = None
    try:
        # read database configuration
        params = databaseConfig()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (userID,))

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# Update a user's name:
def databaseUserUpdateNameByID(userID, name):
    sql = """UPDATE users SET userName=(%s) WHERE userID=(%s);"""
    conn = None
    user = None
    try:
        # read database configuration
        params = databaseConfig()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (name,userID,))

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# Open an account for a user.
def databaseAccountNew(userID, balance):
    sql = """INSERT INTO accounts(userID, balance)
             VALUES(%s, %s) RETURNING accountID;
             """
    conn = None
    account = None
    try:
        # read database configuration
        params = databaseConfig()
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (userID, balance))

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return account

if __name__ == '__main__':
    databaseInit()
    databaseUserNew("Ash")
    databaseUserUpdateNameByID(1, "Ashley")
    databaseAccountNew(1, 0)