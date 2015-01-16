<?php
/**
 * Widget
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 09.11.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use skeeks\cms\base\AssetBundle;

/**
 * Class Helpers
 * @package skeeks\sx\assets
 */
class Widget extends AssetBundle
{
    public $sourcePath = '@vendor/skeeks/yii2-sx/assets';
    public $css = [];
    public $js = [
        'js/Widget.js',
    ];
    public $depends = [
        'skeeks\sx\assets\Core',
    ];
}