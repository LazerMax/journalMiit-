file_put_contents(
string $filename,
mixed $data,
int $flags = 0,
?resource $context = null
): int|false

<?php
$file = 'summary.txt';
// на какие данные рассчитан этот скрипт
header("Content-Type: application/json");
// разбираем JSON-строку на составляющие встроенной командой
$data = json_decode(file_get_contents("php://input"));
// отправляем в ответ строку с подтверждением
file_put_contents($file, $data);
?>
