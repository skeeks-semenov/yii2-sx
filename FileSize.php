<?php
/**
 * File
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 22.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx;
use \skeeks\sx\Exception;


/**
 * Class FileSize
 * @package skeeks\sx
 */
class FileSize
{
    use traits\Entity;
    use traits\InstanceObject;

    public function __construct($sizeBytes = 0)
    {
        $this->_data["bytes"] = (float) $sizeBytes;
    }

    /**
     * Размер в байтах
     * @return float
     */
    public function getBytes()
    {
        return (float) $this->get("bytes", 0);
    }

    /**
     * @param null $decimals
     * @param array $options
     * @param array $textOptions
     * @return string
     */
    public function formatedShortSize($decimals = null, $options = [], $textOptions = [])
    {
        return \Yii::$app->getFormatter()->asShortSize($this->getBytes(), $decimals, $options, $textOptions);
    }

    /**
     * @param null $decimals
     * @param array $options
     * @param array $textOptions
     * @return string
     */
    public function formatedSize($decimals = null, $options = [], $textOptions = [])
    {
        return \Yii::$app->getFormatter()->asSize($this->getBytes(), $decimals, $options, $textOptions);
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->toString();
    }

    /**
     * @return string
     */
    public function toString()
    {
        return $this->formatedShortSize();
    }
}