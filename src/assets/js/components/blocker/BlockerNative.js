/*!
 * Native container blocker for the stable sx.block / sx.classes.Blocker API.
 */
(function (sx, $, _) {
    "use strict";

    sx.createNamespace("classes", sx);

    var isPageWrapper = function ($wrapper) {
        return $wrapper.is("html, body");
    };

    sx.classes.BlockerNative = sx.classes._Blocker.extend({
        _init: function () {
            this._$overlay = null;
            this._$wrapper = null;
            this._showTimer = null;
            this._hideTimer = null;
            this._removeTimer = null;
            this._blockCount = 0;
            this._shownAt = 0;
            this._previousPosition = null;
            this._previousAriaBusy = null;

            this.defaultOpts({
                delay: 80,
                minDuration: 180,
                showSpinner: true,
                shimmer: true,
                allowHtml: true,
                text: "",
                message: "",
                ariaLabel: "Loading",
                className: ""
            });

            this.applyParentMethod(sx.classes._Blocker, "_init", []);
        },

        getJWrapper: function () {
            var $wrapper = this.getWrapper();

            if (!$wrapper || !$wrapper.jquery) {
                $wrapper = $($wrapper || document.body);
            }
            if (!$wrapper.length) {
                $wrapper = $(document.body);
            }

            this._$wrapper = $wrapper.first();
            return this._$wrapper;
        },

        _block: function () {
            var self = this;
            var delay;

            this._blockCount += 1;
            if (this._blockCount > 1) {
                return this;
            }

            if (this._hideTimer) {
                window.clearTimeout(this._hideTimer);
                this._hideTimer = null;
            }
            if (this._removeTimer) {
                window.clearTimeout(this._removeTimer);
                this._removeTimer = null;
            }
            if (this._$overlay) {
                this._$overlay.removeClass("is-closing").addClass("is-visible");
                return this;
            }

            this._prepareWrapper();
            delay = Math.max(0, parseInt(this.get("delay", 80), 10) || 0);

            if (delay > 0) {
                this._showTimer = window.setTimeout(function () {
                    self._showTimer = null;
                    self._showOverlay();
                }, delay);
            } else {
                this._showOverlay();
            }

            return this;
        },

        _prepareWrapper: function () {
            var $wrapper = this.getJWrapper();

            this._previousAriaBusy = $wrapper.attr("aria-busy");
            $wrapper.attr("aria-busy", "true").addClass("sx-is-blocked");

            if (!isPageWrapper($wrapper) && $wrapper.css("position") === "static") {
                this._previousPosition = $wrapper[0].style.position;
                $wrapper.css("position", "relative");
            }
        },

        _showOverlay: function () {
            var self = this;
            var $wrapper;
            var $overlay;
            var $indicator;
            var content = this.get("text", "") || this.get("message", "");
            var contentText = $("<div>").html(content).text().replace(/\s+/g, "").trim();
            var hasMedia = /<(img|svg|video|canvas)\b/i.test(String(content));

            if (this._blockCount < 1 || this._$overlay) {
                return this;
            }

            $wrapper = this.getJWrapper();
            $overlay = $('<div class="sx-blocker" role="status" aria-live="polite" aria-atomic="true"></div>')
                .attr("aria-label", this.get("ariaLabel", "Loading"))
                .toggleClass("sx-blocker--page", isPageWrapper($wrapper))
                .toggleClass("sx-blocker--shimmer", !!this.get("shimmer", true));

            if (this.get("className")) {
                $overlay.addClass(this.get("className"));
            }

            $indicator = $('<div class="sx-blocker__indicator"></div>');
            if (this.get("showSpinner", true)) {
                $indicator.append('<span class="sx-blocker__spinner" aria-hidden="true"></span>');
            }
            if (contentText || hasMedia) {
                var $message = $('<span class="sx-blocker__message"></span>');
                if (this.get("allowHtml", true)) {
                    $message.html(content);
                } else {
                    $message.text(content);
                }
                $indicator.append($message);
            }

            $overlay.append($indicator);
            if ($wrapper.outerWidth() < 140 || $wrapper.outerHeight() < 88) {
                $overlay.addClass("sx-blocker--compact");
            }

            this._$overlay = $overlay;
            this._shownAt = Date.now();
            $wrapper.append($overlay);

            window.requestAnimationFrame(function () {
                if (self._$overlay) {
                    self._$overlay.addClass("is-visible");
                }
            });

            this.trigger("afterBlock", this);
            if ($.isFunction(this.get("onBlock"))) {
                this.get("onBlock").call(this, this);
            }

            return this;
        },

        update: function (content, options) {
            options = options || {};
            this.set("text", content);

            if (typeof options.allowHtml !== "undefined") {
                this.set("allowHtml", options.allowHtml);
            }
            if (this._$overlay) {
                var $message = this._$overlay.find(".sx-blocker__message");
                if (!$message.length) {
                    $message = $('<span class="sx-blocker__message"></span>').appendTo(this._$overlay.find(".sx-blocker__indicator"));
                }
                if (this.get("allowHtml", true)) {
                    $message.html(content);
                } else {
                    $message.text(content);
                }
            }

            return this;
        },

        _unblock: function () {
            var self = this;
            var elapsed;
            var minDuration;
            var wait;

            if (this._blockCount < 1) {
                return this;
            }

            this._blockCount = Math.max(0, this._blockCount - 1);
            if (this._blockCount > 0) {
                return this;
            }

            if (this._showTimer) {
                window.clearTimeout(this._showTimer);
                this._showTimer = null;
                this._finishUnblock();
                return this;
            }

            elapsed = this._shownAt ? Date.now() - this._shownAt : 0;
            minDuration = Math.max(0, parseInt(this.get("minDuration", 180), 10) || 0);
            wait = Math.max(0, minDuration - elapsed);

            if (this._hideTimer) {
                window.clearTimeout(this._hideTimer);
            }
            this._hideTimer = window.setTimeout(function () {
                self._hideTimer = null;
                self._finishUnblock();
            }, wait);

            return this;
        },

        _finishUnblock: function () {
            var self = this;
            var $overlay = this._$overlay;
            var finish = function () {
                self._removeTimer = null;
                if (self._blockCount > 0) {
                    if (self._$overlay) {
                        self._$overlay.removeClass("is-closing").addClass("is-visible");
                    }
                    return;
                }
                if ($overlay) {
                    $overlay.remove();
                }
                self._$overlay = null;
                self._shownAt = 0;
                self._restoreWrapper();
                self.trigger("afterUnblock", self);
                if ($.isFunction(self.get("onUnblock"))) {
                    self.get("onUnblock").call(self, self);
                }
            };

            if (!$overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                finish();
                return this;
            }

            $overlay.removeClass("is-visible").addClass("is-closing");
            this._removeTimer = window.setTimeout(finish, 180);
            return this;
        },

        _restoreWrapper: function () {
            var $wrapper = this.getJWrapper();

            $wrapper.removeClass("sx-is-blocked");
            if (this._previousAriaBusy === null || typeof this._previousAriaBusy === "undefined") {
                $wrapper.removeAttr("aria-busy");
            } else {
                $wrapper.attr("aria-busy", this._previousAriaBusy);
            }
            if (this._previousPosition !== null) {
                $wrapper[0].style.position = this._previousPosition;
                this._previousPosition = null;
            }
        },

        isBlocked: function () {
            return this._blockCount > 0;
        }
    });

    sx.classes.Blocker = sx.classes.BlockerNative.extend({});
})(sx, sx.$, sx._);
