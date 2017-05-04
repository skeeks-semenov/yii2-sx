<?php
/**
 * IValidator
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
 * Interface IValidator
 * @package skeeks\sx\validators
 *
 * @deprecated
 */
interface IValidator
{
    /**
     * Проверка валидности значения
     *
     * @param  mixed $value
     * @return Result
     */
     function validate($value);
}
