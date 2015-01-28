<?php
/**
 * Asset
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use yii\web\View;

/**
 * Class Core
 * @package skeeks\sx\assets
 */
class Core extends BaseAsset
{
    public function init()
    {
        parent::init();
        //\Yii::$app->view->on(View::EVENT_BEGIN_BODY, [$this, 'addInitJs']);
    }

    /**
     * Registers this asset bundle with a view.
     * @param View $view the view to be registered with
     * @return static the registered asset bundle instance
     */
    public function registerAssetFiles($view)
    {
        parent::registerAssetFiles($view);

        $view->registerJs(<<<JS
        (function(sx, $, _)
        {
            sx.init({});
        })(sx, sx.$, sx._);
JS
);
    }

    /*public function addInitJs()
    {
        \Yii::$app->view->registerJs(<<<JS
        sx.init({});
JS
);
    }*/

    public $css = [];
    public $js = [
        'js/Skeeks.js',
        'js/Classes.js',
        'js/Entity.js',
        'js/EventManager.js',
        'js/Config.js',
        'js/Debug.js',
        'js/Cookie.js',
        'js/Component.js',
        'js/Ajax.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'skeeks\sx\assets\Undescore',
    ];
}