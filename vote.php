<?php
header('Content-type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

require ('./conn.php');
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

$auth = $factory->createAuth();

$idTokenString = $_GET['idToken'];

$userIp = str_replace('.', '-', $_SERVER['REMOTE_ADDR']);


try {
    $verifiedIdToken = $auth->verifyIdToken($idTokenString);
} catch (FailedToVerifyToken $e) {
    echo 'The token is invalid: '.$e->getMessage();
    http_response_code(400);
    echo json_encode([
        'status' => 'invalid token'
    ]);
    exit(1);
}

$uid = $verifiedIdToken->claims()->get('sub');

$database = $factory->createDatabase();

$votes = $_GET['votes'];

foreach($votes as $vote){
    $competitionId = $vote['competitionId'];
    $candidateId = $vote['candidateId'];

    $candidatePath = "competitions/".$competitionId."/candidates/".$candidateId;
    if($database->getReference("/")->getSnapshot()->hasChild($candidatePath)) {
        $participationRef = $database->getReference("competitions/".$competitionId."/participants/".$uid);
        $participationIpRef = $database->getReference("competitions/".$competitionId."/participants-ip/".$userIp);
        if($participationRef->getSnapshot()->exists() /*|| $participationIpRef->getSnapshot()->exists()*/) {
            $success = false;
            break;
        } else {
            $participationRef->set($candidateId);
            $participationIpRef->set($userIp);

            $votesRef = $database->getReference($candidatePath."/votes");
            $votesRef->set($votesRef->getValue() + 1);

            $success = true;
        }   
    }
}

if($success) {
    http_response_code(200);
    echo json_encode([
        'status' => 'success'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'already voted'
    ]);
}

?>