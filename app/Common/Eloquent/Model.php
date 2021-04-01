<?php


namespace App\Common\Eloquent;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;

abstract class Model extends Eloquent
{
    use SoftDeletes;

    protected $hidden = [
        'deleted_at'
    ];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($entity) {
            $entity->clearEntityTaggedCache();
        });

        static::deleted(function ($entity) {
            $entity->clearEntityTaggedCache();
        });
    }

    public function clearEntityTaggedCache()
    {
        try {
            Cache::forget($this->getTable().'_'.locale());
        } catch (\Exception $exception) {

        }
    }

    /**
     * Register a new active global scope on the model.
     *
     * @return void
     */
    public static function addActiveGlobalScope()
    {
        static::addGlobalScope('active', function ($query) {
            $query->where('is_active', true);
        });
    }

    public function scopeFindOrCreate($query, $id)
    {
        $obj = $query->find($id);
        return $obj ?: new static;
    }

    public static function getTableName()
    {
        return with(new static)->getTable();
    }

    public function relations()
    {
        return collect($this->with ?? [])
            ->mapWithKeys(function ($relation) {
                return [
                    $relation => function ($query) {
                        return $query->withoutGlobalScope('active');
                    }
                ];
            })
            ->all();
    }

    /**
     * Cast an attribute to a native PHP type.
     *
     * @param  string  $key
     * @param  mixed  $value
     * @return mixed
     */
    protected function castAttribute($key, $value)
    {
        if (is_null($value)) {
            return null;
        }
        if ($this->getCastType($key) == 'array') {
            return [];
        }

        return parent::castAttribute($key, $value);
    }
}
