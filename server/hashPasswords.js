const { sequelize } = require('./src/models/config');
const User = require('./src/models/User');
const bcrypt = require('bcrypt');

async function hashExistingPasswords() {
    try {
        // Get all users with plain text passwords
        const users = await User.findAll();

        console.log(`Found ${users.length} users to update...`);

        for (const user of users) {
            const currentPassword = user.password;
            // console.log(currentPassword); // for debugging

            // Skip if it looks like it's already hashed
            if (currentPassword.startsWith('$2b$') || currentPassword.startsWith('$2a$')) {
                console.log(`User ${user.username} already has a hashed password.`);
                continue;
            }

            // Hash the password
            const hashedPassword = bcrypt.hashSync(currentPassword, 10);

            // Update directly with setDataValue to bypass the setter
            user.setDataValue('password', hashedPassword);
            await user.save();

            console.log(`Updated password for ${user.username}`);
        }

        console.log('All passwords have been hashed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating passwords:', error);
        process.exit(1);
    }
}

// Connect to the database and run the migration
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        hashExistingPasswords();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });