/*
 * @author Semenov Alexander <semenov@skeeks.com>
*/
(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    /**
     * Базовый класс для работы с cookies
     * @type {*|Function|void}
     * @private
     */
    sx.classes._Cookie = sx.classes.Base.extend({

        _globalNamespace: sx.config.get("cookie").namespace,
        _namespace: "",
        _opts: "",

        construct: function(namespace, opts)
        {
            this._namespace = namespace || "";
            this._opts = opts || {};
        },

        set: function(name, value, options)
        {
            sx.cookie.set(this._cookieName(name), value, options);
            return this;
        },

        get: function(name)
        {
            return sx.cookie.get(this._cookieName(name));
        },

        getAll: function()
        {
            var result = {};
            var all = sx.cookie.getAll();
            var prefix = this.getPrefix();

            if (all)
            {
                _.each(all, function(value, name)
                {
                    if (name.substring(0, prefix.length) == prefix)
                    {
                        var newName = name.substring(prefix.length);
                        result[newName] = value;
                    }
                });
            }

            return result;
        },


        /**
         * Установка глобального namespace
         * @param name
         * @returns {*}
         */
        setNamespace: function(name)
        {
            this._namespace = name;
            return this;
        },

        /**
         * Название неймспейса
         * @returns {string}
         */
        getNamspace: function()
        {
            return this._namespace;
        },

        /**
         * Глобальный префикс
         * @returns {string}
         */
        getGlobalNamspace: function()
        {
            return this._globalNamespace;
        },

        /**
         *
         * @returns {string}
         */
        getFullNamespace: function()
        {
            return this.getGlobalNamspace() + "__" + this.getNamspace();
        },

        getPrefix: function()
        {
            return this.getFullNamespace() + "__";
        },

        _cookieName: function(name)
        {
            return this.getPrefix() + name;
        }
    });

    /**
     * Можно переопределить
     * @type {*|Function|void}
     */
    sx.classes.Cookie = sx.classes._Cookie.extend({});


    /**
     * Работа с куками
     * @type {Object}
     */
    sx.cookie = {

        _defaultOptions:
        {
            path: "/"
        },

        /**
         * Установка
         *
         * @param name
         * @param value
         * @param options
         */
        set: function(name, value, options)
        {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            options = _.extend(this._defaultOptions, options);
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        },
        /**
         * Получение
         * @param name
         * @return {null}
         */
        get: function(name)
        {
            var cookieValue = null;
            if (document.cookie && document.cookie != '')
            {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++)
                {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '='))
                    {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                        //TODO:: Небольшой хардкод
                        if (cookieValue === "true")
                        {
                            cookieValue = true;
                        } else if (cookieValue === "false")
                        {
                            cookieValue = false;
                        }
                        break;
                    }
                }
            }
            return cookieValue;
        },


        /**
         * TODO:: Возможны баги пишу тороплюсь )
         * @returns {*}
         */
        getAll: function()
        {
            var result = {};
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    var strpos = sx.helpers.String.strpos(cookie, "=", 0);

                    if (strpos)
                    {
                        var cookieValue = decodeURIComponent(cookie.substring(strpos + 1));
                        var cookieName = decodeURIComponent(cookie.substring(0, strpos));

                        //TODO:: Небольшой хардкод
                        if (cookieValue === "true")
                        {
                            cookieValue = true;
                        } else if (cookieValue === "false")
                        {
                            cookieValue = false;
                        }

                        result[cookieName] = cookieValue;
                    }

                }
            }

            return result;
        }
    };

})(sx, sx.$, sx._);