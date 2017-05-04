<?php
/**
 * Абстрактная цепочка валидаторов
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 07.11.2014
 * @since 1.0.0
 * @deprecated
 */
namespace skeeks\sx\validators;
use skeeks\sx\validate\Exception;

/**
 * Абстрактная цепочка валидаторов
 *
 * @since  1.0
 * @author Semenov Alexander <semenov@skeeks.com>
 */
abstract class Chain
    extends Validator
{
    /**
     * @var array
     */
    protected $_validators = array();

    /**
     * @param array $validators
     * @throws Exception
     */
    public function __construct(array $validators)
    {
        foreach($validators as $validator)
        {
            if(!($validator instanceof IValidator))
            {
                throw new Exception("Array of objects of class Ix_Validator was expected.");
            }
        }

        $this->_validators = $validators;
    }
}