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
use yii\web\AssetBundle;

/**
 * Class Asset
 * @package skeeks\sx
 */
class Custom extends AssetBundle
{
    public $sourcePath = '@vendor/skeeks/yii2-sx/assets';
    public $css = [];
    public $js = [
        'js/Widget.js',
        'js/helpers/Helpers.js',
        'js/components/window/Window.js',
    ];
    public $depends = [
        'skeeks\sx\assets\Core',
    ];
}