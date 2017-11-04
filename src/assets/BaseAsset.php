<?php
/**
 * BaseAsset
 *
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link http://skeeks.com/
 * @copyright 2010-2014 SkeekS (Sx)
 * @date 24.01.2015
 * @since 1.0.0
 */
namespace skeeks\sx\assets;
use skeeks\sx\File;
use yii\web\AssetBundle;

/**
 * Class BaseAsset
 * @package skeeks\sx\assets
 */
abstract class BaseAsset extends AssetBundle
{
    public $sourcePath = '@skeeks/sx/assets';
    public $css = [];
    public $js = [];
    public $depends = [];

    /*public function init()
    {
        parent::init();

        $this->js = (array) $this->js;
        if (count($this->js) <= 1)
        {
            return;
        }

        $fileName = 'yii2-sx-' . md5($this->className()) . ".js";
        $fileMinJs = \Yii::getAlias('@app/runtime/assets/js/' . $fileName);

        if (file_exists($fileMinJs))
        {
            $this->js = [
                $fileName
            ];

            $this->sourcePath = '@app/runtime/assets/js';

            return;
        }

        $fileContent = "";
        foreach ($this->js as $js)
        {
            $fileContent .= file_get_contents($this->sourcePath . '/' . $js);
        }

        if ($fileContent)
        {
            $file = new File($fileMinJs);
            $file->make($fileContent);
        }
    }*/

    /**
     * @param string $asset
     * @return string
     * @throws \yii\base\InvalidConfigException
     */
    static public function getAssetUrl($asset)
    {
        return \Yii::$app->assetManager->getAssetUrl(\Yii::$app->assetManager->getBundle(static::className()), $asset);
    }
}