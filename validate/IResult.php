<?php
/**
 * IResult
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 07.11.2014
 * @since 1.0.0
 */
namespace skeeks\sx\validate;

/**
 * Interface IResult
 * @package skeeks\sx\validate
 */
interface IResult
{
    /**
     * @return bool
     */
    function isValid();

    /**
     * @return array
     */
    function getErrorMessages();
}