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
 * Interface Ix_IdentityMap
 * @package skeeks\sx
 */
interface Ix_IdentityMap
{
    /**
     * @abstract
     * @param  string $name
     * @param  mixed  $obj
     * @return Ix_IdentityMap
     */
    public function register($name, $obj);

    /**
     * @abstract
     * @param  string $name
     * @return bool
     */
    public function isRegistered($name);

    /**
     * @abstract
     * @param  string $name
     * @return mixed
     */
    public function get($name);

    /**
     * @abstract
     * @param  mixed $obj
     * @return bool
     */
    public function isValid($obj);

    /**
     * @param  string $name
     * @return Ix_IdentityMap
     */
    public function remove($name);
}

/**
 * Class Tx_IdentityMap
 * @package skeeks\sx
 */
trait Tx_IdentityMap
{
    /**
     * @var array
     */
    protected $_idMap = [];

    /**
     * @return array
     */
    public function toArray()
    {
        return (array) $this->_idMap;
    }

    /**
     * @param string $name
     * @param mixed  $obj
     * @throws Exception
     * @return $this
     */
    public function register($name, $obj)
    {
        if ($this->isRegistered($name)) {
            throw new Exception("Identity '{$name}' was already registered.'");
        }

        if (!$this->isValid($obj)) {
            throw new Exception("Given identity object is not valid for " . get_class($this) . '.');
        }

        $this->_idMap[$name] = $obj;

        return $this;
    }

    /**
     * @param string $name
     * @return bool
     */
    public function isRegistered($name)
    {
        return array_key_exists($name, $this->_idMap);
    }

    /**
     * @throws Exception
     * @param string $name
     * @return mixed
     */
    public function get($name)
    {
        if (!$this->isRegistered($name)) {
            throw new Exception("Identity '{$name}' was not registered yet.");
        }

        return $this->_idMap[$name];
    }

    public function remove($name)
    {
        unset($this->_idMap[$name]);
        return $this;
    }
}