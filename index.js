const app = require('./app');
const { appConfig } = require('./config');


async function main() {
    await appConfig();
    app.listen(3001);
    return true;
}


main().then(() => console.log('Server is running at http://localhost:3001')).catch(console.error)