<?php
/**
 * Генерирует seo_page_name перед insert - ом
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */

namespace skeeks\sx\behaviors;

use skeeks\sx\filters\string\SeoPageName as FilterSeoPageName;

use yii\db\BaseActiveRecord;
use yii\db\Expression;
use yii\behaviors\AttributeBehavior;

/**
 * Class SeoPageName
 * @package skeeks\sx\behaviors
 */
class SeoPageName extends AttributeBehavior
{
    /**
     * @var string the attribute that will receive timestamp value
     * Set this property to false if you do not want to record the creation time.
     */
    public $generatedAttribute = 'seo_page_name';

    /**
     * @var callable|Expression The expression that will be used for generating the timestamp.
     * This can be either an anonymous function that returns the timestamp value,
     * or an [[Expression]] object representing a DB expression (e.g. `new Expression('NOW()')`).
     * If not set, it will use the value of `time()` to set the attributes.
     */
    public $value;

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if (empty($this->attributes))
        {
            $this->attributes =
            [
                BaseActiveRecord::EVENT_BEFORE_INSERT => [$this->generatedAttribute],
            ];
        }
    }

    /**
     * Evaluates the value of the user.
     * The return result of this method will be assigned to the current attribute(s).
     * @param Event $event
     * @return mixed the value of the user.
     */
    protected function getValue($event)
    {
        if ($this->value === null)
        {
            $filter = new FilterSeoPageName();
            return $filter->filter($this->owner->name);
        } else
        {
            return call_user_func($this->value, $event);
        }
    }


}
