```shell
$ npm start
```

`server1` is the default server, `server2` is the server that receives some proxied requests.

`/api/server1` hits `server1` and returns the info;
`/api/server1` hits `server1`, proxies the requests to `server2` and should returns the info.
