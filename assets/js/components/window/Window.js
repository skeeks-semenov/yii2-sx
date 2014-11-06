/*!
 *
 *
 *
 * @date 06.11.2014
 * @copyright skeeks.com
 * @author Semenov Alexander <semenov@skeeks.com>
 */


(function(window, sx, $, _)
{
    sx.createNamespace('classes', sx);

    /**
    * @type {void|Function|*}
    */
    sx.classes.Window = sx.classes.Component.extend({


        construct: function (src, name, opts)
        {
            opts = opts || {};
            this._name    = name ? name : "sx-new-window";
            this._src   = src;

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]); // TODO: make a workaround for magic parent calling
        },

        _init: function()
        {
            this
                .defaultOpts({
                    "left"          : "50",
                    "top"           : "50",
                    "width"         : "90%",
                    "height"        : "70%",
                    "menubar"       : "0", //Если этот параметр установлен в yes, то в новом окне будет меню.
                    "location"      : "1", //Если этот параметр установлен в yes, то в новом окне будет адресная строка
                    "toolbar"       : "0", //Если этот параметр установлен в yes, то в новом окне будет навигация (кнопки назад, вперед и т.п.) и панель вкладок
                    "scrollbars"    : "1", //Если этот параметр установлен в yes, то новое окно при необходимости сможет показывать полосы прокрутки
                    "resizable"     : "1", //Если этот параметр установлен в yes, то пользователь сможет изменить размеры нового окна. Рекомендуется всегда устанавливать этот параметр.
                    "status"        : "1", //Если этот параметр установлен в yes, то в новом окне будет строка состояния
                    "directories"   : "1"  //Если этот параметр установлен в yes, то в новом окне будут закладки/избранное
                })
                .normalizeOptions()
            ;
        },

        /**
         *
         * @returns {sx.classes.Window}
         */
        normalizeOptions: function()
        {
            var windowWidth     = window.screen.width;
            var windowHeight    = window.screen.height;

            if (sx.helpers.String.strpos(this.get("width"), "%", 0))
            {
                var newWidth = (Number(sx.helpers.String.str_replace("%", "", this.get("width")))/100) * windowWidth;
                this.set("width", Number(newWidth).toFixed())
            }

            if (sx.helpers.String.strpos(this.get("height"), "%", 0))
            {
                var newHeight = (Number(sx.helpers.String.str_replace("%", "", this.get("height")))/100) * windowHeight;
                this.set("height", Number(newHeight).toFixed())
            }

            return this;
        },

        /**
         * @returns {Window}
         */
        open: function()
        {
            //строка параметров, собираем из массива
            var paramsSting = "";
            if (this.getOpts())
            {
                _.each(this.getOpts(), function(value, key)
                {
                    paramsSting = paramsSting + "," + key + "=" + value;
                });
            }

            return window.open(this._src, this._name, paramsSting);
        },

        /**
         * @returns {sx.classes.Window}
         */
        setCenterOptions: function()
        {
            var windowWidth     = window.screen.width;
            var windowHeight    = window.screen.height;

            var left = ((windowWidth - this.get("width"))/2);
            var top  = ((windowHeight - this.get("height"))/2);

            this
                .set("left", left)
                .set("top", top);

            return this;
        }


    });

})(window, sx, sx.$, sx._);