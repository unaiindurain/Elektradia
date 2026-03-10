<?php
// Recibimos los datos del JS
$data = json_decode(file_get_contents('php://input'), true);

if ($data && $data['aceptado'] === true) {
    $fecha = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR']; // Captura la IP del usuario
    $user_agent = $_SERVER['HTTP_USER_AGENT']; // Captura el navegador

    // Formateamos la línea que se guardará
    $linea = "Fecha: $fecha | IP: $ip | Navegador: $user_agent | Aceptó: SI\n";

    // Guardamos en un archivo llamado registro_cookies.txt
    // FILE_APPEND hace que no se borre lo anterior, sino que escriba debajo
    file_put_contents('registro_cookies.txt', $linea, FILE_APPEND);

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>