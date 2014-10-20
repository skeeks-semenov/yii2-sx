/*
 * @author Semenov Alexander <semenov@skeeks.com>
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
    sx.classes._AjaxGenericHandler = sx.classes.Component.extend({

        _init: function()
        {
            var self = this;
            this._ajaxQuery = this.get("ajaxQuery");

            if (!this._ajaxQuery instanceof sx.classes._AjaxQuery)
            {
                throw new Error("invalid ajaxQuery class");
            }

            this._inited();
        },

        /**
         * @returns {sx.classes._AjaxQuery}
         */
        getAjax: function()
        {
            return this._ajaxQuery;
        },

        _inited: function()
        {}
    });
    /**
     * @type {*|Function|void}
     */
    sx.classes.AjaxGenericHandler = sx.classes._AjaxGenericHandler.extend({});





    /**
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
        },

        /**
         * Сделано для удобства, чтобы можно было передавать в конструктор все bind - ги
         * @private
         */
        _init: function()
        {
            var ajaxStartCallback = this.get("ajaxStart");
            if (ajaxStartCallback !== null)
            {
                this.onAjaxStart(ajaxStartCallback);
                this.set("ajaxStart", null)
            }


            var ajaxStopCallback = this.get("ajaxStop");
            if (ajaxStopCallback !== null)
            {
                this.onAjaxStop(ajaxStopCallback);
                this.set("ajaxStop", null)
            }


            var ajaxCompleteCallback = this.get("ajaxComplete");
            if (ajaxCompleteCallback !== null)
            {
                this.onAjaxComplete(ajaxCompleteCallback);
                this.set("ajaxComplete", null)
            }




            var beforeSendCallback = this.get("beforeSend");
            if (beforeSendCallback !== null)
            {
                this.onBeforeSend(beforeSendCallback);
                this.set("beforeSend", null)
            }

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


            this._additional = null;
        },

        /**
         * Выполнить запрос
         *
         * @returns {*}
         */
        execute: function()
        {
            var self = this;
            var settings = this.getOpts();

            _.extend(settings, {

                ajaxStart: function()
                {
                    self.trigger("ajaxStart", {
                        ajax: self
                    });
                },

                ajaxStop: function()
                {
                    self.trigger("ajaxStop", {
                        ajax: self
                    });
                },

                ajaxComplete: function()
                {
                    self.trigger("ajaxComplete", {
                        ajax: self
                    });
                },



                beforeSend: function()
                {
                    self.trigger("beforeSend", {
                        ajax: self
                    });
                },

                complete: function(jqXHR, textStatus, errorThrown) {
                    self.trigger("complete", {
                        "ajax": self,
                        "jqXHR": jqXHR,
                        "textStatus": textStatus,
                        "errorThrown": errorThrown
                    });
                },

                success: function(response, textStatus, jqXHR) {
                    self.trigger("success", {
                        ajax: self,
                        "response": response,
                        "textStatus": textStatus,
                        "jqXHR": jqXHR
                    });
                },

                error: function(jqXHR, textStatus, errorThrown) {
                    self.trigger("error", {
                        ajax: self,
                        "errorThrown": errorThrown,
                        "textStatus": textStatus,
                        "jqXHR": jqXHR
                    });
                }

            });

            return $.ajax(this.getUrl(), settings);
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
            this.get("data", {});
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
             * Далее сделано для удобства построения bind - ов
             */

        onAjaxStart: function(callback)
        {
            this.bind("ajaxStart", callback);
            return this;
        },

        onAjaxStop: function(callback)
        {
            this.bind("ajaxStop", callback);
            return this;
        },

        onAjaxComplete: function(callback)
        {
            this.bind("ajaxComplete", callback);
            return this;
        },



        onSuccess: function(callback)
        {
            this.bind("success", callback);
            return this;
        },

        onError: function(callback)
        {
            this.getEventManager().bind("error", callback);
            return this;
        },

        onComplete: function(callback)
        {
            this.getEventManager().bind("complete", callback);
            return this;
        },

        onBeforeSend: function(callback)
        {
            this.getEventManager().bind("beforeSend", callback);
            return this;
        }
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