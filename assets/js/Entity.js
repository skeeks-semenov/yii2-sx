/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 05.10.2016
 */
(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    sx.classes._Entity = sx.classes.Base.extend({

        construct: function (opts)
        {
            this._opts = opts || {};
            this._coreInit();
        },

        _coreInit:      function()
        {
            this._validate();
            this._init();
        },

        _validate:      function()
        {},

        _init:          function()
        {},

        /**
         * Получить опции
         * @returns {*}
         */
        toArray: function()
        {
            return this._opts;
        },

        /**
         * Смержить опции
         * Новые опции перекрывают старые
         * @param data
         * @returns {sx.classes._Entity}
         */
        merge: function(data)
        {
            data = data || {};
            this._opts = _.extend(this._opts, data);
            return this;
        },

        /**
         *
         * Смержить опции
         * Новые опции перекрываются старыми, если старые есть
         *
         * @param data
         * @returns {sx.classes._Entity}
         */
        mergeDefaults: function(data)
        {
            data = data || {};
            var options =  this._opts || {};
            this._opts = _.extend(data, options);
            return this;
        },

        /**
         * Есть ли опция?
         * @param name
         * @returns {boolean}
         */
        exist: function(name)
        {
            return (typeof this._opts[name] == "undefined") ? false : true;
        },

        /**
         * TODO: better use method exist();
         * @param name
         * @returns {boolean}
         */
        isset: function(name)
        {
            return this.exist(name);
        },

        /**
         * Сбросить все опции
         */
        clear: function()
        {
            this._opts = {};
        },

        /**
         * @param name
         * @param defaultValue
         * @returns {*}
         */
        get: function(name, defaultValue)
        {
            return this.exist(name) ? this._opts[name] : defaultValue;
        },


        /**
         *
         * Установка значения опции
         *
         * @param name
         * @param value
         * @returns {sx.classes._Entity}
         */
        set: function(name, value)
        {
            this._opts[name] = value;
            return this;
        },


            /**
             * Устаревшие методы, их желательно не использовать.
             */

        /**
         * TODO: use method exist()
         * @param name
         * @returns {boolean}
         */
        hasOpt: function(name)
        {
            return this.exist(name);
        },

        /**
         * TODO: use method get()
         * @param name
         * @param defaultValue
         * @returns {*}
         */
        getOpt: function(name, defaultValue)
        {
            return this.get(name, defaultValue);
        },

        /**
         * TODO: use method set()
         * @param name
         * @param value
         * @returns {sx.classes._Entity}
         */
        setOpt: function(name, value)
        {
            return this.set(name, value);
        },

        /**
         * @param options
         * @returns {sx.classes._Entity}
         */
        setOpts: function(options)
        {
            this._opts = options;
            return this;
        },

        /**
         * TODO: use method toArray()
         * @returns {*}
         */
        getOpts: function()
        {
            return this.toArray();
        },

        /**
         * TODO: use method merge()
         * @param data
         * @returns {sx.classes._Entity}
         */
        mergeOpts: function(data)
        {
            return this.merge(data);
        },

        /**
         * TODO: use method mergeDefaults()
         * @param data
         * @returns {sx.classes._Entity}
         */
        defaultOpts: function(data)
        {
            return this.mergeDefaults(data);
        }
    });

    sx.classes.Entity = sx.classes._Entity.extend({});

})(sx, sx.$, sx._);