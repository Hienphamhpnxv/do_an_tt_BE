import express from 'express';
const route = express.Router();

route.use(function (req, res, next) {
	res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
	console.log('Passing');
	next();
});

export const router = route;
