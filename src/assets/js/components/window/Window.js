/**
 * Помощьник для работы с конами
 *
 * @link https://cms.skeeks.com/
 * @copyright Copyright (c) 2010 SkeekS
 * @license https://cms.skeeks.com/license/
 * @author Semenov Alexander <semenov@skeeks.com>
 */


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
                self.getMainWindow().console.log(window.location.href);

                var newUrl = window.location.pathname + window.location.search;

                /*self.getMainWindow().location.href =*/

                /*self.getMainWindow().history.replaceState({}, "", window.location.href);*/
                self.getMainWindow().history.replaceState({}, "", "#sx-open=" + newUrl);
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
