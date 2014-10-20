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
 * Class Sx
 * @package skeeks\helpers
 */
class App
{
    /**
     * @var null
     */
    static protected $_instance = null;

    /**
     * @return static
     */
    static public function getInstance()
    {
        if (is_null(self::$_instance))
        {
            self::$_instance = new static();
        }

        return self::$_instance;
    }

    protected function __construct()
    {}


    /**
     * @var Cx_Entity_IdentityMap
     */
    protected $_entityMap = null;
    /**
     * @return Cx_Entity_IdentityMap
     */
    public function getEntityMap()
    {
        if (null === $this->_entityMap)
        {
            $this->_entityMap = new Cx_Entity_IdentityMap();
        }

        return $this->_entityMap;
    }
}