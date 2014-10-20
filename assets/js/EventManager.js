/* 
 * @author Semenov Alexander <semenov@skeeks.com>
*/ 
(function(sx, $, _)
{
   sx.EventManager = {
        _$:     $('<div/>'),
        _hooks: {},

        trigger: function (event, data)
        {
            if (this._hooks[event] && this._hooks[event].length)
            {

                for (var i = 0, l = this._hooks[event].length; i < l; ++i)
                {
                    var hook = this._hooks[event][i];

                    if (_.isFunction(hook))
                    {
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

        bind: function (event, callback)
        {
            this._$.bind(event, callback);
            return this;
        },

        unbind: function (event, callback)
        {
            this._$.unbind(event, callback);
        },

        hook: function (event, hookFunction)
        {
            if (!this._hooks[event])
            {
                this._hooks[event] = [];
            }

            this._hooks[event].push(hookFunction);

            return this;
        },

        unhook: function (event, hookFunction)
        {
            if(this._hooks[event] && this._hooks[event].length)
            {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i)
                {
                    var hook = this._hooks[event][i];

                    if (hookFunction == hook)
                    {
                        this._hooks[event][i] = null;
                    }
                }

                // TODO: clear nulled functions
            }

            return this;
        },

        hooks: function()
        {
            return this._hooks;
        }

   };

    sx.createNamespace("classes", sx);


    /**
     * @type {*|Function|void}
     * @private
     */
    sx.classes.EventManager = sx.classes.Base.extend({

        _hooks: {},

        construct: function (opts)
        {
            this._opts    = opts || {};
            this._$ =  $('<div/>');
        },

        trigger: function (event, data)
        {
            if (this._hooks[event] && this._hooks[event].length)
            {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i)
                {
                    var hook = this._hooks[event][i];

                    if (_.isFunction(hook))
                    {
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

        bind: function (event, callback)
        {
            this._$.bind(event, callback);
            return this;
        },

        unbind: function (event, callback)
        {
            this._$.unbind(event, callback);
        },

        hook: function (event, hookFunction)
        {
            if (!this._hooks[event])
            {
                this._hooks[event] = [];
            }

            this._hooks[event].push(hookFunction);

            return this;
        },

        unhook: function (event, hookFunction)
        {
            if(this._hooks[event] && this._hooks[event].length)
            {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i)
                {
                    var hook = this._hooks[event][i];

                    if (hookFunction == hook)
                    {
                        this._hooks[event][i] = null;
                    }
                }

                // TODO: clear nulled functions
            }

            return this;
        },

        hooks: function()
        {
            return this._hooks;
        }
    });


})(Skeeks, Skeeks.$, Skeeks._);
