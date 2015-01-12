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
use skeeks\cms\base\AssetBundle;

/**
 * Class Asset
 * @package skeeks\sx
 */
class Core extends AssetBundle
{
    public $sourcePath = '@vendor/skeeks/yii2-sx/assets';
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