<?php
/**
 * IsString
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 07.11.2014
 * @since 1.0.0
 */
namespace skeeks\sx\validators\is;

use skeeks\sx\validate\Result;
use skeeks\sx\validators\Validator;

/**
 * Class IsString
 * @package skeeks\sx\validators\string
 */
class IsString
    extends Validator
{
    /**
     * Проверка валидности значения
     *
     * @param  mixed $value
     * @return Result
     */
    public function validate($value)
    {
        return !is_string($value) ? $this->_bad("Значение должно быть строкой")
                                  : $this->_ok();
    }
}