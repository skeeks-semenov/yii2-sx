<?php
/**
 * ActiveRecord
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 20.10.2014
 * @since 1.0.0
 */

namespace skeeks\sx\db;

use \yii\db\ActiveRecord as YiiActiveRecord;
use skeeks\sx\models\traits\HasRef;

/**
 * Class ActiveRecord
 * @package skeeks\sx\db
 */
class ActiveRecord
    extends YiiActiveRecord
{
    //У этого объекта есть ссылка
    use HasRef;
}
