<?php
/**
 * BaseAsset
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 24.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use skeeks\cms\base\AssetBundle;

/**
 * Class BaseAsset
 * @package skeeks\sx\assets
 */
abstract class BaseAsset extends AssetBundle
{
    public $sourcePath = '@vendor/skeeks/yii2-sx/assets';
    public $css = [];
    public $js = [];
    public $depends = [];
}