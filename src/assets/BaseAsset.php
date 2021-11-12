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

use skeeks\sx\File;
use yii\web\AssetBundle;

/**
 * Class BaseAsset
 * @package skeeks\sx\assets
 */
class BaseAsset extends \skeeks\cms\base\AssetBundle
{
    public $sourcePath = '@skeeks/sx/assets';
    public $css = [];
    public $js = [];
    public $depends = [];
}