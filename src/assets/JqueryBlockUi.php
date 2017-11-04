<?php
/**
 * JqueryBlockUi
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 29.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class JquryTmpl
 * @package skeeks\sx\assets
 */
class JqueryBlockUi extends BaseAsset
{
    public $css = [];
    public $js = [
        //'libs/jquery-plugins/block-ui/jquery.blockUI.js',
        'libs/jquery-plugins/block-ui/jquery.blockUI.min.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];

}