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

use skeeks\sx\Ix_IdentityMap;
use skeeks\sx\Tx_IdentityMap;
/**
 * Class Ref
 * @package skeeks\sx\model
 */
class IdentityMap
    implements Ix_IdentityMap
{
    use Tx_IdentityMap;

    /**
     * @param  mixed $obj
     * @return bool
     */
    public function isValid($obj)
    {
        return $obj instanceof \yii\base\Model;
    }

    /**
     * @param  Cx_Entity_Ref $ref
     * @return Cx_Entity|null
     */
    public function get($ref)
    {
        /**
         * @var Cx_Entity_Ref $ref
         */
        $entity = null;

        if (!$this->isRegistered($ref->getSpec()))
        {
            $class = $ref->getEntityClass();
            $entity =  $class::find($ref->getValue());

            if ($entity)
            {
                $this->register($ref->getSpec(), $entity);
            }
        }
        else
        {
            $entity = $this->_idMap[$ref->getSpec()];
        }

        return $entity;
    }


}