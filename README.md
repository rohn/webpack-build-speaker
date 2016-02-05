# webpack-build-speaker

A [Webpack](https://webpack.github.io/) plugin, for Mac OS X, that uses the [say](https://github.com/Marak/say.js) module to speak notifications for Webpack build errors and warnings.

Are you tired of having to constantly switch between your IDE and terminal window to see whether your latest edits resulted in a failed build? Why didn't your latest changes get [hot-loaded](https://github.com/gaearon/react-hot-loader)? Was there a syntax error or failed unit test? With this plugin, you will always be apprised of build problems without having to keep an eye on your terminal window.

To use, install the webpack-build-speaker package `npm install webpack-build-speaker --save-dev` and add the plugin to your [Webpack configuration file](https://webpack.github.io/docs/configuration.html):


```javascript
// webpack.config.js
var WebpackBuildSpeakerPlugin = require('webpack-build-speaker');

module.exports = {
  // ... snip ...
  plugins: [
    new WebpackBuildSpeakerPlugin()
  ],
  // ... snip ...
}
```

Config Options
--------------

#### voice
The voice to use to speak the notification. All of the Mac voices are available as listed in the [say](https://github.com/Marak/say.js) package.

#### buildSuccess
The message to speak for a successful build. Defaults to `Build successful!`.

#### buildWarning
The message to speak for a warning with the build. Defaults to `The build has warnings`.

#### buildError
The message to speak for a failed build. Defaults to `The build has errors!`.

#### suppressSuccess
True to suppress the success notifications, otherwise false (default). Note that the success notification will always be shown following a failed build regardless of this setting.

#### suppressWarning
True to suppress the warning notifications, otherwise false (default).


Notes
-----
Huge thanks to Rocco Cataldo for his [webpack-build-notifier](https://github.com/RoccoC/webpack-build-notifier) which was a starting point for this plugin.
