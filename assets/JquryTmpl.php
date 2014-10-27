<?php
/**
 * JquryTmpl
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 27.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use yii\web\AssetBundle;

/**
 * Class Asset
 * @package skeeks\sx
 */
class JquryTmpl extends AssetBundle
{
    public $sourcePath = '@vendor/skeeks/yii2-sx/assets';
    public $css = [];
    public $js = [
        'libs/jquery-plugins/jquery-tmpl/jquery.tmpl.min.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];
}