<?php
/**
 * Version
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 29.10.2014
 * @since 1.0.0
 */

namespace skeeks\sx;
use yii\base\InvalidParamException;
/**
 * Class Version
 * @package skeeks\sx
 */
class Version
{
    /**
     * @var string
     */
    protected $_version = null;

    /**
     * @var string
     */
    protected $_major = null;

    /**
     * @var string
     */
    protected $_minor = null;

    /**
     * @var string
     */
    protected $_maintenance = null;

    /**
     * @param $version
     * @return static
     */
    static public function getInstance($version)
    {
        if ($version instanceof static)
        {
            return $version;
        } else if (is_string($version))
        {
            return new static($version);
        } else
        {
            throw new InvalidParamException("'{$version}' is invalid version name.");
        }
    }

    /**
     * @param $version
     */
    public function __construct($version)
    {
        if (!is_string($version))
        {
            throw new InvalidParamException('$version should be a string.');
        }

        $version = trim($version);

        if (!preg_match('/^(?P<major>\d+)\.(?P<minor>\d+)\.(?P<maintenance>\w+)$/i', $version, $matches))
        {
            throw new InvalidParamException("'{$version}' is invalid version name.");
        }

        $this->_version         = $version;
        $this->_major           = $matches['major'];
        $this->_minor           = $matches['minor'];
        $this->_maintenance     = $matches['maintenance'];
    }

    /**
     * @return string
     */
    public function getMajorVersion()
    {
        return $this->_major;
    }

    /**
     * @return string
     */
    public function getMinorVersion()
    {
        return $this->_minor;
    }

    /**
     * @return string
     */
    public function getMaintenanceVersion()
    {
        return $this->_maintenance;
    }



    /**
     * @param  string|Version $other
     * @return bool
     */
    public function isSame($other)
    {
        return $this->_version === (string) $other;
    }

    /**
     * @param  string|Version $other
     * @return bool
     */
    public function isHigher($other)
    {
        return version_compare((string) $this, (string) $other) > 0;
    }

    /**
     * @param  Version $other
     * @return bool
     */
    public function isLower(Version $other)
    {
        if ($this->_major === $other->_major)
        {
            return $this->_minor < $other->_minor;
        }

        return $this->_major < $other->_major;
    }

    /**
     * @param  Version $other
     * @return bool
     */
    public function isHigherOrSame(Version $other)
    {
        return ($this->isSame($other) || $this->isHigher($other)) ? true : false;
    }

    /**
     * @param  Version $other
     * @return bool
     */
    public function isLowerOrSame(Version $other)
    {
        return ($this->isSame($other) || $this->isLower($other)) ? true : false;
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->_version;
    }
}