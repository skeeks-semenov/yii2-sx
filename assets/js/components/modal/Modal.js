/*!
 *
 * Модальные окна alert и confirm.
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 06.10.2014
 * @since 1.0.0
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

        _init: function()
        {
            this.defaultOpts({
                "autoShow" : true
            });

            if (this.isAutoShow())
            {
                this.show();
            }
        },

        show: function()
        {
            alert(this.get("text"));
        },


        /**
         * @returns {boolean}
         */
        isAutoShow: function()
        {
            return Boolean(this.get("autoShow"));
        }
    });

    sx.classes.modal.Alert = sx.classes.modal._Alert.extend({});

    sx.classes.modal._Confirm = sx.classes.modal.Alert.extend({

        _init: function()
        {
            this.defaultOpts({
                "autoShow"  : false
            });

            if (this.isAutoShow())
            {
                this.show();
            }

            if (this.get("yes"))
            {
                this.onYes(this.get("yes"));
            }
            if (this.get("no"))
            {
                this.onNo(this.get("no"));
            }
        },

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

    sx.classes.modal.Confirm = sx.classes.modal._Confirm.extend({});


})(sx, sx.$, sx._);