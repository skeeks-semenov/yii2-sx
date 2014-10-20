(function(sx, $, _)
{
    sx.createNamespace('classes.form', sx);

    sx.classes.form._Ajax = sx.classes.Component.extend({

        /**
         * Установка необходимых данных
         * @param form
         * @param opts
         */
        construct: function(form, opts)
        {
            opts = opts || {};

            if (typeof form == "string")
            {
                opts.name = form;
            } else if (typeof form == "object")
            {
                opts = form;
            } else if (form instanceof jQuery)
            {
                opts["$form"] = form;
            } else
            {
                throw new Error("Неправильно сконструирован объект формы. form должен быть (String|Object|jQuery)");
            }

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]);
        },

        _init: function()
        {
            this._ajax = sx.ajax.prepareQuery("");
            this._ajax.setAdditional({
                "form": this
            });
        },

        _onDomReady: function()
        {
            var self = this;

            if (this.get("name"))
            {
                this._$form = $("form[name='" + this.get("name") + "']");
                this._name  = this.get("name");
            } else if (this.get("$form"))
            {
                this._$form = this.get("$form");
                this._name = this._$form.attr("name");
            }

            if (this._$form.attr("method"))
            {
                this.getAjax().setType(this._$form.attr("method"));
            }

            if (this._$form.attr("action"))
            {
                this.getAjax().setUrl(this._$form.attr("action"));
            }

            this.$form().on("submit", function()
            {
                if (self.get("submit"))
                {
                    var callback = self.get("submit");

                    //Если callback функция вернет false, то ajax запрос не начнется.
                    if (callback(self) !== false)
                    {
                        self._executeAjaxQuery();
                    }
                } else
                {
                    self._executeAjaxQuery();
                }

                return false;
            });

        },

        _executeAjaxQuery: function()
        {
            this.getAjax().setData(this.$form().serializeArray()).execute();
        },

        /**
         * @param callback
         * @returns {sx.classes.form._Ajax}
         */
        onSubmit: function(callback)
        {
            this.set("submit", callback);
            return this;
        },


        /**
         * @returns {*|HTMLElement}
         */
        $form: function()
        {
            return $("form[name='" + this.get("name") + "']");
        },

        /**
         * @returns {sx.classes._AjaxQuery}
         */
        getAjax: function()
        {
            return this._ajax;
        },

        /**
         * @returns {string}
         */
        getName: function()
        {
            return String(this.get("name"));
        }
    });

    sx.classes.form.Ajax = sx.classes.form._Ajax.extend({});

})(sx, sx.$, sx._);