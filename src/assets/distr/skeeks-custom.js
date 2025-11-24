(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    /**
    * @deprecated
    * @type {void|Function|*}
    */
    sx.classes.Widget = sx.classes.Component.extend({

        construct: function (wrapper, opts)
        {
            var self = this;
            opts = opts || {};
            this._wrapper = wrapper;
            //this.parent.construct(opts);
            this.applyParentMethod(sx.classes.Component, 'construct', [opts]); // TODO: make a workaround for magic parent calling
        },

        /**
         * @returns {*|HTMLElement}
         */
        getWrapper: function()
        {
            if (typeof this._wrapper == 'string')
            {
                this._wrapper = $(this._wrapper);
            }

            return this._wrapper;
        }
    });

})(sx, sx.$, sx._);


(function(global, sx, $, _)
{
    sx.createNamespace('helpers', sx);
    /**
     * @type {{getParams: Function}}
     */
    sx.helpers.Request =
    {
        getParams: function()
        {
            var $_GET = {};
            var __GET = window.location.search.substring(1).split("&");

            for(var i=0; i<__GET.length; i++)
            {
              var getVar = __GET[i].split("=");
              $_GET[getVar[0]] = typeof(getVar[1]) == "undefined" ? "" : getVar[1];
            }

            return $_GET;
        }
    };
    /**
     * Для работы с url
     * @type {{redirect: Function}}
     */

    sx.helpers.Url = {

        redirect : function(url)
        {
            location.href = url;
        }
    };

    /**
     * Просто вспомогательные функции для работы со строками
     * @type {{strpos: Function, str_replace: Function}}
     */
    sx.helpers.String = {

        /**
         * Аналог php
         * @param haystack
         * @param needle
         * @param offset | с какого символа начинать поиск
         * @returns {*}
         */
        strpos: function(haystack, needle, offset)
        {
            var i = haystack.toString().indexOf( needle, offset ); // returns -1
            return i >= 0 ? i : false;
        },

        /**
         * Аналог php функции
         *
         * @param search
         * @param replace
         * @param subject
         * @returns {*}
         */
        str_replace: function( search, replace, subject )
        {
            if(!(replace instanceof Array)){
                replace=new Array(replace);
                if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
                    while(search.length>replace.length){
                        replace[replace.length]=replace[0];
                    }
                }
            }

            if(!(search instanceof Array))search=new Array(search);
            while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
                replace[replace.length]='';
            }

            if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
                for(k in subject){
                    subject[k]=str_replace(search,replace,subject[k]);
                }
                return subject;
            }

            for(var k=0; k<search.length; k++){
                var i = subject.indexOf(search[k]);
                while(i>-1){
                    subject = subject.replace(search[k], replace[k]);
                    i = subject.indexOf(search[k],i);
                }
            }

            return subject;
        },

        /**
         *
         * analog php function substr
         *
         * @param f_string
         * @param f_start
         * @param f_length
         * @return {String}
         */
        substr : function(f_string, f_start, f_length)
        {

            if(f_start < 0) {
                f_start += f_string.length;
            }

            if(f_length == undefined) {
                f_length = f_string.length;
            } else if(f_length < 0){
                f_length += f_string.length;
            } else {
                f_length += f_start;
            }

            if(f_length < f_start) {
                f_length = f_start;
            }

            return f_string.substring(f_start, f_length);
        },

        /**
         * Генерация случайной строки.
         *
         * @param length
         * @returns {string}
         */
        randStr: function(length)
        {
            length = length || 6;
            var result       = '';
            var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;

            for( i = 0; i < length; ++i )
            {
                position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }

            return result;
        }
    };

    /**
     * Помощь для работы с массивами
     * @type {{in_array: Function, explode: Function, implode: Function}}
     */
    sx.helpers.Array = {

        /**
         * analog php function in_array
         *
         * @param value
         * @param array
         * @return {Boolean}
         */
        in_array : function(value, array)
        {
            for(var i = 0; i < array.length; i++)
            {
                if(array[i] == value) return true;
            }
            return false;
        },

        /**
         * Аналог php
         *
         * @param delimiter
         * @param string
         * @return {*}
         */
        explode: function(delimiter, string)
        {
            var emptyArray = { 0: '' };

            if ( arguments.length != 2
                || typeof arguments[0] == 'undefined'
                || typeof arguments[1] == 'undefined' )
            {
                return null;
            }

            if ( delimiter === ''
                || delimiter === false
                || delimiter === null )
            {
                return false;
            }

            if ( typeof delimiter == 'function'
                || typeof delimiter == 'object'
                || typeof string == 'function'
                || typeof string == 'object' )
            {
                return emptyArray;
            }

            if ( delimiter === true ) {
                delimiter = '1';
            }

            return string.toString().split ( delimiter.toString() );
        },

        /**
         * Аналог php
         * @param glue
         * @param pieces
         * @returns {*}
         */
        implode: function( glue, pieces ) {
            return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
        }

    };

})(window, Skeeks, Skeeks.$, Skeeks._);

(function (window, sx, $, _) {

    sx.createNamespace('classes', sx);

    /**
     *
     * Объект окна порождаемый в текущем окне
     *
     * @event beforeOpen
     * @event afterOpen
     * @event close
     * @event error(e, data)
     *
     * @type {void|Function|*}
     */
    sx.classes._Window = sx.classes.Component.extend({

        construct: function (src, name, opts) {
            opts = opts || {};
            this._name = name || "sx-window-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            this._src = src;
            this._openedWindow = null;
            this.isAllowClose = true;

            this.applyParentMethod(sx.classes.Component, 'construct', [opts]); // TODO: make a workaround for magic parent calling
        },

        _init: function () {
            this
                .defaultOpts({
                    "left": "50",
                    "top": "50",
                    "width": "90%",
                    "height": "70%",
                    "menubar": "no", //Если этот параметр установлен в yes, то в новом окне будет меню.
                    "location": "no", //Если этот параметр установлен в yes, то в новом окне будет адресная строка
                    "toolbar": "no", //Если этот параметр установлен в yes, то в новом окне будет навигация (кнопки назад, вперед и т.п.) и панель вкладок
                    "scrollbars": "yes", //Если этот параметр установлен в yes, то новое окно при необходимости сможет показывать полосы прокрутки
                    "resizable": "yes", //Если этот параметр установлен в yes, то пользователь сможет изменить размеры нового окна. Рекомендуется всегда устанавливать этот параметр.
                    "status": "yes", //Если этот параметр установлен в yes, то в новом окне будет строка состояния
                    "directories": "no",  //Если этот параметр установлен в yes, то в новом окне будут закладки/избранное
                    "fullscreen": "no",  //Если этот параметр установлен в yes, то в новом окне будут закладки/избранное
                    "dependent": "no",  //Если этот параметр установлен в yes, то в новом окне будут закладки/избранное
                    //"dialog"   : "yes",  //Если этот параметр установлен в yes, то в новом окне будут закладки/избранное
                    //"modal"         : "yes"  //Если этот параметр установлен в yes, то в новом окне будут закладки/избранное
                })
                .normalizeOptions()
            ;
        },

        /**
         *
         * @returns {sx.classes.Window}
         */
        normalizeOptions: function () {
            var windowWidth = window.screen.width;
            var windowHeight = window.screen.height;

            if (sx.helpers.String.strpos(this.get("width"), "%", 0)) {
                var newWidth = (Number(sx.helpers.String.str_replace("%", "", this.get("width"))) / 100) * windowWidth;
                this.set("width", Number(newWidth).toFixed())
            }

            if (sx.helpers.String.strpos(this.get("height"), "%", 0)) {
                var newHeight = (Number(sx.helpers.String.str_replace("%", "", this.get("height"))) / 100) * windowHeight;
                this.set("height", Number(newHeight).toFixed())
            }

            return this;
        },

        /**
         * В этом окне будут открываться все вложенные
         * @returns {sx.classes.CurrentWindow|*}
         */
        getMainWindow: function () {
            if (sx.Window.openerWindow()) {
                return sx.Window.openerWindow();
            }

            return window;
        },

        /**
         * @returns {Window}
         */
        open: function () {
            var self = this;
            this.trigger('beforeOpen');
            //строка параметров, собираем из массива
            var paramsSting = "";
            if (this.getOpts()) {
                _.each(this.getOpts(), function (value, key) {
                    if (paramsSting) {
                        paramsSting = paramsSting + ',';
                    }
                    paramsSting = paramsSting + String(key) + "=" + String(value);
                });
            }

                this._openedWindow = window.open(this._src, this._name, paramsSting);
            if (!this._openedWindow) {
                this.trigger('error', {
                    'message': 'Браузер блокирует окно, необходимо его разрешить'
                });

                return this;
            }

            this.trigger('afterOpen');

            var timer = setInterval(function () {
                if (self._openedWindow.closed) {
                    clearInterval(timer);
                    self.trigger('close');
                }
            }, 1000);

            return this;
        },


        /**
         * @returns {sx.classes.Window}
         */
        focus: function () {
            if (this.getOpenedWindow()) {
                this.getOpenedWindow().focus();
            }

            return this;
        },

        /**
         * @returns {sx.classes._Window}
         */
        close: function () {
            if (this.getOpenedWindow()) {
                this.trigger("beforeClose");
                if (this.isAllowClose) {
                    this.getOpenedWindow().close();
                }
            }

            return this;
        },

        /**
         * @returns {boolean}
         */
        isOpened: function () {
            if (!this._openedWindow) {
                return false;
            }

            return true;
        },

        /**
         * @returns {Window}|null
         */
        getOpenedWindow: function () {
            return this._openedWindow;
        },

        /**
         * @returns {string}
         */
        getName: function () {
            return String(this._name);
        },

        /**
         * @returns {sx.classes.Window}
         */
        setCenterOptions: function () {
            var windowWidth = window.screen.width;
            var windowHeight = window.screen.height;

            var left = ((windowWidth - this.get("width")) / 2);
            var top = ((windowHeight - this.get("height")) / 2);

            this
                .set("left", left)
                .set("top", top);

            return this;
        },

        /**
         * @returns {sx.classes.Window}
         */
        enableLocation: function () {
            this.set('location', 'yes');
            return this;
        },

        /**
         * @returns {sx.classes.Window}
         */
        disableLocation: function () {
            this.set('location', 'no');
            return this;
        },

        /**
         * @returns {sx.classes.Window}
         */
        enableResize: function () {
            this.set('resizable', 'yes');
            return this;
        },

        /**
         * @returns {sx.classes.Window}
         */
        disableResize: function () {
            this.set('resizable', 'no');
            return this;
        }

    });

    sx.classes.Window = sx.classes._Window.extend({});

    /**
     * @type {void|Function|*}
     */
    sx.classes.Windows = sx.classes.Component.extend({
        /**
         * @returns {Array.<T>|*}
         */
        findListRegistered: function () {
            return _.filter(sx.components, function (component) {
                if (component instanceof sx.classes._Window) {
                    return true;
                }
            });
        },

        /**
         *
         * @param name
         * @returns {sx.classes.Window|null}
         */
        findOneByName: function (name) {
            return _.find(this.findListRegistered(), function (component) {
                if (component.getName() == String(name)) {
                    return true;
                }
            });
        }
    });

    /**
     * Поиск виджетов работы с окнами.
     * @type {{findListRegistered: Function, findOneByName: Function}}
     */
    sx.Windows = new sx.classes.Windows();


    /**
     * @type {void|Function|*}
     */
    sx.classes._CurrentWindow = sx.classes.Component.extend({

        _init: function () {
            //Если есть родительское окно, слушае когда оно закроется, как только закроется, закроем и это
            var self = this;
            this._timer = null;

            this._openerWindowWidget = null;

            //Закрыть это окно, если закроется родительское.
            this.listenParent = false;

            if (this.openerWindow()) {
                this._timer = setInterval(function () {
                    if (!self.openerWindow()) {
                        clearInterval(self._timer);
                        if (self.listenParent) {
                            window.close();
                        }
                    }
                }, 3000);
            }

            this.on("reload", function() {
                window.location.reload();
            });

            /**
             * Это окно открытое во фрейме
             */
            if (self.getMainWindow() !== window) {
                try {
                    self.getMainWindow().console.log(window.location.href);

                    var newUrl = window.location.pathname + window.location.search;

                    /*self.getMainWindow().location.href =*/

                    /*self.getMainWindow().history.replaceState({}, "", window.location.href);*/
                    self.getMainWindow().history.replaceState({}, "", "#sx-open=" + newUrl);
                } catch (e) {
                    console.log(e);
                }
            }
        },

        /**
         * Родитльское окно
         * @returns {*}
         */
        openerWindow: function () {
            if (window.opener) {
                console.log(window.opener);
                return window.opener;
            }

            if (window.parent && window.name != window.parent.name) {
                return window.parent;
            }

            return null;
        },

        /**
         * объект sx родительского окна
         * @returns {Window.sx|*}
         */
        openerSx: function () {

            try {
                if (this.openerWindow()) {
                    return this.openerWindow().sx;
                }
            } catch (e) {
                return null;
            }


            return null;
        },


        /**
         * Виджет родительского окна, который породил это окно
         * @returns {sx.classes._Window|null}
         */
        openerWidget: function () {

            if (this._openerWindowWidget) {
                return this._openerWindowWidget;
            }

            if (this.openerSx()) {
                return this.openerSx().Windows.findOneByName(window.name);
            }

            return null;
        },

        /**
         * В этом окне будут открываться все вложенные
         * @returns {sx.classes.CurrentWindow|*}
         */
        getMainWindow: function () {
            if (this.openerWindow()) {
                return this.openerWindow();
            }

            return window;
        },

        /**
         *
         * @param event
         * @param data
         * @returns {sx.classes._CurrentWindow}
         */
        openerWidgetTriggerEvent: function (event, data) {
            //console.log(this.openerWidget());
            if (!this.openerWidget()) {
                return this;
            }

            this.openerWidget().trigger(event, data);
            return this;
        }


    });

    /**
     * @type {void|Function|*}
     */
    sx.classes.CurrentWindow = sx.classes._CurrentWindow.extend({});

    /**
     * @type {sx.classes.CurrentWindow}
     */
    sx.Window = new sx.classes.CurrentWindow();


})(window, sx, sx.$, sx._);

(function(sx, $, _)
{
    sx.createNamespace('classes.modal',       sx);

    sx.classes.modal._Alert = sx.classes.Component.extend({

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

        /**
         * @returns {sx.classes.modal._Alert}
         */
        show: function()
        {
            this.trigger('beforeShow');
            this._show();
            this.trigger('afterShow');

            return this;
        },

        /**
         * @returns {sx.classes.modal._Alert}
         * @private
         */
        _show: function()
        {
            alert(this.get("text"));
            return this;
        },
    });

    sx.classes.modal.Alert  = sx.classes.modal._Alert.extend({});

    sx.classes.modal._Confirm = sx.classes.modal.Alert.extend({

        _init: function()
        {
            if (this.get("yes"))
            {
                this.onYes(this.get("yes"));
            }
            if (this.get("no"))
            {
                this.onNo(this.get("no"));
            }
        },

        /**
         * @returns {sx.classes.modal._Confirm}
         */
        show: function()
        {
            this.trigger("beforeShow", this);

            var result = confirm(this.get("text"));

            if (result)
            {
                this.trigger("yes", this);
            } else
            {
                this.trigger("no", this);
            }

            this.trigger("closed", this);

            return this;
        },

        /**
         * @param callback
         * @returns {sx.classes.modal._Confirm}
         */
        onYes: function(callback)
        {
            this.bind("yes", callback);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Confirm}
         */
        onNo: function(callback)
        {
            this.bind("no", callback);
            return this;
        }
    });

    sx.classes.modal.Confirm    = sx.classes.modal._Confirm.extend({});

    sx.classes.modal._Prompt = sx.classes.Component.extend({

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
            if (this.get("yes"))
            {
                this.onYes(this.get("yes"));
            }

            if (this.get("no"))
            {
                this.onNo(this.get("no"));
            }
        },

        /**
         * @returns {sx.classes.modal._Promt}
         */
        show: function()
        {
            this.trigger("beforeShow", this);

            var result = prompt(this.get("text"), this.get("value", ""));

            if (result)
            {
                this.trigger("yes", result);
            } else
            {
                this.trigger("no", this);
            }

            this.trigger("closed", this);

            return this;
        },

        /**
         * @param callback
         * @returns {sx.classes.modal._Confirm}
         */
        onYes: function(callback)
        {
            this.bind("yes", callback);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Confirm}
         */
        onNo: function(callback)
        {
            this.bind("no", callback);
            return this;
        }
    });

    sx.classes.modal.Prompt    = sx.classes.modal._Prompt.extend({});

    /**
     *
     */
    sx.classes.modal._Dialog = sx.classes.Component.extend({

        _init: function()
        {
            //Этот диалог покзаан?
            this.isShowed = false;

            if (!this.get('id'))
            {
                this.set('id', sx.helpers.String.randStr());
            }
        },

        /**
         * @returns {sx.classes.modal._Dialog}
         */
        show: function()
        {
            this.trigger("beforeShow", this);
            this.isShowed = true;
            this.trigger("afterShow", this);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Dialog}
         */
        hide: function()
        {
            this.trigger("beforeHide", this);
            this.isShowed = false;
            this.trigger("afterHide", this);
            return this;
        },

        /**
         * @returns {sx.classes.modal._Dialog}
         */
        toggle: function()
        {
            if (this.isShowed)
            {
                this.hide();
            } else
            {
                this.show();
            }

            return this;
        }

    });

    sx.classes.modal.Dialog    = sx.classes.modal._Dialog.extend({});


    /**
     * @param text
     * @param options
     * @returns {sx.classes.modal.Alert}
     */
    sx.alert = function(text, options)
    {
        options = options || {};
        return new sx.classes.modal.Alert(text, options).show();
    }

    /**
     * @param text
     * @param options
     * @returns {sx.classes.modal.Confirm}
     */
    sx.confirm = function(text, options)
    {
        options = options || {};
        return new sx.classes.modal.Confirm(text, options).show();
    }

    /**
     * @param text
     * @param options
     * @returns {sx.classes.modal.Promt}
     */
    sx.prompt = function(text, options)
    {
        options = options || {};
        return new sx.classes.modal.Prompt(text, options).show();
    }

    /**
     * @param options
     * @returns {sx.classes.modal.Dialog}
     */
    sx.dialog = function(options)
    {
        options = options || {};
        return new sx.classes.modal.Dialog(options).show();
    }

})(sx, sx.$, sx._);

(function(sx, $, _)
{
    sx.createNamespace('classes',       sx);

    sx.classes._Blocker = sx.classes.Widget.extend({

        _init: function()
        {
            var self = this;
            /**
             * Текущее состояние
             * @type {boolean}
             * @private
             */
            this._isBlocked = false;

            this.defaultOpts({
                "autoStart" : false
            });

            if (this.isAutoStart())
            {
                this.block();
            }


            this.bind('beforeBlock', function()
            {
                this._isBlocked = true;
            });

            this.bind('afterUnblock', function()
            {
                this._isBlocked = false;
            });
        },

        /**
         * @returns {sx.classes._Blocker}
         */
        block: function()
        {
            this.trigger('beforeBlock');
            this._block();

            return this;
        },

        /**
         * @returns {sx.classes._Blocker}
         */
        unblock: function()
        {
            this.trigger('beforeUnblock');
            this._unblock();
            return this;
        },

        /**
         * @returns {sx.classes._Blocker}
         * @private
         */
        _block: function()
        {
            this.trigger('afterBlock');
            throw new Error('this is abstract class');
            /*return this;*/
        },

        /**
         * @returns {sx.classes._Blocker}
         * @private
         */
        _unblock: function()
        {
            this.trigger('afterUnblock');
            throw new Error('this is abstract class');
            /*return this;*/
        },

        /**
         * @returns {boolean}
         */
        isAutoStart: function()
        {
            return Boolean(this.get("autoStart"));
        }
    });

    sx.classes.Blocker  = sx.classes._Blocker.extend({});

    /**
     * @param wrapper
     * @param options
     * @returns {sx.classes._Blocker|*}
     */
    sx.block = function(wrapper, options)
    {
        return new sx.classes.Blocker(wrapper, options).block();
    };

    /**
     * Хэндлер ajax, для показа уведомлений
     */
    sx.classes.AjaxHandlerBlocker = sx.classes.AjaxHandler.extend({

        _init: function()
        {
            var self = this;
            this.blocker = new sx.classes.Blocker(this.get('wrapper'), this.toArray());

            //Отключаем внутренний подсчет состояния ajax запроса
            this.getAjaxQuery()
                .onBeforeSend(function(e, data)
                {
                    self.blocker.block();
                })
                .onComplete(function(e, data)
                {
                    self.blocker.unblock();
                })
            ;
        }

    });
})(sx, sx.$, sx._);

(function(sx, $, _)
{
    sx.createNamespace('classes',       sx);

    sx.classes.BlockerJqueyUi = sx.classes._Blocker.extend({

        _init: function()
        {
            this.applyParentMethod(sx.classes._Blocker, '_init', []);

            var wait_text = sx.Config.get('blocker_wait_text');
            var wait_image = sx.Config.get('blocker_wait_image');
            var blocker_opacity = sx.Config.get('blocker_opacity');

            var message = "<div style=''><img src='" + wait_image + "' /></div>";
            /*this.defaultOpts({
                message: message,
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity:         0
                    /!*cursor:          'wait'*!/
                },

                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: 'none;',
                    '-webkit-border-radiloaderus': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });*/
            this.defaultOpts({
                message: "<div style=''></div>",
                overlayCSS: {
                    /*background: 'linear-gradient(100deg, #eceff180 30%, #f6f7f870 50%, #eceff182 70%)',*/
                    opacity:         1,
                    cursor:          'wait'
                },
                css: {
                    border: 'none',
                    backgroundColor: 'none;',
                    opacity: .5,
                }
            });
        },

        /**
         * @returns {sx.classes.BlockerJqueyUi}
         * @private
         */
        _block: function()
        {
            var self = this;

            this.getWrapper().block( _.extend(this.toArray(), {

                'onBlock': function()
                {
                    self.trigger('afterBlock');
                },

                'onUnblock': function()
                {
                    self.trigger('afterUnblock');
                }

            }) );

            return this;
        },

        /**
         * @returns {sx.classes.BlockerJqueyUi}
         * @private
         */
        _unblock: function()
        {
            this.getWrapper().unblock();
            return this;
        },

        /**
         * @returns {boolean}
         */
        isAutoStart: function()
        {
            return Boolean(this.get("autoStart"));
        }
    });

    sx.classes.Blocker  = sx.classes.BlockerJqueyUi.extend({});

})(sx, sx.$, sx._);
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
            var AjaxQuery = this.getAjaxQuery();
            AjaxQuery.on("beforeExecute", function() {
                if (self.get('enableBlocker', false))
                {
                    self.getBlocker().block();
                }
            });

            AjaxQuery
                .always(function(e, data)
                {
                    if (self.get('enableBlocker', false))
                    {
                        self.getBlocker().unblock();
                    }
                })
                .fail(function(e, data)
                {
                    var message = "Ошибка выполнения ajax запроса. " + data.textStatus + " - " + data.errorThrown + ".";
                    //Ошибка выполнения ajax запроса.
                    self.trigger('ajaxExecuteError', data);
                    self.trigger('error', {
                        'message': message,
                        'e': data
                    });

                    //Разрешено ли показывать стандартное сообщение об ошибке, когда ajax запрос не выполнен
                    if ( self.get('ajaxExecuteErrorAllowMessage', true) )
                    {
                        sx.notify.error(self.get('ajaxExecuteErrorMessage', message));
                    }
                })
                .done(function(e, data)
                {
                    var response = data;
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