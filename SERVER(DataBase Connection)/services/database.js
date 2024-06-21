const snowflake = require('snowflake-connector-nodejs');

// Connection pool object (initialized outside the functions)
let pool;

const initialize = (account, username, password) => {
    const connectionOptions = {
        account,
        username,
        password,
    };

    const poolOptions = {
        min: 0, // Minimum number of idle connections
        max: 5,  // Maximum number of connections in the pool
    };

    pool = snowflake.createPool(connectionOptions, poolOptions);

    return new Promise((resolve, reject) => {
        pool.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Connection pool initialized successfully.');
            resolve();
        });
    });
};

const execute = (query) => {
    return new Promise((resolve, reject) => {
        if (!pool) {
            reject(new Error('Connection pool not initialized.'));
            return;
        }

        pool.use((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.execute({ sqlText: query }, (queryErr, results) => {
                if (queryErr) {
                    reject(queryErr);
                } else {
                    resolve(results);
                }

                // Release the connection back to the pool
                connection.release();
            });
        });
    });
};

const stop = () => {
    return new Promise((resolve, reject) => {
        if (!pool) {
            resolve(); // Already closed
            return;
        }

        pool.destroy((err) => {
            if (err) {
                reject(err);
            } else {
                pool = null; // Clear pool reference
                console.log('Connection pool closed successfully.');
                resolve();
            }
        });
    });
};

module.exports = {
    initialize,
    execute,
    stop
}
