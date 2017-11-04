/*!
 * @date 29.01.2015
 * @copyright skeeks.com
 * @author Semenov Alexander <semenov@skeeks.com>
 */


(function(sx, $, _)
{
    sx.createNamespace('classes',       sx);

    sx.classes.BlockerJqueyUi = sx.classes._Blocker.extend({

        _init: function()
        {
            this.applyParentMethod(sx.classes._Blocker, '_init', []);

            this.defaultOpts({
                message: "<div style='padding: 5px;'>Подождите...</div>",
                css: {
                    border: '1px solid #108acb',
                    padding: '10px;',
                }
            });
        },

        /**
         * @returns {sx.classes.BlockerJqueyUi}
         * @private
         */
        _block: function()
        {
            var self = this;

            this.getWrapper().block( _.extend(this.toArray(), {

                'onBlock': function()
                {
                    self.trigger('afterBlock');
                },

                'onUnblock': function()
                {
                    self.trigger('afterUnblock');
                }

            }) );

            return this;
        },

        /**
         * @returns {sx.classes.BlockerJqueyUi}
         * @private
         */
        _unblock: function()
        {
            this.getWrapper().unblock();
            return this;
        },

        /**
         * @returns {boolean}
         */
        isAutoStart: function()
        {
            return Boolean(this.get("autoStart"));
        }
    });

    sx.classes.Blocker  = sx.classes.BlockerJqueyUi.extend({});

})(sx, sx.$, sx._);