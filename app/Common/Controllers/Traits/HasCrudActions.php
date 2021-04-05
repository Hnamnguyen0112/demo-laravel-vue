<?php


namespace App\Common\Controllers\Traits;


use App\Common\Requests\DataTableRequest;
use App\Exceptions\CustomException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

trait HasCrudActions
{
    public function index(DataTableRequest $request)
    {
        //paging
    }

    public function store()
    {
        $request = $this->getRequest()
            ->all();
        try {
            DB::beginTransaction();
            $result = $this->repository->create($request);
            DB::commit();
            return $this->response(
                $result,
                Response::HTTP_OK,
                __('common.create_success')
            );
        } catch (\Exception $e) {
            DB::rollBack();
            throw_if(true, new CustomException($e->getMessage()));
        }
    }

    public function show($id)
    {
        $result = $this->repository->find($id);
        return $this->response($result);
    }

    public function update($id)
    {
        $request = $this->getRequest()
            ->all();
        try {
            DB::beginTransaction();
            $this->repository->find($id);
            $result = $this->repository->update($request, $id);
            DB::commit();
            return $this->response(
                $result,
                Response::HTTP_OK,
                __('common.update_success')
            );
        } catch (\Exception $e) {
            DB::rollBack();
            throw_if(true, new CustomException($e->getMessage()));
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $this->checkRepository($this->repository);
            $this->repository->delete($id);
            DB::commit();
            return $this->response(trans('actions.delete_success'));
        } catch (\Exception $e) {
            DB::rollBack();
            throw_if(true, new CustomException($e->getMessage()));
        }
    }

    protected function getRequest()
    {
        if (!isset($this->validation)) {
            return request();
        }

        return resolve($this->validation);
    }
}
