<?php
/**
 * UndescoreAsset
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use yii\web\AssetBundle;
/**
 * Class UndescoreAsset
 * @package skeeks\sx
 */
class Undescore extends AssetBundle
{
    public $sourcePath = '@bower/underscore';
    public $js = [
        'underscore-min.js',
    ];
}
