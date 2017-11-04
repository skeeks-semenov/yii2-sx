<?php
/**
 * ComponentNotify
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 28.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use yii\helpers\Json;

/**
 * Class ComponentNotify
 * @package skeeks\sx\assets
 */
class ComponentNotify extends BaseAsset
{
    public $css = [];
    public $js = [
        'js/components/notify/Notify.js',
    ];
    public $depends = [
        'skeeks\sx\assets\Core',
    ];

    /**
     * Registers this asset bundle with a view.
     * @param View $view the view to be registered with
     * @return static the registered asset bundle instance
     */
    public function registerAssetFiles($view)
    {
        parent::registerAssetFiles($view);

        $options =
        [
            'notify' =>
            [
                'imageError'    => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/error.png'),
                'imageFail'     => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/fail.gif'),
                'imageInfo'     => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/info.png'),
                'imageSuccess'  => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/success.png'),
                'imageWarning'  => \Yii::$app->getAssetManager()->getAssetUrl($this, 'js/components/notify/images/warning.png')
            ]
        ];

        $options = Json::encode($options);

        $view->registerJs(<<<JS
        (function(sx, $, _)
        {
            sx.config.merge({$options});
        })(sx, sx.$, sx._);
JS
);
    }

}