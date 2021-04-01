<?php


namespace App\Common\Repositories;


use App\Libraries\Helper;
use Illuminate\Container\Container as Application;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Prettus\Repository\Contracts\CacheableInterface;
use Prettus\Repository\Eloquent\BaseRepository as Repository;
use Prettus\Repository\Traits\CacheableRepository;

abstract class BaseRepository extends Repository implements CacheableInterface
{
    use CacheableRepository;
    public $data;
    public $attributeOriginal;
    public $request;

    public function __construct(Application $app, Request $request)
    {
        parent::__construct($app);
        $this->request = $request;
    }

    abstract public function model();

    public static function getInstance()
    {
        return app(static::class);
    }

    public function getFillable()
    {
        return $this->model->getFillable() ?? [];
    }

    public function find($id, $columns = ['*'])
    {
        try {
            return parent::find(
                $id,
                $columns
            ); // TODO: Change the autogenerated stub
        } catch (ModelNotFoundException $e) {
            throw new \Exception(trans('actions.data_not_found'));
        }
    }

    protected function uploadFile($file)
    {
        return Helper::uploadFileS3($file);
    }
}