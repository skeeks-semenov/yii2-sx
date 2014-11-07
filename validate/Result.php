<?php
/**
 * Result
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 07.11.2014
 * @since 1.0.0
 */

namespace skeeks\sx\validate;
/**
 * Class Result
 * @package skeeks\sx\validators
 */
class Result
    implements IResult
{
    /**
     * @var bool|null
     */
    protected $_isValid = null;

    /**
     * @var array Set of error messages
     */
    protected $_errorMessages = array();

    /**
     * @param bool $isValid Is it initially valid?
     */
    public function __construct($isValid)
    {
        $this->_isValid = (bool)$isValid;
    }

    /**
     * @static
     * @param  bool $isValid
     * @return Result
     */
    static public function create($isValid)
    {
        return new static($isValid);
    }

    /**
     * @return bool
     */
    public function isValid()
    {
        return $this->_isValid;
    }

    /**
     * @return bool
     */
    public function isInvalid()
    {
        return !$this->_isValid;
    }

    /**
     * @param  bool $isValid
     * @return Result
     */
    public function setValid($isValid = true)
    {
        $this->_isValid = (bool)$isValid;
        return $this;
    }

    /**
     * @return Result
     */
    public function setInvalid()
    {
        $this->_isValid = false;
        return $this;
    }

    /**
     * @param  string $message
     * @return Result
     */
    public function addErrorMessage($message)
    {
        //@TODO: cx_match_assert is_stringable
        $this->_errorMessages[] = $message;
        return $this;
    }

    /**
     *
     * Получить все ошибки
     *
     * @return array
     */
    public function getErrorMessages()
    {
        return $this->_errorMessages;
    }

    /**
     *
     * Получить первую попавшиеюся ошибку
     *
     * @return mixed
     */
    public function getErrorMessage()
    {
        return array_shift($this->_errorMessages);
    }

    /**
     * @param  Result $result
     * @return $this
     */
    public function mergeWithResult(Result $result)
    {
        if ($this->_isValid && !$result->isValid())
        {
            $this->_isValid = false;
        }

        $this->_errorMessages = array_merge($this->_errorMessages,  $result->getErrorMessages());

        return $this;
    }

    /**
     * @return bool
     */
    public function toBool()
    {
        return $this->_isValid;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->_isValid ? 'validate_result<true>' : 'validate_result<false>[' . join(', ', $this->_errorMessages) . ']';
    }
}