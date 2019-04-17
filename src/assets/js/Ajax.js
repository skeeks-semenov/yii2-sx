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