<?php
/**
 * ChainOr
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
 * Class ChainOr
 * @package skeeks\sx\validators
 */
class ChainOr
    extends Chain
{
    /**
     * @param  mixed $value
     * @return Result
     */
    public function validate($value)
    {
        $result = new Result(true);

        foreach($this->_validators as $validator)
        {
            /**
             * @var IValidator $validator
             */
            if ($validator->validate($value)->isValid())
            {
                return $this->_ok();
            } else
            {
                $result->mergeWithResult($validator->validate($value));
            }
        }

        $result->setInvalid();
        return $result->addErrorMessage("Должно быть выполнено хотя бы одно условие");
    }



}