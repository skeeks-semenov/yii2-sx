<?php
/**
 * ComponentAjaxLoader
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 24.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class Helpers
 * @package skeeks\sx\assets
 */
class ComponentAjaxLoader extends BaseAsset
{
    public $css = [
        'js/components/ajax-loader/css/style.css',
    ];
    public $js = [
        'js/components/ajax-loader/AjaxLoader.js',
    ];
    public $depends = [
        'skeeks\sx\assets\Core',
    ];
}