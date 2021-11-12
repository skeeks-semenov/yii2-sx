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

use yii\helpers\Json;
/**
 * Class Custom
 * @package skeeks\sx\assets
 */
class Custom extends BaseAsset
{
    public function init()
    {
        parent::init();
        $this->_implodeFiles();
    }

    public $css = [
        //JqueryJgrowl
        'libs/jquery-plugins/jquery-jgrowl/jquery.jgrowl.min.css',
    ];

    public $js = [

        //ComponentNotify
        'js/components/notify/Notify.js',

        //JqueryJgrowl
        'libs/jquery-plugins/jquery-jgrowl/jquery.jgrowl.js',

        //'skeeks\sx\assets\ComponentNotifyJgrowl',
        'js/components/notify/NotifyJgrowl.js',

        //'skeeks\sx\assets\JqueryBlockUi',
        'libs/jquery-plugins/block-ui/jquery.blockUI.min.js',

        'js/Widget.js',
        'js/helpers/Helpers.js',
        'js/components/window/Window.js',
        'js/components/modal/Modal.js',
        'js/components/blocker/Blocker.js',
        'js/components/blocker/BlockerJqueryUi.js',
        'js/components/ajax-handlers/AjaxHandlerStandartRespose.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
        'skeeks\sx\assets\Core',
        //'skeeks\sx\assets\ComponentNotifyJgrowl',
        //'skeeks\sx\assets\JqueryBlockUi',
    ];


    /**
     * Registers this asset bundle with a view.
     * @param View $view the view to be registered with
     * @return static the registered asset bundle instance
     */
    public function registerAssetFiles($view)
    {
        parent::registerAssetFiles($view);

        $options = [
            'notify' => [
                'imageError'   => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/error.png'),
                'imageFail'    => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/fail.gif'),
                'imageInfo'    => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/info.png'),
                'imageSuccess' => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/success.png'),
                'imageWarning' => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/warning.png'),
            ],
        ];

        $options = Json::encode($options);

        $view->registerJs(<<<JS
        (function(sx, $, _)
        {
            sx.Config.merge({$options});
        })(sx, sx.$, sx._);
JS
        );
    }
}