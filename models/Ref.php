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
     * @param $className
     * @param $pkValue
     */
    public function __construct($className, $pkValue)
    {
        $this->_className   = $className;
        $this->_pkValue     = $pkValue;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            "linked_to_model" => $this->_className,
            "linked_to_value" => $this->_pkValue,
        ];
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

}


