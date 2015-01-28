/*!
 *
 *
 * @date 24.01.2015
 * @copyright skeeks.com
 * @author Semenov Alexander <semenov@skeeks.com>
 */

(function(sx, $, _)
{
    sx.createNamespace('classes',       sx);

    sx.classes._AjaxLoader = sx.classes.Component.extend({

        _init: function()
        {
            this.defaultOpts({
                "enable"    : true,             //включен
                "bindAjax"  : true,             //слушать ajax запросы
                "imageSrc"  : "images/1.gif" //картинка загрузки
            });
        },

        /**
         * @returns {*|mixed|null}
         */
        isEnabled: function()
        {
            return this.get("enable", true);
        },


        _onDomReady: function()
        {
            var self = this;

            this._buildLoader();

            if (this.get("bindAjax"))
            {
                sx.EventManager.bind(sx.ajax.ajaxStart, function(e, data)
                {
                    if (sx.ajax.hasExecutingQueries())
                    {
                        self.show();
                    }
                });

                sx.EventManager.bind(sx.ajax.ajaxStop, function(e, data)
                {
                    if (!sx.ajax.hasExecutingQueries())
                    {
                        self.hide();
                    }
                });
            }
        },

        /**
         * @returns {sx.classes._core._GlobalLoader}
         * @private
         */
        _buildLoader: function()
        {
            this.$_loader = $("<div>" ,{
                "id"     :   "sx-classes-ajaxLoader-1",
                "style"  :   "position: fixed; top: 50%; left: 50%; z-index: 10000; display: none;"
            }).append(
               /*$("<img>", {
                   'src'    : this.get("imageSrc")
               })*/
            );

            $("body").append(this.$_loader);

            return this;
        },

        hide: function()
        {
            this.$_loader.hide();
        },

        /**
         * @returns {sx.classes._core._GlobalLoader}
         */
        show: function()
        {
            if (this.isEnabled())
            {
                this._show();
            }

            return this;
        },

        _show: function()
        {
            this.$_loader.show();
        }
    });

    sx.classes.AjaxLoader = sx.classes._AjaxLoader.extend({});

    /**
     * Хэндлер ajax, не показывать глобальный лоадер
     */
    sx.classes.AjaxHandlerNoLoader = sx.classes.AjaxHandler.extend({

        _init: function()
        {
            //Отключаем внутренний подсчет состояния ajax запроса
            this.getAjaxQuery().set('allowCountExecuting', false);
        }

    });

})(sx, sx.$, sx._);