<?php
/**
 * Custom
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 06.11.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class Custom
 * @package skeeks\sx\assets
 */
class Custom extends BaseAsset
{
    public $js = [
        'js/Widget.js',
        'js/helpers/Helpers.js',
        'js/components/window/Window.js',
        'js/components/modal/Modal.js',
    ];

    public $depends = [
        'skeeks\sx\assets\Core',
        'skeeks\sx\assets\ComponentNotifyJgrowl',
        'skeeks\sx\assets\ComponentBlockerJqueryUi',
        'skeeks\sx\assets\ComponentAjaxHandlerStandartResponse',
    ];
}