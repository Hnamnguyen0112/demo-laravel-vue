<?php


namespace App\Common\Requests;


use Illuminate\Foundation\Http\FormRequest;

class DataTableRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sort_type' => 'in:desc,asc',
            'paging' => 'boolean',
        ];
    }
}
