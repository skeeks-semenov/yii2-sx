<?php
/**
 * InstanceObject
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 22.10.2014
 * @since 1.0.0
 * @deprecated
 */
namespace skeeks\sx\traits;

/**
 * Class InstanceObject
 * @package skeeks\sx\traits
 */
trait InstanceObject
{
    /**
     * @param $file
     * @return static
     */
    static public function object($file = null)
    {
        if ($file instanceof static)
        {
            return $file;
        } else
        {
            return new static($file);
        }
    }
}
