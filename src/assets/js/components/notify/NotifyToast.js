/*!
 * Native toast notifications for the stable sx.notify API.
 */
(function (sx, $, _) {
    "use strict";

    sx.createNamespace("classes.notify", sx);

    var positions = {
        "top-left": true,
        "top-center": true,
        "top-right": true,
        "bottom-left": true,
        "bottom-center": true,
        "bottom-right": true
    };

    var typeAliases = {
        defaul: "notice",
        default: "notice",
        fail: "error"
    };

    var icons = {
        notice: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 10.5v6M12 7.5h.01"></path></svg>',
        info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 10.5v6M12 7.5h.01"></path></svg>',
        success: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 2.6 2.6L16.5 9"></path></svg>',
        warning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.2 4.6 3.4 17a2 2 0 0 0 1.8 3h13.6a2 2 0 0 0 1.8-3L13.8 4.6a2 2 0 0 0-3.6 0Z"></path><path d="M12 9v4M12 16.5h.01"></path></svg>',
        error: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6M15 9l-6 6"></path></svg>'
    };

    var normalizeType = function (type) {
        type = String(type || "notice").toLowerCase();
        return typeAliases[type] || type;
    };

    var normalizePosition = function (position) {
        position = String(position || "top-center").toLowerCase();
        if (position === "center") {
            position = "top-center";
        }
        return positions[position] ? position : "top-center";
    };

    var getContainer = function (position) {
        var normalized = normalizePosition(position);
        var selector = '[data-sx-notify-position="' + normalized + '"]';
        var $container = $(selector);

        if (!$container.length) {
            $container = $('<div class="sx-notify-container" aria-live="polite" aria-relevant="additions removals"></div>')
                .attr("data-sx-notify-position", normalized)
                .addClass("sx-notify-container--" + normalized)
                .appendTo(document.body);
        }

        return $container;
    };

    sx.classes.notify.NotifyToast = sx.classes.notify._Notify.extend({
        _init: function () {
            this._$toast = null;
            this._timer = null;
            this._startedAt = 0;
            this._remaining = null;
            this._isClosed = false;

            this.defaultOpts({
                autoShow: true,
                position: "top-center",
                closable: true,
                pauseOnHover: true,
                showProgress: true,
                maxVisible: 4,
                allowHtml: true,
                sticky: false
            });

            if (this.isAutoShow()) {
                this.show();
            }
        },

        getType: function () {
            return "notice";
        },

        getDuration: function () {
            var duration = this.get("duration");
            var defaults = {
                notice: 5000,
                info: 5000,
                success: 4000,
                warning: 7000,
                error: 9000
            };

            if (typeof duration === "undefined" || duration === null) {
                duration = this.get("life");
            }
            if (typeof duration === "undefined" || duration === null) {
                duration = defaults[this.getType()] || defaults.notice;
            }

            duration = parseInt(duration, 10);
            return isNaN(duration) ? defaults[this.getType()] : duration;
        },

        _show: function () {
            var self = this;

            this.onDomReady(function () {
                self._render();
            });

            return this;
        },

        _render: function () {
            var self = this;
            var type = normalizeType(this.getType());
            var position = normalizePosition(this.get("position"));
            var $container = getContainer(position);
            var id = this.get("id", this.get("key", ""));
            var maxVisible = Math.max(1, parseInt(this.get("maxVisible", 4), 10) || 4);
            var $toast;
            var $content;
            var $message;
            var $icon;
            var image = this.get("image", "");
            var title = this.get("title", this.get("header", ""));
            var text = this.get("text", "");
            var actions = this.get("actions", []);

            if (id) {
                $container.find('[data-sx-notify-id="' + String(id).replace(/"/g, "\\\"") + '"]').remove();
            }

            while ($container.children(".sx-notify:not(.is-closing)").length >= maxVisible) {
                var oldest = $container.children(".sx-notify:not(.is-closing)").first().data("sxNotifyInstance");
                if (oldest && oldest.close) {
                    oldest.close();
                } else {
                    $container.children(".sx-notify:not(.is-closing)").first().remove();
                }
            }

            $toast = $('<div class="sx-notify" aria-atomic="true"></div>')
                .addClass("sx-notify--" + type)
                .attr("role", type === "error" ? "alert" : "status")
                .data("sxNotifyInstance", this);

            if (id) {
                $toast.attr("data-sx-notify-id", id);
            }
            if (this.get("className")) {
                $toast.addClass(this.get("className"));
            }
            if (this.get("theme")) {
                $toast.addClass(this.get("theme"));
            }

            $icon = $('<span class="sx-notify__icon"></span>');
            if (image) {
                $icon.append($("<img>").attr({src: image, alt: ""}));
            } else {
                $icon.html(icons[type] || icons.notice);
            }

            $content = $('<div class="sx-notify__content"></div>');
            if (title) {
                $content.append($("<div class=\"sx-notify__title\"></div>").text(title));
            }

            $message = $('<div class="sx-notify__message"></div>');
            if (this.get("allowHtml", true)) {
                $message.html(text);
            } else {
                $message.text(text);
            }
            $content.append($message);

            if ($.isArray(actions) && actions.length) {
                var $actions = $('<div class="sx-notify__actions"></div>');
                $.each(actions, function (index, action) {
                    action = action || {};
                    var $action = action.href ? $("<a>") : $('<button type="button"></button>');
                    $action
                        .addClass("sx-notify__action")
                        .toggleClass("sx-notify__action--primary", !!action.primary)
                        .text(action.label || action.text || "Action");

                    if (action.href) {
                        $action.attr("href", action.href);
                    }
                    $action.on("click", function (event) {
                        if ($.isFunction(action.callback)) {
                            action.callback.call(self, event, self);
                        }
                        if (action.close !== false) {
                            self.close();
                        }
                    });
                    $actions.append($action);
                });
                $content.append($actions);
            }

            $toast.append($icon).append($content);

            if (this.get("closable", true)) {
                $('<button type="button" class="sx-notify__close" aria-label="Close notification">&times;</button>')
                    .on("click", function () {
                        self.close();
                    })
                    .appendTo($toast);
            }

            if (this.get("showProgress", true) && !this.get("sticky") && this.getDuration() > 0) {
                $toast.append('<span class="sx-notify__progress" aria-hidden="true"></span>');
            }

            if ($.isFunction(this.get("onClick"))) {
                $toast.addClass("sx-notify--clickable").on("click", function (event) {
                    if (!$(event.target).closest("button, a").length) {
                        self.get("onClick").call(self, event, self);
                    }
                });
            }

            if (this.get("pauseOnHover", true)) {
                $toast.on("mouseenter focusin", function () {
                    self._pauseTimer();
                });
                $toast.on("mouseleave focusout", function () {
                    self._resumeTimer();
                });
            }

            this._$toast = $toast;
            $container.append($toast);
            window.requestAnimationFrame(function () {
                $toast.addClass("is-visible");
            });

            this._remaining = this.getDuration();
            this._resumeTimer();
            this.trigger("afterShow", this);
        },

        _pauseTimer: function () {
            if (!this._timer) {
                return;
            }

            window.clearTimeout(this._timer);
            this._timer = null;
            this._remaining = Math.max(0, this._remaining - (Date.now() - this._startedAt));
            if (this._$toast) {
                this._$toast.addClass("is-paused");
            }
        },

        _resumeTimer: function () {
            var self = this;

            if (this._isClosed || this.get("sticky") || this.getDuration() <= 0 || this._timer) {
                return;
            }

            this._remaining = this._remaining === null ? this.getDuration() : this._remaining;
            this._startedAt = Date.now();
            if (this._$toast) {
                this._$toast.removeClass("is-paused");
                this._$toast.css("--sx-notify-duration", this._remaining + "ms");
            }
            this._timer = window.setTimeout(function () {
                self.close();
            }, this._remaining);
        },

        _close: function () {
            var self = this;
            var finish;

            if (this._isClosed) {
                return this;
            }
            this._isClosed = true;
            if (this._timer) {
                window.clearTimeout(this._timer);
                this._timer = null;
            }

            finish = function () {
                if (self._$toast) {
                    self._$toast.remove();
                    self._$toast = null;
                }
                if ($.isFunction(self.get("onClose"))) {
                    self.get("onClose").call(self, self);
                }
                self.trigger("afterClose", self);
            };

            if (!this._$toast || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                finish();
                return this;
            }

            this._$toast.removeClass("is-visible").addClass("is-closing");
            window.setTimeout(finish, 180);
            return this;
        }
    });

    sx.classes.notify.Defaul = sx.classes.notify.NotifyToast.extend({});
    sx.classes.notify.Notice = sx.classes.notify.NotifyToast.extend({});
    sx.classes.notify.Info = sx.classes.notify.NotifyToast.extend({
        getType: function () { return "info"; }
    });
    sx.classes.notify.Success = sx.classes.notify.NotifyToast.extend({
        getType: function () { return "success"; }
    });
    sx.classes.notify.Warning = sx.classes.notify.NotifyToast.extend({
        getType: function () { return "warning"; }
    });
    sx.classes.notify.Error = sx.classes.notify.NotifyToast.extend({
        getType: function () { return "error"; }
    });
    sx.classes.notify.Fail = sx.classes.notify.Error.extend({});

    sx.notify.show = function (text, options) {
        options = options || {};
        var type = normalizeType(options.type || "notice");
        var ClassName = {
            notice: sx.classes.notify.Notice,
            info: sx.classes.notify.Info,
            success: sx.classes.notify.Success,
            warning: sx.classes.notify.Warning,
            error: sx.classes.notify.Error
        }[type] || sx.classes.notify.Notice;

        return new ClassName(text, options);
    };

    sx.notify.clear = function (position) {
        var selector = position
            ? '[data-sx-notify-position="' + normalizePosition(position) + '"] .sx-notify'
            : ".sx-notify-container .sx-notify";

        $(selector).each(function () {
            var instance = $(this).data("sxNotifyInstance");
            if (instance && instance.close) {
                instance.close();
            } else {
                $(this).remove();
            }
        });
    };
})(sx, sx.$, sx._);
