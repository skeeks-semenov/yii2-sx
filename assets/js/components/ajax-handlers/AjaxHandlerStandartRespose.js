/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 04.04.2015
 */
(function(sx, $, _)
{
    /**
     * {
     *     'success'                            : function(e, response){},
     *     'error'                              : function(e, response){},
     *
     *     'responseSuccess'                    : function(e, response){},
     *     'allowResponseSuccessMessage'        : true,
     *
     *     'responseError'                      : function(e, response){},
     *     'allowResponseErrorMessage'          : true,
     *
     *     'allowResponseRedirect'              : true,
     *     'redirectDelay'                      : 100,
     *
     *
     *     'blocker'                            : new sx.classes.Blocker(),
     *     'enableBlocker'                      : true,
     *     'blockerSelector'                    : 'body',
     *
     *
     *     'ajaxExecuteSuccess'                 : function(e, response){},
     *     'ajaxExecuteSuccessMessage'          : 'Ошибка выполнения ajax запроса',
     *     'ajaxExecuteSuccessAllowMessage'     : false,
     *
     *     'ajaxExecuteError'                   : function(e, data){},
     *     'ajaxExecuteErrorMessage'            : 'Ошибка выполнения ajax запроса',
     *     'ajaxExecuteErrorAllowMessage'       : true,
     *
     * }
     * Хэндлер ajax, для показа уведомлений
     */
    sx.classes.AjaxHandlerStandartRespose = sx.classes.AjaxHandler.extend({

        _init: function()
        {
            var self = this;

            //Отключаем внутренний подсчет состояния ajax запроса
            this.getAjaxQuery()
                .onBeforeSend(function(e, data)
                {
                    if (self.get('enableBlocker', false))
                    {
                        self.getBlocker().block();
                    }
                })
                .onComplete(function(e, data)
                {
                    if (self.get('enableBlocker', false))
                    {
                        self.getBlocker().unblock();
                    }
                })
                .onError(function(e, data)
                {
                    //Ошибка выполнения ajax запроса.
                    self.trigger('ajaxExecuteError', data);
                    self.trigger('error', data);

                    //Разрешено ли показывать стандартное сообщение об ошибке, когда ajax запрос не выполнен
                    if ( self.get('ajaxExecuteErrorAllowMessage', true) )
                    {
                        sx.notify.error(self.get('ajaxExecuteErrorMessage', 'Ошибка выполнения ajax запроса'));
                    }
                })
                .onSuccess(function(e, data)
                {
                    var response = data.response;
                    self.trigger('ajaxExecuteSuccess', response);

                    //Разрешено ли показывать стандартное сообщение об ошибке, когда ajax запрос успешно выполнен
                    if ( self.get('ajaxExecuteSuccessAllowMessage', false) )
                    {
                        sx.notify.success(self.get('ajaxExecuteSuccessMessage', 'Ajax запрос успешно выполнен'));
                    }

                    //Генерация событий на основании данных ответа
                    if (response.success)
                    {
                        self.trigger('responseSuccess', response);
                        self.trigger('success', response);

                        //с бэкенда пришло сообщение, можжно ли его показать?
                        if (response.message && self.get('allowResponseSuccessMessage', true))
                        {
                            sx.notify.success(response.message);
                        }

                    } else
                    {
                        self.trigger('responseError', response);
                        self.trigger('error', response);

                        if (response.message && self.get('allowResponseErrorMessage', true))
                        {
                            sx.notify.error(response.message);
                        }
                    }

                    if (response.redirect)
                    {
                        self.redirect(response.redirect);
                    }

                })
            ;
        },

        /**
         * @returns {sx.classes.Blocker}
         */
        getBlocker: function()
        {
            if (this.get('blocker'))
            {
                if (this.get('blocker') instanceof sx.classes._Blocker)
                {
                    return this.get('blocker');
                }
            }

            var blocker = new sx.classes.Blocker(this.get('blockerSelector', 'body'));
            this.set('blocker', blocker);
            return blocker;
        },

        /**
         * @param redirect
         * @returns {sx.classes.AjaxHandlerStandartRespose}
         */
        redirect: function(redirect)
        {
            if (this.get('allowResponseRedirect', true))
            {
                _.delay(function()
                {
                    window.location.href = redirect;

                }, this.get('redirectDelay', 100))
            }

            return this;
        }
    });

})(sx, sx.$, sx._);