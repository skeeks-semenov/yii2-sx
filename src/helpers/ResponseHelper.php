<?php
/**
 * @author Semenov Alexander <semenov@skeeks.com>
 * @link https://skeeks.com/
 * @copyright (c) 2010 SkeekS
 * @date 04.05.2017
 */
namespace skeeks\sx\helpers;

use yii\base\Component;
use yii\helpers\Json;
use yii\web\Response;
use yii\widgets\ActiveForm;

/**
 * @property bool isRequestPjaxPost
 * @property bool isRequestAjaxPost
 *
 * Class BackendResponseHelper
 *
 * @package skeeks\sx\helpers
 *
 * @deprecated
 *
 */
class ResponseHelper extends Component
{
    /**
     * @var bool
     */
    public $success = false;

    /**
     * @var string
     */
    public $message = '';

    /**
     * @var array
     */
    public $data    = [];

    /**
     * @var null
     */
    public $redirect = null;

    /**
     *
     */
    public function init()
    {
        parent::init();

        if (isset(\Yii::$app->request) && \Yii::$app->request->isAjax)
        {
            \Yii::$app->response->format = Response::FORMAT_JSON;
        }
    }


    /**
     * @return bool
     */
    public function getIsRequestAjaxPost()
    {
        if (\Yii::$app->request->isAjax && \Yii::$app->request->isPost)
        {
            return true;
        }

        return false;
    }

    /**
     * @return bool
     */
    public function getIsRequestPjaxPost()
    {
        if (\Yii::$app->request->isPjax && \Yii::$app->request->isPost)
        {
            return true;
        }

        return false;
    }

    /**
     * @param Model $model
     * @return array
     */
    public function ajaxValidateForm($model)
    {
        $model->load(\Yii::$app->request->post());
        return ActiveForm::validate($model);
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) Json::encode($this->toArray());
    }
}