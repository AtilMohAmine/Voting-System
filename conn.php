<?php
    require __DIR__.'/vendor/autoload.php';

    use Kreait\Firebase\Factory;

    $factory = (new Factory)->withServiceAccount('voting-system-bda10-firebase-adminsdk-gck0i-7a23ddb4dd.json')
                        ->withDatabaseUri('https://voting-system-bda10-default-rtdb.firebaseio.com/');
    
?>