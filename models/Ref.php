<?php
/**
 * Ref
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\models;
/**
 * Class Ref
 * @package skeeks\sx\model
 */
class Ref
{
    protected $_className           = null;
    protected $_pkValue             = null;
    /**
     * @param string|Ref $refOrSpec
     */
    public function __construct($refOrSpec)
    {
        if ($refOrSpec instanceof Ref)
        {
            $refOrSpec = $refOrSpec->getSpec();
        }

        $this->_parse($refOrSpec);
    }

    /**
     * @param  string $spec
     * @throws Cx_Exception
     */
    protected function _parse($spec)
    {
        $spec = trim($spec);
        if (preg_match('/^(?P<className>[a-zA-Z0-9\_\\\]+)\.(?P<val>[a-z0-9\_-]+)$/i', $spec, $matches))
        {
            $this->_className   = $matches["className"];
            $this->_pkValue     = $matches["val"];
        }
        else
        {
            throw new Cx_ExceptionSxEntity("Invalid ref spec '$spec'.");
        }
    }


    /**
     * @return string
     */
    public function getSpec()
    {
        return (string) $this->getClassName() . "." . $this->getValue();
    }

    /**
     * @return string
     */
    public function getClassName()
    {
        return (string)$this->_className;

    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->_pkValue;
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getSpec();
    }
}