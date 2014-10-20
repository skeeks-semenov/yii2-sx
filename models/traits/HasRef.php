<?php
/**
 * HasRef
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\models\traits;

use skeeks\sx\models\Ref;
use skeeks\sx\Exception;

/**
 * Class Tx_HasRef
 * @package skeeks\sx\models
 */
trait HasRef
{
    /**
     * Объект ссылка
     * @return Ref
     * @throws Exception
     */
    public function getRef()
    {
        if ($this->primaryKey)
        {
            $spec = $this->className() . '__' . $this->primaryKey;
            return new Ref($spec);
        }

        throw new Exception("Can't get a ref of the entity that is not saved yet.");
    }

    /**
     * Ссылка есть?
     * @return bool
     */
    public function hasRef()
    {
        return $this->primaryKey ? true : false;
    }

    /**
     * @param $pkValue
     * @return Ref
     */
    static public function getRefByPk($pkValue)
    {
        $spec = static::className() . '__' . $pkValue;
        return new Ref($spec);
    }
}