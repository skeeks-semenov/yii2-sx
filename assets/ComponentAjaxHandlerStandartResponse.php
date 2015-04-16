<?php
/**
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010 SkeekS (СкикС)
 * @date 04.04.2015
 */
namespace skeeks\sx\assets;
/**
 * Class ComponentAjaxHandlerStandartResponse
 * @package skeeks\sx\assets
 */
class ComponentAjaxHandlerStandartResponse extends BaseAsset
{
    public $css = [];

    public $js = [
        'js/components/ajax-handlers/AjaxHandlerStandartRespose.js',
    ];

    public $depends = [
        'skeeks\sx\assets\Core',
        'skeeks\sx\assets\ComponentNotify',
    ];
}