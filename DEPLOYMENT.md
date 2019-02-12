### Global Dependencies
```console
sudo npm i -g browserify uglify-js uglify-es
```

### Browserify
```console
browserify app.js --s vcmcemtex > dist/vcmcemtex.js && browserify app.js --s vcmcemtex | uglifyjs -cm > dist/vcmcemtex.min.js
```