### Global Dependencies
```console
sudo npm i -g browserify uglify-js uglify-es
```

### Browserify
```console
browserify app.js --s vcmloop > dist/vcmloop.js && browserify app.js --s vcmloop | uglifyjs -cm > dist/vcmloop.min.js
```