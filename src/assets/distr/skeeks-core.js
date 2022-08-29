/**
  * @link https://cms.skeeks.com/
  * @copyright Copyright (c) 2010 SkeekS
  * @license https://cms.skeeks.com/license/
  * @author Semenov Alexander <semenov@skeeks.com>
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

    sx.version = "1.5.3";

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
        sx.Config.mergeDefaults(data);
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

(function(sx, _)
{
    // classes holder
    sx.classes = {};

    // base class
    sx.classes.Base = function Base() {};
    sx.classes.Base.prototype.construct = function(){};

    sx.classes.Base.prototype.applyParentMethod = function(cls, method, args)
    {
        cls.prototype[method].apply(this, args || []);
    };

    /**
     * The core of inheritance
     *
     * @param  {Object} props
     * @return {Function}
     */
    sx.classes.Base.extend = function(props)
    {
        // start exteding
        sx.__isExtending = true;

        // temporary child
        var tmp = function tmp () {};
        tmp.prototype = new this();

        // inherit
        var F = function()
        {
            if (!sx.__isExtending)
            {
                // copy non-function properties
                for (var k in props)
                {
                    if(props.hasOwnProperty(k))
                    {
                        var prop = props[k];

                        if (!_.isFunction(prop))
                        {
                            F.prototype[k] = _.clone(prop);
                        }
                    }
                }

                // call construct method
                this.construct.apply(this, arguments);
            }
        };
        F.prototype = new tmp();

        // extend prototype with new methods
        for (var k in props)
        {
            if(props.hasOwnProperty(k))
            {
                var prop = props[k];

                if (_.isFunction(prop))
                {
                    F.prototype[k] = prop;
                }
            }
        }

        // re-link the constructor
        F.prototype.constructor = F;

        // this parent
        F.prototype.parentClass = this.prototype;

        // copy the extending method
        F.extend = this.extend;

        // ref to parent
        F.prototype.parent = this.prototype;

        // end
        sx.__isExtending = false;

        return F;
    };
})(Skeeks, Skeeks._);

(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    sx.classes._Entity = sx.classes.Base.extend({

        construct: function (opts)
        {
            this._opts = opts || {};
            this._coreInit();
        },

        _coreInit:      function()
        {
            this._validate();
            this._init();
        },

        _validate:      function()
        {},

        _init:          function()
        {},

        /**
         * Получить опции
         * @returns {*}
         */
        toArray: function()
        {
            return this._opts;
        },

        /**
         * Смержить опции
         * Новые опции перекрывают старые
         * @param data
         * @returns {sx.classes._Entity}
         */
        merge: function(data)
        {
            data = data || {};
            this._opts = _.extend(this._opts, data);
            return this;
        },

        /**
         *
         * Смержить опции
         * Новые опции перекрываются старыми, если старые есть
         *
         * @param data
         * @returns {sx.classes._Entity}
         */
        mergeDefaults: function(data)
        {
            data = data || {};
            var options =  this._opts || {};
            this._opts = _.extend(data, options);
            return this;
        },

        /**
         * Есть ли опция?
         * @param name
         * @returns {boolean}
         */
        exist: function(name)
        {
            return (typeof this._opts[name] == "undefined") ? false : true;
        },

        /**
         * TODO: better use method exist();
         * @param name
         * @returns {boolean}
         */
        isset: function(name)
        {
            return this.exist(name);
        },

        /**
         * Сбросить все опции
         */
        clear: function()
        {
            this._opts = {};
        },

        /**
         * @param name
         * @param defaultValue
         * @returns {*}
         */
        get: function(name, defaultValue)
        {
            return this.exist(name) ? this._opts[name] : defaultValue;
        },


        /**
         *
         * Установка значения опции
         *
         * @param name
         * @param value
         * @returns {sx.classes._Entity}
         */
        set: function(name, value)
        {
            this._opts[name] = value;
            return this;
        },


            /**
             * Устаревшие методы, их желательно не использовать.
             */

        /**
         * TODO: use method exist()
         * @param name
         * @returns {boolean}
         */
        hasOpt: function(name)
        {
            return this.exist(name);
        },

        /**
         * TODO: use method get()
         * @param name
         * @param defaultValue
         * @returns {*}
         */
        getOpt: function(name, defaultValue)
        {
            return this.get(name, defaultValue);
        },

        /**
         * TODO: use method set()
         * @param name
         * @param value
         * @returns {sx.classes._Entity}
         */
        setOpt: function(name, value)
        {
            return this.set(name, value);
        },

        /**
         * @param options
         * @returns {sx.classes._Entity}
         */
        setOpts: function(options)
        {
            this._opts = options;
            return this;
        },

        /**
         * TODO: use method toArray()
         * @returns {*}
         */
        getOpts: function()
        {
            return this.toArray();
        },

        /**
         * TODO: use method merge()
         * @param data
         * @returns {sx.classes._Entity}
         */
        mergeOpts: function(data)
        {
            return this.merge(data);
        },

        /**
         * TODO: use method mergeDefaults()
         * @param data
         * @returns {sx.classes._Entity}
         */
        defaultOpts: function(data)
        {
            return this.mergeDefaults(data);
        },

        /**
         * @param name
         * @returns {sx.classes._Entity}
         */
        deleteOpt: function(name)
        {
            delete this._opts[name];
            return this;
        }
    });

    sx.classes.Entity = sx.classes._Entity.extend({});

})(sx, sx.$, sx._);
(function (sx, $, _) {

    sx.createNamespace("classes", sx);

    /**
     * @type {*|Function|void}
     * @private
     */
    sx.classes.EventManager = sx.classes.Base.extend({

        /**
         *
         */
        _hooks: {},

        /**
         * @param opts
         */
        construct: function (opts) {
            this._opts = opts || {};
            this._$ = $('<div/>');
        },

        /**
         * @param event
         * @param data
         * @returns {sx.classes.EventManager}
         */
        trigger: function (event, data) {
            if (this._hooks[event] && this._hooks[event].length) {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i) {
                    var hook = this._hooks[event][i];

                    if (_.isFunction(hook)) {
                        // Update event data
                        var result = hook(data);

                        // Don't trigger event
                        if (result === false) {
                            return this;
                        }

                        // Trigger with new data
                        data = result || data;
                    }
                }
            }

            this._$.trigger.apply(this._$, [event, data]);

            return this;
        },

        /**
         * @param event
         * @param callback
         * @returns {sx.classes.EventManager}
         */
        on: function (event, callback) {
            this._$.on(event, callback);
            return this;
        },

        /**
         * @param event
         * @param callback
         */
        off: function (event, callback) {
            this._$.off(event, callback);
        },

        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {*}
         */
        bind: function (event, callback) {
            return this.on(event, callback);
        },

        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {*|void}
         */
        unbind: function (event, callback) {
            return this.off(event, callback);
        },

        /**
         *
         * @param event
         * @param hookFunction
         * @returns {sx.classes.EventManager}
         */
        hook: function (event, hookFunction) {
            if (!this._hooks[event]) {
                this._hooks[event] = [];
            }

            this._hooks[event].push(hookFunction);

            return this;
        },

        /**
         *
         * @param event
         * @param hookFunction
         * @returns {sx.classes.EventManager}
         */
        unhook: function (event, hookFunction) {
            if (this._hooks[event] && this._hooks[event].length) {
                for (var i = 0, l = this._hooks[event].length; i < l; ++i) {
                    var hook = this._hooks[event][i];

                    if (hookFunction == hook) {
                        this._hooks[event][i] = null;
                    }
                }

                // TODO: clear nulled functions
            }

            return this;
        },

        /**
         *
         * @returns {sx.classes.EventManager._hooks|{}}
         */
        hooks: function () {
            return this._hooks;
        }
    });

    sx.EventManager = new sx.classes.EventManager();


})(Skeeks, Skeeks.$, Skeeks._);
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
    sx.Config = new sx.classes.Config();

})(Skeeks, Skeeks.$, Skeeks._);
(function(sx, $, _, window)
{
    sx.createNamespace('classes', sx);
    sx.createNamespace('classes._core', sx);

    sx.classes._Component = sx.classes.Entity.extend({

        _coreInit:         function()
        {
            var self = this;

            this._eventManager  = null;

            this._validate();
            this._init();

            sx.registerComponent(this);

            this._windowReadyTrigger    = 0;
            this._domReadyTrigger       = 0;

            this.onDomReady(function()
            {
                self._onDomReady();
            });

            this.onWindowReady(function()
            {
                self._onWindowReady();
            });


            $(_.bind(this._domReady, this));

            if (document.readyState == 'complete')
            {
                self._windowReady();
            } else
            {
                $(window).on("load", function() {
                    self._windowReady();
                });
            }
        },

        _init:         function()
        {},

        _onDomReady:   function()
        {},

        _onWindowReady:   function()
        {},

        _domReady: function()
        {
            this._domReadyTrigger = 1;
            this.trigger("onDomReady", this);
        },

        /**
         * @param callback
         * @returns {*}
         */
        onDomReady: function(callback)
        {
            if (this._domReadyTrigger == 1)
            {
                callback(this);
            } else
            {
                this.bind("onDomReady", callback);
            }
            return this;
        },

        _windowReady: function()
        {
            this._windowReadyTrigger = 1;
            this.trigger("onWindowReady", this);
        },

        /**
         * @param callback
         * @returns {*}
         */
        onWindowReady: function(callback)
        {
            if (this._windowReadyTrigger == 1)
            {
                callback(this);
            } else
            {
                this.bind("onWindowReady", callback);
            }

            return this;
        },



        /**
         * Свой внутренние eventmanager
         * @returns {Skeeks.classes.EventManager}
         */
        getEventManager: function()
        {
            if (this._eventManager === null)
            {
                this._eventManager = new sx.classes.EventManager();
            }

            return this._eventManager;
        },


        /**
         * @param event
         * @param callback
         * @returns {sx.classes._Component}
         */
        on: function(event, callback)
        {
            this.getEventManager().on(event, callback);
            return this;
        },


        /**
         * @param event
         * @param callback
         * @returns {sx.classes._Component}
         */
        off: function(event, callback)
        {
            this.getEventManager().off(event, callback);
            return this;
        },


        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {*}
         */
        bind: function(event, callback)
        {
            return this.on(event, callback);
        },

        /**
         * @deprecated
         * @param event
         * @param callback
         * @returns {sx.classes._Component}
         */
        unbind: function(event, callback)
        {
            return this.off(event, callback);
        },

        /**
         * @param event
         * @param data
         * @returns {sx.classes._Component}
         */
        trigger: function(event, data)
        {
            this.getEventManager().trigger(event, data);
            return this;
        },

        /**
         * @param event
         * @param hookFunction
         * @returns {sx.classes._Component}
         */
        hook: function(event, hookFunction)
        {
            this.getEventManager().hook(event, hookFunction);
            return this;
        },

        /**
         * @param event
         * @param hookFunction
         * @returns {sx.classes._Component}
         */
        unhook: function(event, hookFunction)
        {
            this.getEventManager().unhook(event, hookFunction);
            return this;
        },

        /**
         * @returns {*}
         */
        hooks: function()
        {
            return this.getEventManager().hooks();
        },

    });

    sx.classes.Component = sx.classes._Component.extend({});


    // components holder
    sx.components = [];

    // register function
    sx.registerComponent = function(component)
    {
        if (!(component instanceof sx.classes._Component))
        {
            throw new Error("Instance of sx.classes.Component was expected.");
        }

        sx.components.push(component);
        return component;
    };

})(sx, sx.$, sx._, window);
(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    /**
     * TODO: доправить позже!
     * Базовый класс для работы с cookies
     * @type {*|Function|void}
     * @private
     */
    sx.classes._Cookie = sx.classes.Component.extend({

        construct: function(namespace, opts)
        {
            this._namespace = namespace || "";
            this.applyParentMethod(sx.classes.Component, 'construct', [opts]);
        },

        _init: function()
        {
            if (this.exist('globalNamespace')) {
                this._globalNamespace = this.get('globalNamespace');
                this.deleteOpt('globalNamespace');
            } else if (sx.Config.get("cookie").namespace) {
                this._globalNamespace = sx.Config.get("cookie").namespace;
            } else {
                this._globalNamespace = '';
            }
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
            path: "/",
            expires: 365
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
(function(sx, $, _)
{
    sx.createNamespace('classes', sx);
    /**
     *
     * Класс который подписывается на события ajax запроса.
     * Его можно наследовать и переписывать для каждого проекта
     *
     * Фишка в том, что он кидает события ошибки, даже в том случае если ajax запрос отработал корректно.
     * Но backend json объект содержит данные об ошибках приложения.
     *
     * @type {*|Function|void}
     * @private
     */
    sx.classes._AjaxHandler = sx.classes.Component.extend({
        /**
         * Установка необходимых данных
         * @param text
         * @param opts
         */
        construct: function(ajaxQuery, opts)
        {
            if (!(ajaxQuery instanceof sx.classes._AjaxQuery))
            {
                throw new Error("invalid ajaxQuery class");
            }

            opts = opts || {};
            this._ajaxQuery = ajaxQuery;

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]);
        },

        _init: function()
        {},

        /**
         * @returns {sx.classes._AjaxQuery}
         */
        getAjaxQuery: function()
        {
            return this._ajaxQuery;
        }
    });
    /**
     * @type {*|Function|void}
     */
    sx.classes.AjaxHandler = sx.classes._AjaxHandler.extend({});

    /**
     * allowCountExecuting
     * Конструктор ajax запроса
     * @type {*}
     */
    sx.classes._AjaxQuery = sx.classes.Component.extend({
        /**
         * Адрес ajax запроса
         */
        _url: "",

        /**
         * Установка необходимых данных
         * @param url
         * @param opts
         */
        construct: function(url, opts)
        {
            this._url = url;
            this.applyParentMethod(sx.classes.Component, 'construct', [opts]); // TODO: make a workaround for magic parent calling

            /**
             * Регистрация запроса
             */
            sx.ajax.registerQuery(this);

            /**
             * Запрос сейчас в процессе счетчик?
             * @type {number}
             * @private
             */
            this._executing    = 0;
        },

        /**
         * Сделано для удобства, чтобы можно было передавать в конструктор все bind - ги
         * @private
         */
        _init: function()
        {
            var self = this;




            var completeCallback = this.get("complete");
            if (completeCallback !== null)
            {
                this.onComplete(completeCallback);
                this.set("complete", null)
            }

            var successCallback = this.get("success");
            if (successCallback !== null)
            {
                this.onSuccess(successCallback);
                this.set("success", null)
            }

            var errorCallback = this.get("error");
            if (errorCallback !== null)
            {
                this.onError(errorCallback);
                this.set("error", null)
            }


            this.onComplete(function()
            {
                /**
                 * Запрос выполнился
                 * @type {number|*|Number}
                 * @private
                 */
                self._executing    = Number(self._executing - 1);
                if (self._executing < 0)
                {
                    self._executing = 0;
                }
            });





            var done = this.get("done");
            if (done !== null)
            {
                this.done(done);
            }
            var fail = this.get("fail");
            if (fail !== null)
            {
                this.fail(fail);
            }
            var always = this.get("always");
            if (always !== null)
            {
                this.always(always);
            }


            this._additional = null;
        },

        /**
         * Выполнить запрос
         * @returns {*}
         */
        execute: function()
        {
            var self = this;

            if (this.get('allowCountExecuting', true) === true)
            {
                self._executing = Number(self._executing + 1);
            }

            var settings = this.getOpts();

            this.trigger('beforeExecute');

            return $.ajax(this.getUrl(), settings)
                .done(function (e) {
                    self.trigger("done", e);
                    self.trigger("success", {
                        'ajax': self,
                        "response": e,
                    });

                })
                .fail(function(jqXHR, textStatus, errorThrown) {

                    var data = {
                        'sender': self,
                        "errorThrown": errorThrown,
                        "textStatus": textStatus,
                        "jqXHR": jqXHR
                    };

                    self.trigger("fail", data);
                    self.trigger("error", data);

                })
                .always(function(e) {
                    self.trigger("complete", e);
                    self.trigger("always", e);
                })
            ;
        },

        /**
         * Запрос сейчас находиться в процессе выполнения?
         * @returns {boolean|*|Boolean}
         */
        isExecuting: function()
        {
            return Boolean(this._executing);
        },
        /**
         *
         * @returns {string}
         */
        getUrl: function()
        {
            return this._url;
        },

        /**
         * @param url
         * @returns {*}
         */
        setUrl: function(url)
        {
            this._url = url
            return this
        },


        setData: function(data)
        {
            this.set("data", data);
            return this
        },

        getData: function(data)
        {
            return this.get("data", {});
        },

        /**
         * @param data
         * @returns {sx.classes._AjaxQuery}
         */
        mergeData: function(data)
        {
            data = data || {};
            var newData = _.extend(this.getData(), data);
            this.setData(newData);
            return this;
        },


        /**
         * @returns {string}
         */
        getType: function()
        {
            return String(this.get("type"));
        },

        /**
         * @param type
         * @returns {sx.classes._AjaxQuery}
         */
        setType: function(type)
        {
            this.set("type", String(type));
            return this;
        },






            /**
             * Основные объекты запроса
             */

        /**
         *
         * @returns {sx.helpers.classes.Options}
         */
        getSettings: function()
        {
            return this._opts;
        },


        getAdditional: function()
        {
            return this._additional;
        },

        /**
         * @param value
         * @returns {sx.classes._AjaxQuery}
         */
        setAdditional: function(value)
        {
            this._additional = value;
            return this;
        },

            /**
             * Далее сделано для удобства построения on - ов
             */



        /**
         * @deprecated
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        onSuccess: function(callback)
        {
            this.on("success", callback);
            return this;
        },

        /**
         * @deprecated
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        onError: function(callback)
        {
            this.on("error", callback);
            return this;
        },

        /**
         * @deprecated
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        onComplete: function(callback)
        {
            this.on("complete", callback);
            return this;
        },

        /**
         * @deprecated
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        onBeforeSend: function(callback)
        {
            this.on("beforeExecute", callback);
            return this;
        },


        /**
         * Обновленные функции
         */

        /**
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        done: function(callback) {
            this.on("done", callback);
            return this;
        },

        /**
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        fail: function(callback) {
            this.on("fail", callback);
            return this;
        },

        /**
         * @param callback
         * @returns {sx.classes._AjaxQuery}
         */
        always: function(callback) {
            this.on("always", callback);
            return this;
        },



    });

    sx.classes.AjaxQuery = sx.classes._AjaxQuery.extend({});

    /**
     * @type {*}
     */
    sx.ajax =
    {
        /**
         * Global ajax events
         */
        ajaxStart:      "ajaxStart",    //This event is triggered if an Ajax request is started and no other Ajax requests are currently running.
        ajaxStop:       "ajaxStop",     //This global event is triggered if there are no more Ajax requests being processed.
        ajaxSend:       "ajaxSend",     //This global event is also triggered before the request is run.
        ajaxSuccess:    "ajaxSuccess",  //This event is also only called if the request was successful.
        ajaxError:      "ajaxError",    //This global event behaves the same as the local error event.
        ajaxComplete:   "ajaxComplete", //This event behaves the same as the complete event and will be triggered every time an Ajax request finishes.

        queries:[],

        // register function
        registerQuery: function(query)
        {
            if (!(query instanceof sx.classes._AjaxQuery))
            {
                throw new Error("Instance of sx.classes._AjaxQuery was expected.");
            }

            this.queries.push(query);
            return query;
        },

        /**
         * Есть запросы которые сейчас в процессе выполнения?
         * @returns {boolean|*|Boolean}
         */
        hasExecutingQueries: function()
        {
            return Boolean(_.size(this.getExecutingQueries()));
        },

        /**
         * Получить запросы которые сейчас в процессе выполнения
         * @returns {*}
         */
        getExecutingQueries: function()
        {
            return _.filter(this.queries, function(query)
            {
                return query.isExecuting();
            });
        },

        init: function()
        {
            $(_.bind(this._onDomReady, this));
        },

        /**
         * При инициализации приложения вешаемся на события jquery и добавляем свои события
         * @private
         */
        _onDomReady: function()
        {
            var self = this;

            $(document)
                .bind(self.ajaxStart, function(){
                    sx.EventManager.trigger(self.ajaxStart);
                })
                .bind(self.ajaxStop, function(){
                    sx.EventManager.trigger(self.ajaxStop);
                })
                .bind(self.ajaxSend, function(){
                    sx.EventManager.trigger(self.ajaxSend);
                })
                .bind(self.ajaxSuccess, function(){
                    sx.EventManager.trigger(self.ajaxSuccess);
                })
                .bind(self.ajaxError, function(){
                    sx.EventManager.trigger(self.ajaxError);
                })
                .bind(self.ajaxComplete, function(){
                    sx.EventManager.trigger(self.ajaxComplete);
                })
        },


        /**
         * Конструируем get запрос
         * @param url
         * @param data
         * @param settings
         * @returns {sx.classes.AjaxQuery}
         */
        prepareGetQuery: function(url, data, settings)
        {
            settings = settings || {};

            _.extend(settings, {
                type: 'GET',
                data: data,
                dataType: 'json'
            });

            return new sx.classes.AjaxQuery(url, settings);
        },

        /**
         * Конструкируем POST запрос
         * @param url
         * @param data
         * @param settings
         * @returns {sx.classes.AjaxQuery}
         */
        preparePostQuery: function(url, data, settings)
        {
            settings = settings || {};

            _.extend(settings, {
                type: 'POST',
                data: data,
                dataType: 'json'
            });

            return new sx.classes.AjaxQuery(url, settings);
        },

        /**
         *
         * @param url
         * @param data
         * @param settings
         * @returns {sx.classes.AjaxQuery}
         */
        prepareQuery: function(url, data, settings)
        {
            settings    = settings || {};
            data        = data || {};
            url         = url || "";

            _.extend(settings, {
                data: data,
                dataType: 'json'
            });

            return new sx.classes.AjaxQuery(url, settings);
        }
    };

    /**
     * Когда все будет готово нужно инициализировать ajax компонент
     */
    sx.onReady(function()
    {
        sx.ajax.init();
    });


})(Skeeks, Skeeks.$, Skeeks._);

