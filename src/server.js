const app = require('./app');

app.listen(3333, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3333');
});
