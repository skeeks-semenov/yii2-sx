<?php
// Run with a consuming application's vendor/autoload.php as the first argument.
$autoload = $argv[1] ?? dirname(__DIR__, 3) . '/autoload.php';
require $autoload;
require_once dirname($autoload) . '/yiisoft/yii2/Yii.php';

$runtime = sys_get_temp_dir() . '/sx-underscore-smoke-' . getmypid();
mkdir($runtime, 0700, true);
new yii\web\Application([
    'id' => 'sx-underscore-smoke',
    'basePath' => $runtime,
    'runtimePath' => $runtime,
    'aliases' => ['@npm' => dirname($autoload) . '/npm-asset'],
    'components' => [
        'assetManager' => ['basePath' => $runtime, 'baseUrl' => '/assets'],
        'request' => ['cookieValidationKey' => 'smoke-only'],
    ],
]);
$bundle = skeeks\sx\assets\Undescore::register(Yii::$app->view);
$bundle->registerAssetFiles(Yii::$app->view);
$file = $bundle->basePath . '/' . $bundle->js[0];
if (!is_file($file) || filesize($file) < 1000) {
    throw new RuntimeException('Published Underscore browser file is missing.');
}
$html = implode("\n", Yii::$app->view->jsFiles[yii\web\View::POS_END] ?? []);
if (strpos($html, '/underscore-min.js') === false) {
    throw new RuntimeException('The browser script was not registered.');
}
echo "PASS: real npm browser file published and registered: " . basename($file) . "\n";
