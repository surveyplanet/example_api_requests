API_HOST="https://api.surveyplanet.com"

CLIENT_ID=$1
CLIENT_SECRET=$2

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
    echo "Usage: $0 <client_id> <client_secret>"
    exit 1
fi

echo "Retriving user data from $API_HOST"

AUTH=$( printf "%s" "${CLIENT_ID}:${CLIENT_SECRET}" | base64 ) # use printf instead of echo so '/n' isn't encoded

AUTH_RES=$( 
	curl -s $API_HOST/oauth/token \
		--request POST \
		--header "Content-Type: application/x-www-form-urlencoded" \
		--header "Accept: application/json" \
		--header "Authorization: Basic $AUTH" \
		--data "grant_type=client_credentials"
)

ACCESS_TOKEN=$( echo $AUTH_RES | jq -r '.data.access_token')

echo "ACCESS_TOKEN: $ACCESS_TOKEN"

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then	
	echo "Cannot get auth token"
	echo $AUTH_RES | jq -r '.' 1>&2
	exit 1
fi

RES=$(
	curl $API_HOST/v1/user \
		--silent \
		--header "Accept: application/json" \
		--header "Authorization: Bearer $ACCESS_TOKEN"
);

echo '\nRESPONSE:'
echo '------------------\n'
echo $RES | jq -r '. | { status, type, message, data}'
echo '\n------------------\n'

