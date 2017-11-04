<?php
/**
 * ComponentModal
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 09.11.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class ComponentModal
 * @package skeeks\sx\assets
 */
class ComponentModal extends BaseAsset
{
    public $css = [];
    public $js = [
        'js/components/modal/Modal.js',
    ];
    public $depends = [
        'skeeks\sx\assets\Core',
    ];
}