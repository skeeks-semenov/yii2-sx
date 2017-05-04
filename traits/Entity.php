<?php
/**
 * Entity
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 22.10.2014
 * @since 1.0.0
 * @deprecated
 */
namespace skeeks\sx\traits;
use \skeeks\sx\Exception;
/**
 * Class Entity
 * @package skeeks\sx\traits
 */
trait Entity
{
    /**
     * @var array Данные модели
     */
    protected $_data = [];

    /**
     * @param $name
     * @param null $default
     * @return null
     */
    public function get($name, $default = null)
    {
        if (!$this->offsetExists($name))
        {
            return $default;
        }

        return $this->_data[$name];
    }

    /**
     * @param string $name
     * @param mixed $value
     * @return $this
     */
    public function set($name, $value)
    {
        $this->_data[(string) $name] = $value;
        return $this;
    }

    /**
     * @param $offset
     * @param $value
     * @return $this
     */
    public function offsetSet($offset, $value)
    {
        return $this->set($offset, $value);
    }

    /**
     * @param $offset
     * @param null $default
     * @return mixed|null
     */
    public function offsetGet($offset, $default = null)
    {
        return $this->get($offset);
    }

    /**
     * @param $offset
     * @return $this
     */
    public function offsetUnset($offset)
    {
        if(array_key_exists($offset, $this->_data))
        {
            unset($this->_data[$offset]);
        }

        return $this;
    }

    /**
     * @param $offset
     * @return bool
     */
    public function offsetExists($offset)
    {
        return array_key_exists($offset, (array) $this->_data);
    }


    /**
     * @param array $data
     * @return $this
     */
    public function setData($data = [])
    {
        $this->_data = $data;
        return $this;
    }

    /**
     * @param array $data
     * @param bool $recursively
     * @return $this
     */
    public function addData($data = [], $recursively = false)
    {
        if ($recursively)
        {
            $this->_data = array_replace_recursive($this->_data, $data);
        } else
        {
            $this->_data = array_merge($this->_data, $data);
        }

        return $this;
    }

    /**
     * @param array $data
     * @param bool $recursively
     * @return Entity
     */
    public function mergeData($data = [], $recursively = false)
    {
        return $this->addData($data);
    }


    /**
     * @param array $data
     * @return Entity
     */
    public function merge($data = [])
    {
        return $this->addData($data);
    }

    /**
     * @param array $data
     * @return $this
     */
    public function setDefaultData($data = [], $recursively = false)
    {
        if ($recursively)
        {
            $this->_data = array_replace_recursive($data, $this->_data);
        } else
        {
            $this->_data = array_merge($data, $this->_data);
        }

        return $this;
    }

    /**
     * @return array
     */
    public function getData()
    {
        return (array) $this->_data;
    }







    /**
     * @return array
     */
    public function toArray()
    {
        return $this->_data;
    }

    /**
     * @return string
     */
    public function toString()
    {
        return $this->toSerialize();
    }

    /**
     * @return string
     */
    public function toSerialize()
    {
        return serialize($this->_data);
    }

    /**
     * @return string
     */
    public function toJson()
    {
        return json_encode($this->_data);
    }




    /**
     *
     * Есть данные по модели или она пустая?
     *
     * @return bool
     */
    public function isEmpty()
    {
        if (!$this->_data)
        {
            return true;
        } else
        {
            return false;
        }
    }

    /**
     * @param $name
     * @param $value
     * @return $this
     */
    public function __set($name, $value)
    {
        return $this->set($name, $value);
    }

    /**
     * @param $name
     * @return mixed
     */
    public function __get($name)
    {
        return $this->offsetGet($name);
    }

    /**
     * @param $name
     * @return bool
     */
    public function __isset($name)
    {
        return $this->offsetExists($name);
    }

    /**
     * @param $name
     * @return $this
     */
    public function __unset($name)
    {
        return $this->offsetUnset($name);
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->toString();
    }

    /**
     *
     * Обработка методов вроде get<PropertyName>
     *
     * @param $name
     * @param $params
     * @throws Exception
     */
    public function __call($name, $params)
    {
        //get<PropertyName>?
        if(preg_match('/get([A-Z]{1})(\w*)/', $name, $matches))
        {
            //составляем имя свойства
            $property = strtolower($matches[1]);
            if(isset($matches[2]))
            {
                $property .= preg_replace('([A-Z]{1})', "_$0", $matches[2]);
            }

            $property = strtolower($property);

            if(!array_key_exists($property, $this->_data))
            {
                throw new Exception(__METHOD__ . "() :: Property '{$property}' is undefined. ");
            }
        }
        else
        {
            throw new Exception(__METHOD__ . "() :: Call of undefined method: {$name}().");
        }
    }


}