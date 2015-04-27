/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 28.04.2015
 */
(function(sx, $, _)
{
    sx.createNamespace('classes.modal',       sx);

    sx.classes.modal._Alert = sx.classes.Component.extend({

        /**
         * Установка необходимых данных
         * @param text
         * @param opts
         */
        construct: function(text, opts)
        {
            opts = opts || {};
            opts.text = text;

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]);
        },

        /**
         * @returns {sx.classes.modal._Alert}
         */
        show: function()
        {
            this.trigger('beforeShow');
            this._show();
            this.trigger('afterShow');

            return this;
        },

        /**
         * @returns {sx.classes.modal._Alert}
         * @private
         */
        _show: function()
        {
            alert(this.get("text"));
            return this;
        },
    });

    sx.classes.modal.Alert  = sx.classes.modal._Alert.extend({});

    sx.classes.modal._Confirm = sx.classes.modal.Alert.extend({

        _init: function()
        {
            if (this.get("yes"))
            {
                this.onYes(this.get("yes"));
            }
            if (this.get("no"))
            {
                this.onNo(this.get("no"));
            }
        },

        /**
         * @returns {sx.classes.modal._Confirm}
         */
        show: function()
        {
            this.trigger("beforeShow", this);

            var result = confirm(this.get("text"));

            if (result)
            {
                this.trigger("yes", this);
            } else
            {
                this.trigger("no", this);
            }

            this.trigger("closed", this);

            return this;
        },

        /**
         * @param callback
         * @returns {sx.classes.modal._Confirm}
         */
        onYes: function(callback)
        {
            this.bind("yes", callback);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Confirm}
         */
        onNo: function(callback)
        {
            this.bind("no", callback);
            return this;
        }
    });

    sx.classes.modal.Confirm    = sx.classes.modal._Confirm.extend({});

    sx.classes.modal._Prompt = sx.classes.Component.extend({

        /**
         * Установка необходимых данных
         * @param text
         * @param opts
         */
        construct: function(text, opts)
        {
            opts = opts || {};

            opts.text = text;

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]);
        },

        _init: function()
        {
            if (this.get("yes"))
            {
                this.onYes(this.get("yes"));
            }

            if (this.get("no"))
            {
                this.onNo(this.get("no"));
            }
        },

        /**
         * @returns {sx.classes.modal._Promt}
         */
        show: function()
        {
            this.trigger("beforeShow", this);

            var result = prompt(this.get("text"), this.get("value", ""));

            if (result)
            {
                this.trigger("yes", result);
            } else
            {
                this.trigger("no", this);
            }

            this.trigger("closed", this);

            return this;
        },

        /**
         * @param callback
         * @returns {sx.classes.modal._Confirm}
         */
        onYes: function(callback)
        {
            this.bind("yes", callback);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Confirm}
         */
        onNo: function(callback)
        {
            this.bind("no", callback);
            return this;
        }
    });

    sx.classes.modal.Prompt    = sx.classes.modal._Prompt.extend({});

    /**
     *
     */
    sx.classes.modal._Dialog = sx.classes.Component.extend({

        _init: function()
        {
            //Этот диалог покзаан?
            this.isShowed = false;

            if (!this.get('id'))
            {
                this.set('id', sx.helpers.String.randStr());
            }
        },

        /**
         * @returns {sx.classes.modal._Dialog}
         */
        show: function()
        {
            this.trigger("beforeShow", this);
            this.isShowed = true;
            this.trigger("afterShow", this);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Dialog}
         */
        hide: function()
        {
            this.trigger("beforeHide", this);
            this.isShowed = false;
            this.trigger("afterHide", this);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Dialog}
         */
        toggle: function()
        {
            if (this.isShowed)
            {
                this.hide();
            } else
            {
                this.show();
            }

            return this;
        }

    });

    sx.classes.modal.Dialog    = sx.classes.modal._Dialog.extend({});


    /**
     * @param text
     * @param options
     * @returns {sx.classes.modal.Alert}
     */
    sx.alert = function(text, options)
    {
        options = options || {};
        return new sx.classes.modal.Alert(text, options).show();
    }

    /**
     * @param text
     * @param options
     * @returns {sx.classes.modal.Confirm}
     */
    sx.confirm = function(text, options)
    {
        options = options || {};
        return new sx.classes.modal.Confirm(text, options).show();
    }

    /**
     * @param text
     * @param options
     * @returns {sx.classes.modal.Promt}
     */
    sx.prompt = function(text, options)
    {
        options = options || {};
        return new sx.classes.modal.Prompt(text, options).show();
    }

    /**
     * @param options
     * @returns {sx.classes.modal.Dialog}
     */
    sx.dialog = function(options)
    {
        options = options || {};
        return new sx.classes.modal.Dialog(options).show();
    }

})(sx, sx.$, sx._);