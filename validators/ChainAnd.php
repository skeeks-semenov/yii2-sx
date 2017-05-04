<?php
/**
 * ChainAnd
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 07.11.2014
 * @since 1.0.0
 */
namespace skeeks\sx\validators;
use skeeks\sx\validate\Result;

/**
 * Цепочка валидаторов с условием "И"
 *
 * @since  1.0
 * @author Semenov Alexander <semenov@skeeks.com>
 *
 * @deprecated
 */
class ChainAnd
    extends Chain
{
    /**
     * Проверка валидности значения
     *
     * @param  mixed $value
     * @return Result
     */
    function validate($value)
    {
        $result = new Result(true);

        foreach ($this->_validators as $validator)
        {
            /**
             * @var IValidator $validator
             */
            $result->mergeWithResult($validator->validate($value));
        }

        return $result;
    }
}