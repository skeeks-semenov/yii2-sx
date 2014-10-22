<?php
/**
 * HasReadableOptions
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 22.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\traits;
use \skeeks\sx\Exception;
/**
 * Class Entity
 * @package skeeks\sx\traits
 */
trait HasReadableOptions
{
    /**
     * @var array
     */
    protected $_options = [];

    /**
     * @param $name
     * @param null $default
     * @return null
     */
    public function getOption($name, $default = null)
    {
        return $this->hasOption($name) ? $this->_options[$name] : $default;
    }

    /**
     * @return array
     */
    public function getOptions()
    {
        return $this->_options;
    }

    /**
     * @param  string $name
     * @return bool
     */
    public function hasOption($name)
    {
        return array_key_exists($name, $this->_options);
    }
}