# Bravo File loader
_v2017.11.08_

```selector```
settings
    path - адрес куда слать объект.
    multiple -- soon
    name - название поля, в котором передается файл
    data - объект с данными. в него подмешивается поле с файлов.
    maxsize - максимальный размер файла в байтах
    drop:true, - если true, то можно драгать файл на элемент.
    hoverclass:'hovvva', - класс, который будет назначен элементу когда на него будет перетащен файл.

callbacks
    toobig - если файл превышает свойство maxsize
    start
    progress
    loaded
    done
    error
