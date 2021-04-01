<?php


namespace App\Common\Controllers\Traits;


use App\Common\Requests\DataTableRequest;

trait HasCrudActions
{
    public function index(DataTableRequest $request)
    {

    }

    public function store()
    {

    }

    public function show($id)
    {

    }

    public function update($id)
    {

    }

    public function destroy($id)
    {

    }

    protected function getRequest()
    {
        if (!isset($this->validation)) {
            return request();
        }

        return resolve($this->validation);
    }

    protected function checkRepository($repository)
    {
        if (!isset($repository) || $repository == null) {
            throw new \Exception(trans('actions.repository_not_exists'));
        }
    }
}
