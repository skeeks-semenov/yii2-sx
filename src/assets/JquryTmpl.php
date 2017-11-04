<?php
/**
 * JquryTmpl
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 27.10.2014
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
/**
 * Class JquryTmpl
 * @package skeeks\sx\assets
 */
class JquryTmpl extends BaseAsset
{
    public $css = [];
    public $js = [
        'libs/jquery-plugins/jquery-tmpl/jquery.tmpl.min.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];

    /**
     */
    const DEFAULT_TMPL_TYPE = "text/html";
    /**
     * @var array
     */
    static protected $_jsTemplates = [];

    /**
     * @param $id
     * @param $content
     * @param string $type
     */
    static public function registerJsTemplate($id, $content, $type = self::DEFAULT_TMPL_TYPE)
    {
        self::$_jsTemplates[$id] = [
            "type"      => $type,
            "content"   => $content
        ];
    }


    /**
     * @return string
     */
    static public function render()
    {
        if (self::$_jsTemplates)
        {
            $result = [];

            foreach (self::$_jsTemplates as $id => $data)
            {
                $type       = $data["type"] ? $data["type"] : self::DEFAULT_TMPL_TYPE;
                $content    = $data["content"];

                $result[] = <<<HTML
<script type="{$type}" id="{$id}">
    {$content}
</script>
HTML;

            }

            if ($result)
            {
                return implode("\n", $result);
            }
        }

        return "";
    }

    /**
     *
     */
    static public function endJsTemplates()
    {
        echo "\n" . self::render();
    }
}