/*!
 * @date 09.09.14
 * @copyright skeeks.com
 * @author Semenov Alexander <semenov@skeeks.com>
 */
(function(sx, $, _)
{
    sx.createNamespace('classes',   sx);
    sx.createNamespace('users',     sx);

    sx.classes._User = sx.classes.Entity.extend({

        _init: function()
        {
            this.mergeDefaults({
                name:           "guest",
                user_role:      "Guest",
                privileges:     []
            })
        },


        /**
         * Пользователь гость или нет
         * @returns {boolean}
         */
        isGuest: function()
        {
            return true;
        },

        /**
         * Привилегии пользователя
         * @returns {*}
         */
        getPrivileges: function()
        {
            return this.get("privileges");
        },

        /**
         * Роль пользователя
         * @returns {*}
         */
        getRole: function()
        {
            return this.get("user_role");
        },

        /**
         * Логин пользователя
         * @returns {*}
         */
        getName: function()
        {
            return this.get("name");
        }
    });

    sx.classes.User = sx.classes._User.extend();


    /**
     * Текущий пользователь
     * @returns {*}
     */
    sx.onReady(function()
    {
        sx.users.Current = new sx.classes.User(sx.config.getUserData());
    });

})(Skeeks, Skeeks.$, Skeeks._);