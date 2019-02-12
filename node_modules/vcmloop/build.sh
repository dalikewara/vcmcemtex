#! /bin/bash

browserify app.js --s vcmloop > dist/vcmloop.js && browserify app.js --s vcmloop | uglifyjs -cm > dist/vcmloop.min.js