/*!
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 05.10.2016
 */
(function(sx, _)
{
    // classes holder
    sx.classes = {};

    // base class
    sx.classes.Base = function Base() {};
    sx.classes.Base.prototype.construct = function(){};

    sx.classes.Base.prototype.applyParentMethod = function(cls, method, args)
    {
        cls.prototype[method].apply(this, args || []);
    };

    /**
     * The core of inheritance
     *
     * @param  {Object} props
     * @return {Function}
     */
    sx.classes.Base.extend = function(props)
    {
        // start exteding
        sx.__isExtending = true;

        // temporary child
        var tmp = function tmp () {};
        tmp.prototype = new this();

        // inherit
        var F = function()
        {
            if (!sx.__isExtending)
            {
                // copy non-function properties
                for (var k in props)
                {
                    if(props.hasOwnProperty(k))
                    {
                        var prop = props[k];

                        if (!_.isFunction(prop))
                        {
                            F.prototype[k] = _.clone(prop);
                        }
                    }
                }

                // call construct method
                this.construct.apply(this, arguments);
            }
        };
        F.prototype = new tmp();

        // extend prototype with new methods
        for (var k in props)
        {
            if(props.hasOwnProperty(k))
            {
                var prop = props[k];

                if (_.isFunction(prop))
                {
                    F.prototype[k] = prop;
                }
            }
        }

        // re-link the constructor
        F.prototype.constructor = F;

        // this parent
        F.prototype.parentClass = this.prototype;

        // copy the extending method
        F.extend = this.extend;

        // ref to parent
        F.prototype.parent = this.prototype;

        // end
        sx.__isExtending = false;

        return F;
    };
})(Skeeks, Skeeks._);
