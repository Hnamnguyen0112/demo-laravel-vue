<?php


namespace App\Libraries;


use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;

class Helper
{
    public static function map($arr)
    {
        return array_map(
            function ($value, $key) {
                return [
                    'id' => $key,
                    'name' => $value,
                ];
            }, $arr, array_keys($arr)
        );
    }

    public static function randomPassword($len = 8)
    {
        if ($len < 8) {
            $len = 8;
        }

        $sets = [];
        $sets[] = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        $sets[] = 'abcdefghjkmnpqrstuvwxyz';
        $sets[] = '123456789';

        $password = '';

        foreach ($sets as $set) {
            $password .= $set[array_rand(str_split($set))];
        }

        while (strlen($password) < $len) {
            $randomSet = $sets[array_rand($sets)];

            $password .= $randomSet[array_rand(str_split($randomSet))];
        }

        return str_shuffle($password);
    }

    public static function checkImgDimension($img, $width, $height)
    {
        if (empty($img["tmp_name"])) {
            return false;
        }
        $imageInfo = getimagesize($img["tmp_name"]);
        $imageWidth = (int) $imageInfo[0];
        $imageHeight = (int) $imageInfo[1];

        if ($imageWidth < $width || $imageHeight < $height) {
            return false;
        }

        return [
            $imageWidth,
            $imageHeight,
        ];
    }

    public static function uploadFileS3($file)
    {
        $name = $file->hashName();
        $extension = $file->guessClientExtension();
        $mime = $file->getClientMimeType();
        $size = $file->getClientSize();
        $path = config('filesystems.disks.public.folder').'/'.$name;
        $disk = 'public';
        try {
            if (config('filesystems.disks.s3.enable')) {
                $path = config('filesystems.disks.s3.dir').'/'.$name;
                $disk = 's3';
                Storage::disk('s3')
                    ->put(
                        config('filesystems.disks.s3.dir'),
                        $file
                    );
            } else {
                $destinationDirectory = \Config::get('filesystems.disks.public.root');
                if (!is_dir($destinationDirectory)) {
                    mkdir($destinationDirectory, 0755, true);
                } else {
                    chmod($destinationDirectory, 0777);
                }
                $saveFile = $file;
                $saveFile->move($destinationDirectory, $name);
            }
        } catch (ModelNotFoundException $e) {
            throw new \Exception("can't upload file");
        }

        return [
            'disk' => $disk ?? '',
            'name' => $name ?? '',
            'path' => $path ?? '',
            'extension' => $extension,
            'mime' => $mime,
            'size' => $size,
        ];
    }

    public static function tokenEncode($code)
    {
        $token = base64_encode($code);
        $token = str_replace('=', '', $token);
        return $token;
    }
}
