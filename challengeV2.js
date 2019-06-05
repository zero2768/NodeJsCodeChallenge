const express = require('express');
//const parser = require('xml2json');

/* mission:1 */
exports.reDir = function(req, res, next) {
  req.url = '/shopback/static/assets';
  next();
};

/* mission:1 */
exports.realDir = function(req, res, next) {
  //doSomething...
  res.json({ message: 'Mission:1 Completed !' });
  console.log('Mission:1 Completed !');
};

/* mission:2 & improve */
exports.shopbackMeMainMethod = function(req, res, next) {
  res.json({ message: 'Mission:2 Completed !' });
};

/* mission:2 & improve */
exports.sbcookieExist = function(req, res, next){
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

/* mission:2 & improve */
exports.sbcookieValueCheck = function(req, res, next){
  console.log('sbcookieChk');
  //check sbcookie value if need to
  next();
  //or next(err);
};

/* mission:3 */
exports.refererUrlCheck = function(req, res, next) {
  let pattern = new RegExp('^(https?:\/\/www\.shopback\.com\/?)');
  if(!(req.body.url && pattern.test(req.body.url))){
    let err = new Error('invalid referer url!');
    err.status = 403;
    next(err);
  }else{
    console.log('Mission:3 referer checked !');
    next();
  }
};

/* mission:4 */
exports.addHeaderFrom = function(req, res, next) {
  res.header('From', 'hello@shopback.com');
  res.json({ message: 'Mission:4 headerFrom added !' });
  //or next(/shopback/api/doSomething);
};

/* mission:5 */
exports.removeQuery = function(req, res, next){
  console.log('Mission:5 removeQuery');
  if(req.query != {}){
    req.query = {};
  }
  next();
  //or rePost to a cleanUrl
  //res.redirect(307, req.path);
};

/* mission:6 */
exports.checkAgent = function(req, res, next){
  console.log('Mission:6 checkAgentExist');
  if(req.header('X-SHOPBACK-AGENT') == undefined || req.header('X-SHOPBACK-AGENT') == ''){
    let err = new Error('X-SHOPBACK-AGENT not exist!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

/* mission:7 */
exports.checkApplicationJson =function(req, res, next){
  console.log('Mission:7 checkApplicationJson');
  if(!req.is('application/json') || req.is('application/json') == null){
    let err = new Error('Content-Type should be \“application/json\”!');
    err.status = 403;
    next(err);
  }else{
    next();
  }
};

/* mission:5.6.7 */
exports.postAndPutMain = function(req, res, next){
  console.log('postAndPutMain');
  res.json({ message: 'Thsi is Post & Put MainMethod' });
  //or next(err);
};

/* mission:8 & Rule is customizable */
exports.customizedAgentChk = function(req, res, next) {
  return middlewareM8(req, res, next);
  //or next(deleteSomething);
};

/* mission:8 & Rule is customizable */
function middlewareM8(req, res, next){
  console.log('middlewareM8');
  //let customRuleType = req.header('CustomRuleType');
  let customRuleType = 2; //for test
  if(customRuleType == 1) {
    return agentRule1(req, res, next);
  }else if(customRuleType == 2){
    return agentRule2(req, res, next);
  }else{
    //not to check the AGENT value
    next();
  }
};

/* mission:8 & Rule is customizable */
function agentRule1(req, res, next){
  console.log('agentRule1');
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

/* mission:8 & Rule is customizable */
function agentRule2(req, res, next){
  console.log('agentRule2');
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

/* mission:9 */
exports.addTimestampForAll = function(req, res, next) {
  res.header('X-SHOPBACK-TIMESTAMP', Date.now());
  console.log('Mission:9 timestamp added !');
  next();
};

/* mission:10 */
exports.checkDomain = function(req, res, next) {
  let domain = req.host;
  domain = 'www.shopback.com'; //for test
  if(!(domain && domain == 'www.shopback.com')){
    let err = new Error('illegal domain!');
    err.status = 403;
    next(err);
  }else{
    console.log('Mission:10 domain checked !');
    next();
  }
};

/* init Input/Output format */
exports.formatCheck = function(req, res, next) {
  return middlewareFormat(req, res, next);
};

/* init Input/Output format */
function middlewareFormat(req, res, next){
  console.log('middlewareFormat');
  //let customRuleType = req.header('CustomRuleType');
  let formatType = 1; //for test
  if(req.is('application/json')) {
    return formatJsonInit(req, res, next);
  }else if(req.is('/*yaml')){
    return formatYamlInit(req, res, next);
  }else if(req.is('application/xml')){
    return formatXmlInit(req, res, next);
  }else{
    let err = new Error('unexpected format!');
    err.status = 403;
    next(err);
  }
};

/* init Input/Output format */
function formatJsonInit(req, res, next) {
  res.header('From', 'application/json');
  //doSomething needed...
  next();
};

/* init Input/Output format */
function formatYamlInit(req, res, next) {
  //doSomething needed...
  next();
};

/* init Input/Output format */
function formatXmlInit(req, res, next) {
  //req.body = parser.toJson(req.body.toString(), { object: true });
  //doSomething needed...
  next();
};
