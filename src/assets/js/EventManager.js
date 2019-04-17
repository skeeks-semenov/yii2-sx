/* 
 * @author Semenov Alexander <semenov@skeeks.com>
*/
(function (sx, $, _) {

    sx.createNamespace("classes", sx);

    /**
     * @type {*|Function|void}
     * @private
     */
    sx.classes.EventManager = sx.classes.Base.extend({

        /**
         *
         */
        _hooks: {},

        /**
         * @param opts
         */
        construct: function (opts) {
            this._opts = opts || {};
            this._$ = $('<div/>');
        },

        /**
         * @param event
         * @param data
         * @returns {sx.classes.EventManager}
         */
        trigger: function (event, data) {
            if (this._hooks[event] && this._hooks[event].length) {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i) {
                    var hook = this._hooks[event][i];

                    if (_.isFunction(hook)) {
                        // Update event data
                        var result = hook(data);

                        // Don't trigger event
                        if (result === false) {
                            return this;
                        }

                        // Trigger with new data
                        data = result || data;
                    }
                }
            }

            this._$.trigger.apply(this._$, [event, data]);

            return this;
        },

        /**
         * @param event
         * @param callback
         * @returns {sx.classes.EventManager}
         */
        on: function (event, callback) {
            this._$.on(event, callback);
            return this;
        },

        /**
         * @param event
         * @param callback
         */
        off: function (event, callback) {
            this._$.off(event, callback);
        },

        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {*}
         */
        bind: function (event, callback) {
            return this.on(event, callback);
        },

        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {*|void}
         */
        unbind: function (event, callback) {
            return this.off(event, callback);
        },

        /**
         *
         * @param event
         * @param hookFunction
         * @returns {sx.classes.EventManager}
         */
        hook: function (event, hookFunction) {
            if (!this._hooks[event]) {
                this._hooks[event] = [];
            }

            this._hooks[event].push(hookFunction);

            return this;
        },

        /**
         *
         * @param event
         * @param hookFunction
         * @returns {sx.classes.EventManager}
         */
        unhook: function (event, hookFunction) {
            if (this._hooks[event] && this._hooks[event].length) {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i) {
                    var hook = this._hooks[event][i];

                    if (hookFunction == hook) {
                        this._hooks[event][i] = null;
                    }
                }

                // TODO: clear nulled functions
            }

            return this;
        },

        /**
         *
         * @returns {sx.classes.EventManager._hooks|{}}
         */
        hooks: function () {
            return this._hooks;
        }
    });

    sx.EventManager = new sx.classes.EventManager();


})(Skeeks, Skeeks.$, Skeeks._);
