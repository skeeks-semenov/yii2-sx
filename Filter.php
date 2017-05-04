<?php
/**
 * App
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 * @deprecated
 */
namespace skeeks\sx;
/**
 * Interface Ix_Filter
 * @package skeeks\sx
 */
interface Ix_Filter
{
    /**
     * @param  mixed $value
     * @return mixed
     */
    function filter($value);
}


/**
 * Class Filter
 * @package skeeks\sx
 */
abstract class Filter
    implements Ix_Filter
{
    /**
     * @param mixed $value
     * @return mixed
     */
    public function __invoke($value)
    {
        return $this->filter($value);
    }

}