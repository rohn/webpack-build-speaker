/**
 * @class WebpackBuildSpeakerPlugin
 * @extends Object
 * A Webpack plugin that generates OS notifications for build steps using node-notifier.
 */
var os = require('os');
var say = require('say');

var WebpackBuildSpeakerPlugin = function(cfg) {
    cfg = cfg || {};
    /**
     * @cfg {string} [voice='Agnes']
     * The voice to use to speak the notification.
    */
    this.voice = cfg.voice || 'Agnes';
    /**
     * @cfg {string} [buildSuccess='Build successful!']
     * The phrase to speak upon a successful build.
    */
    this.buildSuccess = cfg.buildSuccess || 'Build successful!';
    /**
     * @cfg {string} [buildWarning='The build has warnings.']
     * The phrase to speak upon warnings with the build.
    */
    this.buildWarning = cfg.buildWarning || 'The build has warnings.';
    /**
     * @cfg {string} [buildError='The build has errors!']
     * The phrase to speak upon errors with the build.
    */
    this.buildError = cfg.buildError || 'The build has errors!';
    /**
     * @cfg {Boolean} [suppressSuccess=false]
     * True to suppress the success notifications, otherwise false (default). Note that the success notification will
     * always be shown following a failed compilation regardless of this setting.
     */
    this.suppressSuccess = cfg.suppressSuccess || false;
    /**
     * @cfg {Boolean} [suppressWarning=false]
     * True to suppress the warning notifications, otherwise false (default).
     */
    this.suppressWarning = cfg.suppressWarning || false;
    /**
     * @property {Boolean} buildSuccessful
     * Whether or not the last build was successful. Read-only.
     */
    this.buildSuccessful = false;
};

WebpackBuildSpeakerPlugin.prototype.onCompilationDone = function(results) {
    var notify = !this.suppressSuccess,
        msg = this.buildSuccess

    if (results.hasErrors()) {
        notify = true;
        msg = this.buildError;
        this.buildSuccessful = false;
    } else if (!this.suppressWarning && results.hasWarnings()) {
        notify = true;
        msg = this.buildWarning;
        this.buildSuccessful = false;
    } else {
        if (!notify && !this.buildSuccessful) {
            notify = true; // previous build failed, let's tell them even if success notifications are suppressed
        }
        this.buildSuccessful = true;
    }

    if (notify) {
        say.speak(this.voice, msg);
    }

};

WebpackBuildSpeakerPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', this.onCompilationDone.bind(this));
};

module.exports = WebpackBuildSpeakerPlugin;
