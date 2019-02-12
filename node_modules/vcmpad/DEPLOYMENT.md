### Global Dependencies
```console
sudo npm i -g browserify uglify-js uglify-es
```

### Browserify
```console
browserify app.js --s vcmpad > dist/vcmpad.js && browserify app.js --s vcmpad | uglifyjs -cm > dist/vcmpad.min.js
```