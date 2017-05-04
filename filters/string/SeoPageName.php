<?php
/**
 * Translit
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */

namespace skeeks\sx\filters\string;
use skeeks\sx\Filter;
/**
 * Class Cx_Filter_String_Strtoupper
 *
 * @deprecated
 */
class SeoPageName
    extends Filter
{
    public $maxLength = 64;
    /**
     * @param string $value
     * @return string
     */
    public function filter($value)
    {
        $value = trim($value);

        if (strlen($value) < 2)
        {
            $value = $value . "-" . md5(microtime());
        }

        if (strlen($value) > $this->maxLength)
        {
            $value = substr($value, 0, $this->maxLength);
        }

        $filter = new Translit();
        $value = $filter->filter(trim($value));
        $value = strtolower($value);

        $result = [];
        if ($array = explode("-", $value))
        {
            foreach ($array as $node)
            {
                if (trim($node))
                {
                    $result[] = trim($node);
                }
            }
        }
        //Убрать - с начала строки, и с несоклько - из середины
        $value = implode("-", $result);


        //Небольшая рекурсия
        if (strlen($value) < 2 || strlen($value) > $this->maxLength)
        {
            $value = $this->filter($value);
        }

        return $value;
    }
}