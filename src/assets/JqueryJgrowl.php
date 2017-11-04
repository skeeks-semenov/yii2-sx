<?php
/**
 * JqueryJgrowl
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 28.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class JquryTmpl
 * @package skeeks\sx\assets
 */
class JqueryJgrowl extends BaseAsset
{
    public $css = [
        'libs/jquery-plugins/jquery-jgrowl/jquery.jgrowl.min.css',
    ];
    public $js = [
        'libs/jquery-plugins/jquery-jgrowl/jquery.jgrowl.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];

}