#! /bin/bash

browserify app.js --s vcmpad > dist/vcmpad.js && browserify app.js --s vcmpad | uglifyjs -cm > dist/vcmpad.min.js