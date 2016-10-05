/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 05.10.2016
 */
(function(global, sx, $, _)
{
    /**
     * Своя консоль
     * Изменения в глобальной консоле
     * Все это дело не работает в окружении product
     * @type {{init: Function}}
     */
    sx.console = global.console;

    sx.console.init = function()
    {
        //для продукта
        if (sx.config.isProduct())
        {
            var methods = ['assert', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'trace', 'warn'];
            for (var i = methods.length; i--;)
            {
                (function (methodName) {
                     global.console[methodName] = function ()
                     {

                     };
                })(methods[i]);
            }
        }

        sx.console      = global.console;
    };


    sx.onReady(function()
    {
        //Инициализация консоль
        sx.console.init();
    })

})(window, Skeeks, Skeeks.$, Skeeks._);

