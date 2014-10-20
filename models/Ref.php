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

use skeeks\sx\Exception;

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
     * @param $spec
     * @throws Exception
     */
    protected function _parse($spec)
    {
        $spec = trim($spec);
        if (preg_match('/^(?P<className>[a-zA-Z0-9\_\\\]+)\_\_(?P<val>[a-z0-9\_-]+)$/i', $spec, $matches))
        {
            $this->_className   = $matches["className"];
            $this->_pkValue     = $matches["val"];
        }
        else
        {
            throw new Exception("Invalid ref spec '$spec'.");
        }
    }

    /**
     * @return array|null|\yii\db\ActiveRecord
     */
    public function findModel()
    {
        /**
         * @var \yii\db\ActiveRecord $className
         */
        $className = $this->_className;
        $find = $className::find()->where([$className::primaryKey()[0] => $this->_pkValue]);
        return $find->one();
    }

    /**
     * @return string
     */
    public function getSpec()
    {
        return (string) $this->getClassName() . "__" . $this->getValue();
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


