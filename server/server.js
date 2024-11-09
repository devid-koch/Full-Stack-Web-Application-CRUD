const app = require('./app');
const knex = require('./config/knex');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await knex.migrate.latest();
        console.log('Database migrations completed successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
