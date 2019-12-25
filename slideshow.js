const os = require('os');
const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

const serverPort = 443;
const privateKey = fs.readFileSync(__dirname + '/ssl-cert/server.pem', 'utf8');
const certificate = fs.readFileSync(__dirname + '/ssl-cert/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate /* , passphrase: '' */ };

app.use(express.static('public'));
app.use(function(req, res, next) {
	if(req.headers['x-forwarded-proto']==='http') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		res.setHeader('Access-Control-Allow-Headers', '*');
		if ( req.method === 'OPTIONS' ) {
			res.writeHead(200);
			res.end();
			return;
		}
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	next();
});

const pic1 = require('./pic1.js');
app.use('/pic1', pic1);

const httpsServer = https.createServer(credentials, app).listen(serverPort);


/* Utility */
function padZero(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

