<?php
/**
 * ComponentBlocker
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 29.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class ComponentBlocker
 * @package skeeks\sx\assets
 */
class ComponentBlocker extends BaseAsset
{
    public $css = [];
    public $js = [
        'js/components/blocker/Blocker.js',
    ];
    public $depends = [
        'skeeks\sx\assets\Core',
    ];
}