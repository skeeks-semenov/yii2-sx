"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function expect(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function makeClass(parent, prototype) {
    function ClassName(text, options) {
        if (typeof this.construct === "function") {
            this.construct(text, options);
        }
        if (typeof this._init === "function") {
            this._init();
        }
    }

    ClassName.prototype = Object.create(parent ? parent.prototype : {});
    Object.assign(ClassName.prototype, prototype || {});
    ClassName.prototype.constructor = ClassName;
    ClassName.extend = function (childPrototype) {
        return makeClass(ClassName, childPrototype);
    };

    return ClassName;
}

const Component = makeClass(null, {
    construct(options) {
        this.options = Object.assign({}, options || {});
        this.events = {};
    },
    applyParentMethod(parent, method, args) {
        return parent.prototype[method].apply(this, args || []);
    },
    defaultOpts(defaults) {
        this.options = Object.assign({}, defaults || {}, this.options || {});
        return this;
    },
    get(name, fallback) {
        return Object.prototype.hasOwnProperty.call(this.options || {}, name)
            ? this.options[name]
            : fallback;
    },
    set(name, value) {
        this.options[name] = value;
        return this;
    },
    trigger() {
        return this;
    },
    onDomReady(callback) {
        callback();
        return this;
    }
});

const sx = {
    classes: {Component, AjaxHandler: Component.extend({})},
    createNamespace(namespace, root) {
        namespace.split(".").reduce((owner, key) => {
            owner[key] = owner[key] || {};
            return owner[key];
        }, root);
    }
};

const jquery = function () {
    throw new Error("DOM rendering is not part of this API contract test.");
};
jquery.isArray = Array.isArray;
jquery.isFunction = value => typeof value === "function";
jquery.each = (items, callback) => (items || []).forEach((item, index) => callback(index, item));
sx.$ = jquery;
sx._ = {indexOf: (items, value) => items.indexOf(value)};

const context = vm.createContext({
    sx,
    window: {
        clearTimeout,
        setTimeout,
        matchMedia: () => ({matches: true}),
        requestAnimationFrame: callback => callback()
    },
    document: {body: {}},
    Date,
    Math,
    String,
    parseInt,
    isNaN
});

const assetsRoot = path.resolve(__dirname, "../src/assets");
for (const relativePath of [
    "js/components/notify/Notify.js",
    "js/components/notify/NotifyToast.js"
]) {
    vm.runInContext(fs.readFileSync(path.join(assetsRoot, relativePath), "utf8"), context, {
        filename: relativePath
    });
}

for (const method of ["defaul", "notice", "info", "success", "warning", "error", "fail", "show", "clear"]) {
    expect(typeof sx.notify[method] === "function", `sx.notify.${method} is missing.`);
}

const info = sx.notify.info("Info", {autoShow: false, life: 1234});
expect(info.getType() === "info", "Info type was not preserved.");
expect(info.getDuration() === 1234, "Legacy life alias was not preserved.");
expect(info.get("allowHtml") === true, "Compatibility HTML default changed.");

const safeWarning = sx.notify.show("<b>Safe text</b>", {
    autoShow: false,
    type: "warning",
    allowHtml: false,
    duration: 2222
});
expect(safeWarning.getType() === "warning", "Dynamic warning type was not resolved.");
expect(safeWarning.get("allowHtml") === false, "Safe text option was not preserved.");
expect(safeWarning.getDuration() === 2222, "Explicit duration was not preserved.");

const failure = sx.notify.fail("Failure", {autoShow: false});
expect(failure.getType() === "error", "Legacy fail alias no longer maps to error.");

console.log("Native toast runtime contract: OK");
