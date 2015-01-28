<?php
/**
 * ComponentNotifyJgrowl
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 28.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use yii\helpers\Json;

/**
 * Class ComponentNotify
 * @package skeeks\sx\assets
 */
class ComponentNotifyJgrowl extends ComponentNotify
{
    public $css = [];
    public $js = [
        'js/components/notify/NotifyJgrowl.js',
    ];
    public $depends = [
        'skeeks\sx\assets\JqueryJgrowl',
        'skeeks\sx\assets\ComponentNotify'
    ];
}