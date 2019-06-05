const express = require('express');
const router = express.Router();

/* mission:10 */
router.use(function(req, res, next) {
  let domain = req.host;
  //domain = 'www.shopback.com'; //for test
  if(!(domain && domain == 'www.shopback.com')){
    let err = new Error('illegal domain!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
  console.log('Mission:10 Completed !');
});

/* mission:9 */
router.use(function(req, res, next) {
  res.header('X-SHOPBACK-TIMESTAMP', Date.now());
  next();
});

/* mission:3 */
router.get('/*', function(req, res, next) {
  let pattern = new RegExp('^(https?:\/\/www\.shopback\.com\/?)');
  if(!(req.body.url && pattern.test(req.body.url))){
    let err = new Error('invalid referer url!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
  console.log('Mission:3 Completed !');
});

/* mission:1 */
router.get('/shopback/resource', function(req, res, next) {
  res.redirect('/shopback/static/assets')
});

/* mission:1 */
router.get('/shopback/static/assets', function(req, res, next) {
  //doSomething...
  res.send('Mission:1 Completed !');
});

/* mission:2 + improve*/
router.get('/shopback/me', sbcookieExist, sbcookieChk, function(req, res, next) {
  res.send('Mission:2 Completed !');
});

/* mission:2 + improve*/
function sbcookieExist(req, res, next){
  console.log('sbcookieExist');
  //let cookies = req.headers.cookie;
  let cookies = req.header('Cookie');
  let cookiesMap = new Map();
  [].forEach.call(cookies.replace(/\s+/g,"").split(';'), function(el) {
    cookiesMap.set(el.split('=')[0], el.split('=')[1]);
  });
  if(cookiesMap.get('sbcookie') == undefined || cookiesMap.get('sbcookie') == ''){
    let err = new Error('sbcookie not exist!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

/* mission:2 + improve*/
function sbcookieChk(req, res, next){
  console.log('sbcookieChk');
  //check sbcookie value if need to 
  //next(err); or next();
};

/* mission:4 */
router.get('/shopback/api/**', function(req, res, next) {
  res.header('From', 'hello@shopback.com');
  res.send('Mission:4 Completed !');
  //or next(/shopback/api/doSomething);
});

/* mission:5.6.7 */
router.post('/*', middlewareM5, middlewareM6, middlewareM7, function(req, res, next) {
  //doSomething...
  res.send('Mission:5.6.7 Completed !');
});

/* mission:5.6.7 */
router.put('/*', middlewareM5, middlewareM6, middlewareM7, function(req, res, next) {
  //doSomething...
  res.send('Mission:5.6.7 Completed !');
});

/* mission:5 */
function middlewareM5(req, res, next){
  console.log('middlewareM5');
  if(req.query != {}){
    req.query = {};
    //res.redirect(307, req.path);  //rePost to cleanUrl
  }
  next();
};

/* mission:6 */
function middlewareM6(req, res, next){
  console.log('middlewareM6');
  if(req.header('X-SHOPBACK-AGENT') == undefined || req.header('X-SHOPBACK-AGENT') == ''){
    let err = new Error('X-SHOPBACK-AGENT not exist!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

/* mission:7 */
function middlewareM7(req, res, next){
  console.log('middlewareM7');
  if(!req.is('application/json') || req.is('application/json') == null){
    let err = new Error('Content-Type should be \“application/json\”!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

/* mission:8 + improve */
router.delete('/*', middlewareM8, function(req, res, next) {
  res.send('Mission:8 Completed !');
  //or next(deleteSomething);
});

/* mission:8 + improve */
function middlewareM8(req, res, next){
  console.log('middlewareM8');
  //let customRule = req.header('CustomRule');
  let customRule = 2; //for test
  if(customRule == 1) {
    return agentRule1(req, res, next);
  }else if(customRule == 2){
    return agentRule2(req, res, next);
  }else{
    //not check the AGENT value
    next();
  }
};

/* mission:8 + improve */
function agentRule1(req, res, next){
  if(req.header('X-SHOPBACK-AGENT') == undefined || req.header('X-SHOPBACK-AGENT') == ''){
    let err = new Error('X-SHOPBACK-AGENT not exist!');
    err.status = 403;
    next(err);
  }else if(agent != 'AGENT_1'){
    let err = new Error('X-SHOPBACK-AGENT incorrect!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

/* mission:8 + improve */
function agentRule2(req, res, next){
  let agent = req.header('X-SHOPBACK-AGENT');
  if(undefined == agent || '' == agent){
    let err = new Error('X-SHOPBACK-AGENT not exist!');
    err.status = 403;
    next(err);
  }else if(agent != 'AGENT_1' || agent != 'AGENT_2'){
    let err = new Error('X-SHOPBACK-AGENT incorrect!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  console.log(404);
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use(function(err, req, res, next) {
  console.log(err.message);
  res.status(err.status || 500).send(err.message);
});


module.exports = router;
