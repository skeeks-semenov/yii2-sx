<?php
/**
 * @link https://cms.skeeks.com/
 * @copyright Copyright (c) 2010 SkeekS
 * @license https://cms.skeeks.com/license/
 */

namespace skeeks\sx\assets;

/**
 * Native, dependency-free implementation of the historical sx.notify API.
 *
 * JGrowl assets remain available for explicit legacy use, but are no longer
 * part of the standard SkeekS runtime.
 */
class ComponentNotifyToast extends ComponentNotify
{
    public $css = [
        'css/components/notify/toast.css',
    ];

    public $js = [
        'js/components/notify/NotifyToast.js',
    ];

    public $depends = [
        ComponentNotify::class,
    ];
}
