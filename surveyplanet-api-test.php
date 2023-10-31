<?php

$API_HOST = "https://api.surveyplanet.com";

$CLIENT_ID = $argv[1];
$CLIENT_SECRET = $argv[2];

if (empty($CLIENT_ID) || empty($CLIENT_SECRET)) {
    echo "Usage: php script.php <client_id> <client_secret>\n";
    exit(1);
}

echo "Retrieving user data from $API_HOST\n";

$AUTH = base64_encode("$CLIENT_ID:$CLIENT_SECRET");

$ch = curl_init("$API_HOST/oauth/token");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/x-www-form-urlencoded",
    "Accept: application/json",
    "Authorization: Basic $AUTH"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

$AUTH_RES = curl_exec($ch);
curl_close($ch);

$AUTH_RES_JSON = json_decode($AUTH_RES, true);
$ACCESS_TOKEN = $AUTH_RES_JSON['data']['access_token'];

echo "ACCESS_TOKEN: $ACCESS_TOKEN\n";

if (empty($ACCESS_TOKEN) || $ACCESS_TOKEN == "null") {
    echo "Cannot get auth token\n";
    echo json_encode($AUTH_RES_JSON, JSON_PRETTY_PRINT) . "\n";
    exit(1);
}

$ch = curl_init("$API_HOST/v1/user");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Accept: application/json",
    "Authorization: Bearer $ACCESS_TOKEN"
]);

$RES = curl_exec($ch);
curl_close($ch);

echo $RES;

?>