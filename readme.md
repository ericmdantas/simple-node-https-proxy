```shell
$ npm start
```


`server1.js` is the default server, `server2.js` is the server that receives some proxied requests.


`https://localhost:9998/api/server1` hits `server1.js` and returns the info;

`https://localhost:9998/api/server2` hits `server1.js`, proxies the requests to `server2.js` and should return the info.
