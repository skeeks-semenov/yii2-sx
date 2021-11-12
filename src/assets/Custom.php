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
    public function init()
    {
        parent::init();
        $this->_implodeFiles();
    }

    public $js = [
        'js/Widget.js',
        'js/helpers/Helpers.js',
        'js/components/window/Window.js',
        'js/components/modal/Modal.js',
        'js/components/blocker/Blocker.js',
        'js/components/blocker/BlockerJqueryUi.js',
        'js/components/ajax-handlers/AjaxHandlerStandartRespose.js',
    ];

    public $depends = [
        'skeeks\sx\assets\Core',
        'skeeks\sx\assets\ComponentNotifyJgrowl',
        'skeeks\sx\assets\JqueryBlockUi',
    ];
}