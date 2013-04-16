# node-uneval

Approximation of uneval for node.js/v8. Convert objects into code. Do **not** use this
unless you know all the things that could possibly go wrong with this. You have been
warned -- use at your own risk.

Install with:

```sh
npm i uneval --save
```

Use with

```javascript
var uneval = require('uneval')

uneval({ a: 1 }) == '({a:1})'
```

# LICENSE

Was gonna go with public domain but it does comes with some dangerous downsides, so I'm
converting this to CC instead as of version v0.1.1.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img
alt="Creative Commons License" style="border-width:0"
src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br />This work is licensed
under a <a rel="license"
href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons
Attribution-ShareAlike 3.0 Unported License</a>.

# TODO

* Lots more tests!
* Cross-node-version support.

