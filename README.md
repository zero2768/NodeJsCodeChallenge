
# Node.js Code Challenge
In this code challenge, you have to create a Javascript module to analysis and transform
HTTP/1.1 request. Following ten rules are your mission:
1. If this HTTP method is GET and path is /testCust/resource , please modify path to
/testCust/static/assets
2. If this HTTP method is GET and path is /testCust/me , please check if sbcookie
Cookie exists in header. Throw an error if not existing.
3. If this HTTP method is GET, please check if referer header is belong to
www.testCust.com . Throw an error if it is invalid.
4. If this HTTP method is GET and path is match /testCust/api/* , please add From in the
header and the value is hello@testCust.com .
5. If this HTTP method is POST/PUT, please remove all the url query string .
6. If this HTTP method is POST/PUT, please check if X-testCust-AGENT exists in
header. Throw an error if not existing.
7. If this HTTP method is POST/PUT, please check if Content-Type exists in header and
the value should be “application/json”. Throw error if it is invalid.
8. If this HTTP method is DELETE, please check if X-testCust-AGENT exists in
header and the value should be “AGENT_1” only. Throw error if it is invalid.
9. This library should add X-testCust-TIMESTAMP in the header for all HTTP
requests, the value is current timestamp.
10. This library only handles the domain from www.testCust.com . Throw an error if it is
invalid.
Who will use this module/library?
Just like you, a Node.js developer.
About Input
- YAML file
- JSON file
About Output
- YAML file
- JSON file
- Error
Development Requirement
You have to implement above ten rules and input/output integration. However, we hope you can
consider more when you design this software:
- Rule is configurable, ex:
○ In Rule 7, maybe we are not only allow “AGENT_1” being valid but also
“AGENT_2”, or even we don’t check the value anymore.
○ In Rule 2, maybe we are not only check the sbcookie existing but also check
the value if it is correct or not.
○ IMPORTANT : This library should be easier to add/remove/change/validate
the HTTP method, path, header or value etc.
- Rule is customizable
○ User can easily customize and add their own rules.
○ User is free to choose rules to run, ex: choose rule 1, and 3 only.
- Input/Output should be easily adopt other formats, ex: XML, Node.js
Readable/Writable Stream and etc.

### Data Format Examples
JSON:
```sh
{
	"url" : "http://www.testCust.com/some/resource?q=1" ,
	"method" : "POST" ,
	"headers" : {
		"Cookie" : "name=value; name2=value2; name3=value3" ,
		"Content-Type" : "application/json" ,
		"X-testCust-AGENT" : "anything"
	}
}
```
YAML:
```sh
url : http://www.testCust.com/some/resource?q=1
method : POST
headers :
Cookie : name=value; name2=value2; name3=value3
Content-Type : application/json
X-testCust-AGENT : anything
```
