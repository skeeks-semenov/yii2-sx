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
use yii\base\Exception;

use yii\helpers\FileHelper;
/**
 * Class File
 * @package skeeks\sx
 *
 * @deprecated
 */
class File
{
    use traits\Entity;

    /**
     * @param $file
     * @return static
     */
    static public function object($file = null)
    {
        if ($file instanceof static)
        {
            return $file;
        } else
        {
            return new static($file);
        }
    }


    /**
     *
     * Создание нового объекта файла
     *
     * @param $filePath
     * @param array $options
     */
    public function __construct($filePath, $options = [])
    {
        if (is_string($filePath))
        {
            $this->_parse($filePath);
        } else if ($filePath instanceof static)
        {
            $this->_data    = $filePath->toArray();
            $this->_options = $filePath->getOptions();
        }

        $this->setOptions(array_merge([
            //"isHaveExtension"       => true, //У файла есть или нет расширения
            "rewrite"               => true, //Разрешено перезаписывать файл если он уже существует
            "autoCreateDir"         => true, //Разрешено создавать дирректорию если ее нет
        ]), $options);

        $this->_init();
    }

    /**
     *
     * base нейм не нужно, будем собирать динамически сами.
     *
     * @return $this
     */
    private function _init()
    {
        //$this->setDirName($this->getDirName());

        if ($this->offsetExists("basename"))
        {
            unset($this->_data["basename"]);
        }

        return $this;
    }

    /**
     *
     * Парсинг пути к файлу на составляющие
     *
     * @param $filePath
     * @return $this
     */
    private function _parse($filePath)
    {
        $this->_data = self::mb_pathinfo($filePath);
        return $this;
    }


    public static function mb_pathinfo($path, $options = null)
    {
        $ret = array('dirname' => '', 'basename' => '', 'extension' => '', 'filename' => '');
        $pathinfo = array();
        if (preg_match('%^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$%im', $path, $pathinfo)) {
            if (array_key_exists(1, $pathinfo)) {
                $ret['dirname'] = $pathinfo[1];
            }
            if (array_key_exists(2, $pathinfo)) {
                $ret['basename'] = $pathinfo[2];
            }
            if (array_key_exists(5, $pathinfo)) {
                $ret['extension'] = $pathinfo[5];
            }
            if (array_key_exists(3, $pathinfo)) {
                $ret['filename'] = $pathinfo[3];
            }
        }
        switch ($options) {
            case PATHINFO_DIRNAME:
            case 'dirname':
                return $ret['dirname'];
            case PATHINFO_BASENAME:
            case 'basename':
                return $ret['basename'];
            case PATHINFO_EXTENSION:
            case 'extension':
                return $ret['extension'];
            case PATHINFO_FILENAME:
            case 'filename':
                return $ret['filename'];
            default:
                return $ret;
        }
    }


        /**
         * Управление основными данными фалйла
         */

    /**
     * @return string
     */
    public function getDirName()
    {
        return (string) $this->get("dirname");
    }

    /**
     * @return string
     */
    public function getFileName()
    {
        return (string) $this->get("filename");
    }

    /**
     * @return string
     */
    public function getBaseName()
    {
        return (string) $this->getExtension() ? $this->getFileName() . "." . $this->getExtension() : $this->getFileName();
    }

    /**
     * @return string
     */
    public function getExtension()
    {
        return (string) $this->get("extension");
    }

    /**
     * @return string
     * @throws \yii\base\InvalidConfigException
     */
    public function getMimeType()
    {
        return FileHelper::getMimeType($this->getPath());
    }

    /**
     * Тип файла - первая часть mime_type
     * @return string
     */
    public function getType()
    {

        $dataMimeType = explode('/', $this->getMimeType());
        return (string) $dataMimeType[0];
    }

    /**
     * @param $value
     * @return $this
     * @throws Exception
     */
    public function setDirName($value)
    {
        return $this->set("dirname", (string) realpath($value));
    }

    /**
     * @param string $value
     * @return $this
     * @throws Exception
     */
    public function setFileName($value)
    {
        return $this->set("filename", (string) $value);
    }

    /**
     * @param string $value
     * @return $this
     * @throws Exception
     */
    public function setExtension($value)
    {
        return $this->set("extension", (string) $value);
    }

    /**
     * @return bool
     */
    public function isHaveExtension()
    {
        return (bool) $this->get("extension");
    }








        /**
         * Включение отключение изменение опций файла
         */


    /**
     *
     * Включить перезапись файла
     *
     * @return $this
     */
    public function enableRewrite()
    {
        $this->setOption("rewrite", true);
        return $this;
    }

    /**
     *
     * Отключить перезапись файла, если такой уже существует.
     *
     * @return $this
     */
    public function disableRewrite()
    {
        $this->setOption("rewrite", false);
        return $this;
    }


    /**
     *
     * Включить автоматическое создание папки.
     *
     * @return $this
     */
    public function enableAutoCreateDir()
    {
        $this->setOption("autoCreateDir", true);
        return $this;
    }

    /**
     *
     * Отключить автоматическое создание папки.
     *
     * @return $this
     */
    public function disableAutoCreateDir()
    {
        $this->setOption("autoCreateDir", false);
        return $this;
    }





        /**
         * Полежные дополнительные функции
         */


    /**
     * Файл существует?
     * @return bool
     */
    public function isExist()
    {
        return file_exists($this->getPath());
    }


    /**
     * @return FileSize
     */
    public function getSize()
    {
        if ($this->isExist())
        {
            return FileSize::object(filesize($this->getPath()));
        }

        return FileSize::object(0);
    }

    /**
     * @return FileSize
     */
    public function size()
    {
        return $this->getSize();
    }



    /**
     * Можно прочитать файл?
     * @return bool
     */
    public function isReadable()
    {
        return is_readable($this->getPath());
    }


    /**
     * @throws Exception
     */
    public function read()
    {
        if (!$this->isExist())
        {
            throw new Exception("file: ({$this->getPath()}) is not exist");
        }

        if (!$this->isReadable())
        {
            throw new Exception("file: ({$this->getPath()}) cannot be read");
        }

        $fp = fopen ($this->getPath(), 'a+');
        if ($fp)
        {
            $size = $this->getSize();
            $content = fread ( $fp, $size->getBytes() );
            fclose ( $fp );
            return (string) $content;

        } else
        {
            throw new Exception("file: ({$this->getPath()}) is not exist");
        }
    }

    /**
     * @return bool
     * @throws Exception
     */
    public function unlink()
    {
        if (!$this->isExist())
        {
            throw new Exception("file: ({$this->getPath()}) is not exist");
        }

        return unlink($this->getPath());
    }

    /**
     * @return bool
     * @throws Exception
     */
    public function remove()
    {
        return $this->unlink();
    }


    /**
     * @param string $content
     * @param string $recordingMode
     * @return $this
     */
    public function write($content = "", $recordingMode = "w")
    {
        $this->checkAndCreateDir();

        $file = fopen($this->getPath(), $recordingMode);
        fwrite($file, $content);
        fclose($file);

        return $this;
    }

    /**
     * @param string $content
     * @param string $recordingMode
     * @return File
     */
    public function make($content = "", $recordingMode = "w")
    {
        return $this->write($content, $recordingMode);
    }


























    /**
     * @param $newFileNameWhithoutExtension
     * @return $this
     */
    public function rename($newFileNameWhithoutExtension)
    {
        $name = $this->getName();

        if (!$extension = $this->getExtension())
        {
            return $this->setBaseName($newFileNameWhithoutExtension);
        } else
        {
            return $this->setBaseName($newFileNameWhithoutExtension . "." . $extension);
        }
    }





    /**
     * Полный адрес к файлу с расширением и со всем.
     * @return string
     */
    public function getPath()
    {
        return $this->getDirName() . "/" . $this->getBaseName();
    }

    /**
     * @return Dir
     */
    public function getDir()
    {
        return Dir::object((string) $this->getDirName());
    }




    public function checkAndCreateDir()
    {
        $dir = $this->getDir();

        if ($this->isExist() && !$this->getOption("rewrite"))
        {
            throw new Exception("file {$dir} exists and option '_rewrite' === false");
        }

        //Проверяем наличие дирриктории, в зависимости от опций создаем ее
        if (!$dir->isExist() && !$this->getOption("autoCreateDir"))
        {
            throw new Exception("dir {$dir} not exists and option '_autoCreateDir' === false");
        } else if (!$dir->isExist() && $this->getOption("autoCreateDir"))
        {
            $dir->make();
        }


        if (!$dir->isExist())
        {
            throw new Exception("dir {$dir} not exists");
        }

        return $this;
    }


    /**
     * @param $newFile
     * @return File
     * @throws Exception
     */
    public function copy($newFile)
    {
        $newFile = static::object($newFile);

        $newFile->checkAndCreateDir();

        if (!copy((string) $this->getPath(), (string) $newFile->getPath()))
        {
            throw new Exception("not copy file: " . $this->getPath() . " into: " . $newFile->getPath());
        }

        return $newFile;
    }

    /**
     * @param $newRootPathFle
     * @return File
     * @throws Exception
     */
    public function move($newRootPathFle)
    {
        $newFile = static::object($newRootPathFle);
        $newFile->checkAndCreateDir();

        if (!rename((string) $this->getPath(), (string) $newFile->getPath()))
        {
            throw new Exception("not move file: " . $this->getPath() . " into: " . $newFile->getPath());
        }

        //Это не правильно! Все зависает на файлах более 10 гб
        /*$newFile = $this->copy($newRootPathFle);
        $this->unlink();*/

        return $newFile;
    }

    /**
     * @return string
     */
    public function toString()
    {
        return $this->getPath();
    }






    /**
     *
     * Получить имя файла из списка, который первый даст file_exists
     * Можно передавать сколько угодно файлов
     *
     * @param $file1
     * @return null|File
     */
    static public function getFirstExistingFile($file1 /*...*/)
    {
        $files = func_get_args();
        foreach ($files as $file)
        {
            if (file_exists($file))
            {
                return new self($file);
            }
        }

        return null;
    }

    /**
     * @param array $files
     * @return null|File
     */
    static public function getFirstExistingFileArray($files = array())
    {
        foreach ($files as $file)
        {
            if (file_exists($file))
            {
                return new self($file);
            }
        }

        return null;
    }







    /**
     * @var array
     */
    protected $_options = [];

    /**
     * @param $name
     * @param null $default
     * @return null
     */
    public function getOption($name, $default = null)
    {
        return $this->hasOption($name) ? $this->_options[$name] : $default;
    }

    /**
     * @return array
     */
    public function getOptions()
    {
        return $this->_options;
    }

    /**
     * @param  string $name
     * @return bool
     */
    public function hasOption($name)
    {
        return array_key_exists($name, $this->_options);
    }






    /**
     * @param array $options
     * @return $this
     */
    public function setOptions(array $options)
    {
        $this->_options = $options;
        return $this;
    }

    /**
     * @param  string $name
     * @param  mixed  $value
     * @return $this
     */
    public function setOption($name, $value)
    {
        $this->_options[$name] = $value;
        return $this;
    }

    /**
     * @param array $options
     * @return $this
     */
    public function setDefaultOptions($options = [])
    {
        $this->_options = array_merge($options, $this->_options);
        return $this;
    }
}