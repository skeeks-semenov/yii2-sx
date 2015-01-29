/*!
 *
 * Базовый абстрактный класс
 * Только каркас
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 28.01.2015
 * @since 1.0.0
 */
(function(sx, $, _)
{
    sx.createNamespace('classes.notify',       sx);

    sx.classes.notify._Notify = sx.classes.Component.extend({

        /**
         * Установка необходимых данных
         * @param text
         * @param opts
         */
        construct: function(text, opts)
        {
            opts = opts || {};
            opts.text = text;

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]);
        },

        _init: function()
        {
            this.defaultOpts({
                "autoShow" : true
            });

            if (this.isAutoShow())
            {
                this.show();
            }
        },

        /**
         * @returns {sx.classes._Notify}
         */
        show: function()
        {
            this.trigger('beforeShow');
            this._show();

            return this;
        },

        close: function()
        {
            this.trigger('beforeClose');
            this._close();
        },

        /**
         * @returns {sx.classes._Notify}
         * @private
         */
        _show: function()
        {
            this.trigger('afterShow');
            throw new Error('this is abstract class');
            return this;
        },

        /**
         * @returns {sx.classes._Notify}
         * @private
         */
        _close: function()
        {
            this.trigger('afterClose');
            throw new Error('this is abstract class');
            return this;
        },

        /**
         * @returns {boolean}
         */
        isAutoShow: function()
        {
            return Boolean(this.get("autoShow"));
        }
    });

    sx.classes.notify.Defaul    = sx.classes.notify._Notify.extend({});

    sx.classes.notify.Notice    = sx.classes.notify.Defaul.extend({});
    sx.classes.notify.Success   = sx.classes.notify.Defaul.extend({});
    sx.classes.notify.Warning   = sx.classes.notify.Defaul.extend({});
    sx.classes.notify.Error     = sx.classes.notify.Defaul.extend({});
    sx.classes.notify.Fail      = sx.classes.notify.Defaul.extend({});
    sx.classes.notify.Info      = sx.classes.notify.Defaul.extend({});

    /**
     * @type {{defaul: Function, notice: Function, success: Function, warning: Function, error: Function, fail: Function, info: Function}}
     */
    sx.notify =
    {
        /**
         * @param text
         * @param options
         * @returns {sx.classes.notify.Defaul}
         */
        defaul: function(text, options)
        {
            return new sx.classes.notify.Defaul(text, options);
        },

        /**
         * @param text
         * @param options
         * @returns {sx.classes.notify.Notice}
         */
        notice: function(text, options)
        {
            return new sx.classes.notify.Notice(text, options);
        },

        /**
         * @param text
         * @param options
         * @returns {sx.classes.notify.Success}
         */
        success: function(text, options)
        {
            return new sx.classes.notify.Success(text, options);
        },

        /**
         * @param text
         * @param options
         * @returns {sx.classes.notify.Warning}
         */
        warning: function(text, options)
        {
            return new sx.classes.notify.Warning(text, options);
        },

        /**
         * @param text
         * @param options
         * @returns {jQuery.Error}
         */
        error: function(text, options)
        {
            return new sx.classes.notify.Error(text, options);
        },

        /**
         * @param text
         * @param options
         * @returns {sx.classes.notify.Fail}
         */
        fail: function(text, options)
        {
            return new sx.classes.notify.Fail(text, options);
        },

        /**
         * @param text
         * @param options
         * @returns {sx.classes.notify.Info}
         */
        info: function(text, options)
        {
            return new sx.classes.notify.Info(text, options);
        },
    };


    /**
     * Хэндлер ajax, для показа уведомлений
     */
    sx.classes.AjaxHandlerNotify = sx.classes.AjaxHandler.extend({

        _init: function()
        {
            var self = this;

            var allow = this.get('allow', ['error', 'success']);

            //Отключаем внутренний подсчет состояния ajax запроса
            this.getAjaxQuery()
                .onError(function(e, data)
                {
                    if ( _.indexOf(allow, 'error') >= 0 )
                    {
                        sx.notify.error(self.get('error', 'Во время ajax запроса произошла ошибка'));
                    }
                })
                .onSuccess(function(e, data)
                {
                    if ( _.indexOf(allow, 'success') >= 0 )
                    {
                        sx.notify.success(self.get('success', 'Запрос вполнен успешно'));
                    }
                })
            ;
        }
    });

    sx.classes.AjaxHandlerNotifyErrors = sx.classes.AjaxHandler.extend({
        _init: function()
        {
            this.set('allow', ['error']);
            this.applyParentMethod(sx.classes.AjaxHandler, '_init');
        }
    });

})(sx, sx.$, sx._);