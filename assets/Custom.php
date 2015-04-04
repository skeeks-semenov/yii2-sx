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
    public $depends = [
        'skeeks\sx\assets\Core',
        'skeeks\sx\assets\Widget',
        'skeeks\sx\assets\Helpers',
        'skeeks\sx\assets\ComponentWindow',
        'skeeks\sx\assets\ComponentModal',
        'skeeks\sx\assets\ComponentNotifyJgrowl',
        'skeeks\sx\assets\ComponentBlockerJqueryUi',
        'skeeks\sx\assets\ComponentAjaxHandlerStandartResponse',
    ];
}