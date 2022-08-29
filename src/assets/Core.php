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

use skeeks\sx\File;
use yii\helpers\Json;
/**
 * Class Core
 * @package skeeks\sx\assets
 */
class Core extends BaseAsset
{
    public function init()
    {
        parent::init();
        //Ломается путь к изображению закгрузки
        //$this->_implodeFiles();
    }

    /**
     * Registers this asset bundle with a view.
     * @param View $view the view to be registered with
     * @return static the registered asset bundle instance
     */
    public function registerAssetFiles($view)
    {
        parent::registerAssetFiles($view);

        if (!\Yii::$app->request->isPjax) {
            $jsData = Json::encode([
            'blocker_wait_text' => \Yii::t('app', 'Подождите...'),
            'blocker_wait_image' => BaseAsset::getAssetUrl('img/loader/Double-Ring-2.7s-61px.svg'),
            'blocker_opacity' => 0.0
        ]);

        $view->registerJs(<<<JS
        (function(sx, $, _){
            sx.init({$jsData});
        })(sx, sx.$, sx._);
JS
);
        }

    }

    public $css = [];

    /*public $js = [
        'js/Skeeks.js',
        'js/Classes.js',
        'js/Entity.js',
        'js/EventManager.js',
        'js/Config.js',
        'js/Component.js',
        'js/Cookie.js',
        'js/Ajax.js',
    ];*/

    /**
     * @see http://closure-compiler.appspot.com/home
     * @var array
     */
    public $js = [
        'distr/skeeks-core.min.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
        'skeeks\sx\assets\Undescore',
    ];
}