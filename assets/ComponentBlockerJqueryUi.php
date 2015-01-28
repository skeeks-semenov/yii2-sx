<?php
/**
 * ComponentBlockerJqueryUi
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 29.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;

/**
 * Class ComponentNotify
 * @package skeeks\sx\assets
 */
class ComponentBlockerJqueryUi extends ComponentBlocker
{
    public $css = [];
    public $js = [
        'js/components/blocker/BlockerJqueryUi.js'
    ];
    public $depends = [
        'skeeks\sx\assets\JqueryBlockUi',
        'skeeks\sx\assets\ComponentBlocker'
    ];
}