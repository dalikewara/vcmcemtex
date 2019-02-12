#! /bin/bash

browserify app.js --s vcmcemtex > dist/vcmcemtex.js && browserify app.js --s vcmcemtex | uglifyjs -cm > dist/vcmcemtex.min.js