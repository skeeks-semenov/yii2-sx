<?php
/**
 * Custom
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 06.11.2014
 * @since 1.0.0
 */

namespace skeeks\sx\assets;

/**
 * Class Custom
 * @package skeeks\sx\assets
 */
class Custom extends BaseAsset
{
    public function init()
    {
        parent::init();
        //$this->_implodeFiles();
    }

    public $css = [
        'css/components/blocker/blocker.css',
    ];

    /*public $js = [
        'js/Widget.js',
        'js/helpers/Helpers.js',
        'js/components/window/Window.js',
        'js/components/modal/Modal.js',
        'js/components/blocker/Blocker.js',
        'js/components/blocker/BlockerJqueryUi.js',
        'js/components/ajax-handlers/AjaxHandlerStandartRespose.js',
    ];*/

    /**
     * @see http://closure-compiler.appspot.com/home
     * @var array
     */
    public $js = [
        'distr/skeeks-custom.min.js',
        'js/components/blocker/BlockerNative.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
        'skeeks\sx\assets\Core',
        'skeeks\sx\assets\ComponentNotifyToast',
    ];
}
