<?php
/**
 * App
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx;
/**
 * Interface Ix_Filter
 * @package skeeks\sx
 *
 * @deprecated
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
 *
 * @deprecated
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