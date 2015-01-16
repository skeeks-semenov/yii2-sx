<?php
/**
 * Entity
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 29.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx;
/**
 * Class Entity
 * @package skeeks\sx
 */
class Entity
{
    use traits\Entity;

    public function __construct($data = [])
    {
        $this->_data = $data;
        $this->_init();
    }

    protected function _init()
    {}

    /**
     *
     * Создаёт набор моделей класса указанного класса из массива
     *
     * @param array $array
     * @return array        of   static
     */
    static public function createEntityList(array $array = [])
    {
        $entitys = [];

        foreach($array as $row)
        {
            if (is_array($row))
            {
                $entitys[] = new static($row);
            } else if ($row instanceof static)
            {
                $entitys[] = new static($row->toArray());
            }
        }

        return $entitys;
    }
}