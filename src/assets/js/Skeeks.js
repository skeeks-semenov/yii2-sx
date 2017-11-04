/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 04.04.2015
 */
(function(global, $, _)
{
    if (global.Skeeks || global.sx)
    {
        throw new Error("Skeeks or sx object is already defined in global namespace.");
    }

    //create Skeeks
    var sx = global.sx = global.Skeeks = {};

    //register Underscore
    sx._ = _;

    //register jQuery
    sx.$ = $;

    /**
     * Creating namespace using a spec
     *
     * @param  {String} spec
     * @param  {Object} where (Optional) By default we create namespaces within Tiks
     * @return {Object}
     */
    sx.createNamespace = function(spec, where)
    {
        where = where || sx;

        var path = spec.split('.');
        var ns = where;

        for (var i = 0, l = path.length; i < l; ++i) {
            var part = path[i];
            if (!ns[part]) {
                ns[part] = {};
            }

            ns = ns[part];
        }

        return ns;
    };

    sx.version = "1.3.0";

    /**
     * Библиотека готова или нет
     * @type {boolean}
     */
    sx._readyTrigger = false;

    /**
     * Вызывается один раз когда библиотека готова
     * @private
     */
    sx._ready = function()
    {
        sx._readyTrigger = true;
        //Библиотека sx готова
        sx.EventManager.trigger("ready");
    };

    /**
     *
     * @returns {boolean}
     */
    sx.isReady = function()
    {
        return sx._readyTrigger;
    };

    /**
     * Инициализация важных компонентов
     */
    sx.init = function(data)
    {
        //Мержим конфиги
        sx.config.merge(data);
        //Библиотека sx готова
        sx._ready();
    };

    /**
     * когда готова sx
     * @param callback
     * @returns {*}
     */
    sx.onReady = function(callback)
    {
        if (sx.isReady())
        {
            callback();
        } else
        {
            sx.EventManager.bind("ready", callback);
        }

        return this;
    };

})(window, jQuery, _);