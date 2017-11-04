<?php
/**
 * ResultComposite
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 07.11.2014
 * @since 1.0.0
 */

namespace skeeks\sx\validate;
/**
 * Class ResultComposite
 * @package skeeks\sx\validate
 *
 * @deprecated
 */
class ResultComposite
    implements IResult
{
    /**
     * @var array
     */
    protected $_results = array();

    /**
     * @return static
     */
    static public function create()
    {
        return new static();
    }

    /**
     * @param string $key
     * @param Result $result
     * @return $this
     * @throws Exception
     */
    public function setResultByKey($key, Result $result)
    {
        //TODO: is this really ok?
        if (array_key_exists($key, $this->_results))
        {
            throw new Exception("Result for key '$key' has been already added.'");
        }

        $this->_results[$key] = $result;

        return $this;
    }

    /**
     * @param  string $key
     * @return Result|null
     */
    public function getResultByKey($key)
    {
        return array_key_exists($key, $this->_results, true) ? $this->_results[$key] : null;
    }

    /**
     * @return array
     */
    public function getResults()
    {
        return $this->_results;
    }

    /**
     * @return bool
     */
    function isValid()
    {
        foreach ($this->_results as $result)
        {
            /**
             * @var IResult $result
             */
            if (!$result->isValid())
            {
                return false;
            }
        }

        return true;
    }

    /**
     * @return array
     */
    public function getErrorMessages()
    {
        $messages = array();

        foreach ($this->_results as $result)
        {
            /**
             * @var IResult $result
             */
            $messages = array_merge($messages, $result->getErrorMessages());
        }

        return $messages;
    }

    /**
     * @param  string $key
     * @return array
     */
    public function getErrorMessagesByKey($key)
    {
        $result = $this->getResultByKey($key);
        return $result ? $result->getErrorMessages() : array();
    }

    /**
     * @param ResultComposite $result
     * @return $this
     * @throws Exception
     */
    public function mergeWithCompositeResult(ResultComposite $result)
    {
        throw new Exception("Еще не релизовано");
        return $this;
    }

    /**
     * @param $key
     * @param Result $result
     * @return $this
     * @throws Exception
     */
    public function mergeWithResultByKey($key, Result $result)
    {
        throw new Exception("Еще не релизовано");
        return $this;
    }
}