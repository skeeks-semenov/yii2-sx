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

            var wait_text = sx.Config.get('blocker_wait_text');
            var wait_image = sx.Config.get('blocker_wait_image');
            var blocker_opacity = sx.Config.get('blocker_opacity');

            var message = "<div style=''><img src='" + wait_image + "' /></div>";
            /*this.defaultOpts({
                message: message,
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity:         0
                    /!*cursor:          'wait'*!/
                },

                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: 'none;',
                    '-webkit-border-radiloaderus': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });*/

            this.defaultOpts({
                message: "<div style=''></div>",
                overlayCSS: {
                    /*background: 'linear-gradient(100deg, #eceff180 30%, #f6f7f870 50%, #eceff182 70%)',*/
                    opacity:         1,
                    cursor:          'wait'
                },
                css: {
                    border: 'none',
                    backgroundColor: 'none;',
                    opacity: .5,
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