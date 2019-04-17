/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 05.10.2016
 */
(function(sx, $, _, window)
{
    sx.createNamespace('classes', sx);
    sx.createNamespace('classes._core', sx);

    sx.classes._Component = sx.classes.Entity.extend({

        _coreInit:         function()
        {
            var self = this;

            this._eventManager  = null;

            this._validate();
            this._init();

            sx.registerComponent(this);

            this._windowReadyTrigger    = 0;
            this._domReadyTrigger       = 0;

            this.onDomReady(function()
            {
                self._onDomReady();
            });

            this.onWindowReady(function()
            {
                self._onWindowReady();
            });


            $(_.bind(this._domReady, this));

            if (document.readyState == 'complete')
            {
                self._windowReady();
            } else
            {
                $(window).on("load", function() {
                    self._windowReady();
                });
            }
        },

        _init:         function()
        {},

        _onDomReady:   function()
        {},

        _onWindowReady:   function()
        {},

        _domReady: function()
        {
            this._domReadyTrigger = 1;
            this.trigger("onDomReady", this);
        },

        /**
         * @param callback
         * @returns {*}
         */
        onDomReady: function(callback)
        {
            if (this._domReadyTrigger == 1)
            {
                callback(this);
            } else
            {
                this.bind("onDomReady", callback);
            }
            return this;
        },

        _windowReady: function()
        {
            this._windowReadyTrigger = 1;
            this.trigger("onWindowReady", this);
        },

        /**
         * @param callback
         * @returns {*}
         */
        onWindowReady: function(callback)
        {
            if (this._windowReadyTrigger == 1)
            {
                callback(this);
            } else
            {
                this.bind("onWindowReady", callback);
            }

            return this;
        },



        /**
         * Свой внутренние eventmanager
         * @returns {Skeeks.classes.EventManager}
         */
        getEventManager: function()
        {
            if (this._eventManager === null)
            {
                this._eventManager = new sx.classes.EventManager();
            }

            return this._eventManager;
        },


        /**
         * @param event
         * @param callback
         * @returns {sx.classes._Component}
         */
        on: function(event, callback)
        {
            this.getEventManager().on(event, callback);
            return this;
        },


        /**
         * @param event
         * @param callback
         * @returns {sx.classes._Component}
         */
        off: function(event, callback)
        {
            this.getEventManager().off(event, callback);
            return this;
        },


        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {*}
         */
        bind: function(event, callback)
        {
            return this.on(event, callback);
        },

        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {sx.classes._Component}
         */
        unbind: function(event, callback)
        {
            return this.off(event, callback);
        },

        /**
         * @param event
         * @param data
         * @returns {sx.classes._Component}
         */
        trigger: function(event, data)
        {
            this.getEventManager().trigger(event, data);
            return this;
        },

        /**
         * @param event
         * @param hookFunction
         * @returns {sx.classes._Component}
         */
        hook: function(event, hookFunction)
        {
            this.getEventManager().hook(event, hookFunction);
            return this;
        },

        /**
         * @param event
         * @param hookFunction
         * @returns {sx.classes._Component}
         */
        unhook: function(event, hookFunction)
        {
            this.getEventManager().unhook(event, hookFunction);
            return this;
        },

        /**
         * @returns {*}
         */
        hooks: function()
        {
            return this.getEventManager().hooks();
        },

    });

    sx.classes.Component = sx.classes._Component.extend({});


    // components holder
    sx.components = [];

    // register function
    sx.registerComponent = function(component)
    {
        if (!(component instanceof sx.classes._Component))
        {
            throw new Error("Instance of sx.classes.Component was expected.");
        }

        sx.components.push(component);
        return component;
    };

})(sx, sx.$, sx._, window);

