<?php
/**
 * Validator
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
 * Class Validator
 * @package skeeks\sx\validators
 */
abstract class Validator
    implements IValidator
{
    /**
     * @return Result
     */
    protected function _ok()
    {
        return new Result(true);
    }

    /**
     * TODO: make a better name
     *
     * @param  mixed|null $message
     * @return Result
     */
    protected function _bad($message = null)
    {
        $result = new Result(false);

        if ($message)
        {
            $result->addErrorMessage($message);
        }

        return $result;
    }
}