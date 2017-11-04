/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 05.10.2016
 */
(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    /**
     * @type {*|Function|void}
     * @private
     */
    sx.classes._Config = sx.classes.Entity.extend({

        _init: function()
        {
            this.mergeDefaults({
                env: "dev",             //Окружение приложения
                lang: "ru",             //Язык приложения
                loadedTime: null,       //Время загрузки страницы
                cookie:                 //Опции для Cookie
                {
                    namespace: "sx"
                },
            })
        },

        /**
         * Окружение dev ?
         * @returns {boolean}
         */
        isDev: function()
        {
            return (this.get("env") == "dev") ? true : false;
        },

        /**
         * Окружение product ?
         * @returns {boolean}
         */
        isProduct: function()
        {
            return (this.get("env") == "product") ? true : false;
        }
    });

    sx.classes.Config = sx.classes._Config.extend();

    /**
     * @type {Skeeks.classes.Config}
     */
    sx.config = new sx.classes.Config();

})(Skeeks, Skeeks.$, Skeeks._);