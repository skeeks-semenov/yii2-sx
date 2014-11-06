/*!
 *
 *
 *
 * @date 06.11.2014
 * @copyright skeeks.com
 * @author Semenov Alexander <semenov@skeeks.com>
 */


(function(sx, $, _)
{
    sx.createNamespace('classes', sx);

    /**
    * @type {void|Function|*}
    */
    sx.classes.Widget = sx.classes.Component.extend({

        construct: function ($JqueryObject, opts) {
            opts = opts || {};
            this._JqueryObject = $JqueryObject;
            this.applyParentMethod(sx.classes.Component, 'construct', [opts]); // TODO: make a workaround for magic parent calling
        }
    });

})(sx, sx.$, sx._);