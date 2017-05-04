<?php
/**
 * HasWritableOptions
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
 * Class HasWritableOptions
 * @package skeeks\sx\traits
 */
trait HasWritableOptions
{
    use HasReadableOptions;

    /**
     * @param array $options
     * @return $this
     */
    public function setOptions(array $options)
    {
        $this->_options = $options;
        return $this;
    }

    /**
     * @param  string $name
     * @param  mixed  $value
     * @return $this
     */
    public function setOption($name, $value)
    {
        $this->_options[$name] = $value;
        return $this;
    }

    /**
     * @param array $options
     * @return $this
     */
    public function setDefaultOptions($options = [])
    {
        $this->_options = array_merge($options, $this->_options);
        return $this;
    }
}