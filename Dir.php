<?php
/**
 * Dir
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
 * Class File
 * @package skeeks\sx
 */
class Dir
{
    use traits\Entity;
    use traits\InstanceObject;

    /**
     * @param bool $autoOpen
     * @return Dir
     */
    static public function runtimeTmp($autoOpen = true)
    {
        return new static(\Yii::getAlias("@app/runtime/tmp-skeeks"), $autoOpen);
    }
    /**
     * @param string|Dir $dirPath путь к папке
     * @param bool $autoOpen автоматически создавать папку при создании объекта
     * @throws Exception
     */
    public function __construct($dirPath, $autoOpen = true)
    {
        if (is_string($dirPath))
        {
            $this->_data["dirpath"] = realpath($dirPath) ? realpath($dirPath) : $dirPath;
        } else if ($dirPath instanceof static)
        {
            $this->_data    = $dirPath->toArray();
        } else
        {
            throw new Exception("incorrect data");
        }

        if ($autoOpen)
        {
            $this->make(0777, true);
        }
    }


    /**
     * @param $baseFileName
     * @return File
     */
    public function newFile($baseFileName = null)
    {
        if (!$baseFileName)
        {
            $baseFileName = md5(microtime() . rand(0,100));
        }
        return new File($this->getPath() . "/" . $baseFileName);
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return (string) $this->get("dirpath");
    }

    /**
     * Файл существует?
     * @return bool
     */
    public function isExist()
    {
        return is_dir($this->getPath());
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
     * Изменяет режим доступа к файлу или каталогу
     * Осуществляет попытку изменения режима доступа файла или каталога, переданного в параметре filename на режим, переданный в параметре mode.
     * Обратите внимание, что значение параметра mode не переводится автоматически в восьмеричную систему счисления, поэтому строки (такие, как, например, "g+w") не будут работать должным образом. Чтобы удостовериться в том, что режим был установлен верно, предваряйте значение, передаваемое в параметре mode, нулем (0):
     *
     * @param int $mode
     * @return bool
     */
    public function setChmod($mode = 0777)
    {
        return chmod($this->getPath(), $mode);
    }

    /**
     * @return resource
     * @throws Exception
     */
    public function open()
    {
        if (!$this->isExist())
        {
            throw new Exception("dir {$this->getPath()} not exist");
        }

        return opendir($this->getPath());
    }

    /**
     * @param int $mode
     * @param bool $recursive
     * @return bool
     */
    public function make($mode = 0777, $recursive = true)
    {
        //Если дирректории нет то тогда создаем рекурсивно
        if (!$this->isExist())
        {
            return mkdir($this->getPath(), $mode, $recursive);
        }

        return true;
    }

    /**
     * @return bool
     */
    public function remove()
    {
        if (PHP_OS === 'Windows')
        {
            exec("rd /s /q {$this->getPath()}");
        }
        else
        {
            exec("rm -rf {$this->getPath()}");
        }

        return ! (bool) $this->isExist();
    }

    /**
     * @return $this
     */
    public function clear()
    {
        if (PHP_OS === 'Windows')
        {
            exec("rd /s /q {$this->getPath()}/*");
        }
        else
        {
            exec("rm -rf {$this->getPath()}/*");
        }

        return $this;
    }

    /**
     * @return array<Dir>
     */
    public function findDirs()
    {
        $dir = $this->getPath();
        $files = array();

        if ( $dir [ strlen( $dir ) - 1 ] != '/' )
        {
            $dir .= '/'; //добавляем слеш в конец если его нет
        }

        $nDir = opendir( $dir );

        while ( false !== ( $file = readdir( $nDir ) ) )
        {
            if (!is_dir($dir . "/" .  $file))
            {
                continue;
            }


            if ($file != "." AND $file != ".."  )
            {
                //если это не директория
                $files [] = Dir::object($dir . $file);
            }
        }

        closedir( $nDir );

        return $files;
    }

    /**
     * @return array<File>
     */
    public function findFiles()
    {
        $dir = $this->getPath();

        $files = array();

        if ( $dir [ strlen( $dir ) - 1 ] != '/' )
        {
            $dir .= '/'; //добавляем слеш в конец если его нет
        }

        $nDir = opendir( $dir );

        while ( false !== ( $file = readdir( $nDir ) ) )
        {
            if (!is_file($dir . "/" .  $file))
            {
                continue;
            }

            if ( $file != "." AND $file != ".." )
            {
                //если это не директория
                $files [] = File::object($dir . "/" .  $file);
            }
        }

        closedir( $nDir );

        return $files;
    }



    /**
     * @return FileSize
     */
    public function getSize()
    {
        if ($this->isExist())
        {
            $dir = $this->getPath();

            $totalsize=0;
            if ($dirstream = @opendir($dir)) {
                while (false !== ($filename = readdir($dirstream)))
                {
                    if ($filename!="." && $filename!="..")
                    {
                        if (is_file($dir."/".$filename))
                        {
                            $totalsize+=filesize($dir."/".$filename);
                        }

                        if (is_dir($dir."/".$filename))
                        {
                            $subdir = new self($dir."/".$filename);
                            $totalsize+= $subdir->getSize()->getBytes();
                        }
                    }
                }
            }
            closedir($dirstream);

            return FileSize::object($totalsize);
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
}