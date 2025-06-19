import sys
import requests
import json

def is_misconfigured(headers, origin):
    aco = headers.get('Access-Control-Allow-Origin', '')
    acc = headers.get('Access-Control-Allow-Credentials', '')

    if aco == '*' and acc.lower() == 'true':
        return True
    if aco == origin and acc.lower() == 'true':
        return True
    if origin in aco:
        return True
    return False

def main(url):
    test_origin = "https://evil.com"
    results = {}

    try:
        headers = {'Origin': test_origin}
        r = requests.get(url, headers=headers)
        results['GET'] = {
            'status_code': r.status_code,
            'Access-Control-Allow-Origin': r.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Credentials': r.headers.get('Access-Control-Allow-Credentials'),
            'vulnerable': is_misconfigured(r.headers, test_origin)
        }

        options_headers = {
            'Origin': test_origin,
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'X-Custom-Header'
        }
        r2 = requests.options(url, headers=options_headers)
        results['OPTIONS'] = {
            'status_code': r2.status_code,
            'Access-Control-Allow-Methods': r2.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': r2.headers.get('Access-Control-Allow-Headers'),
            'Access-Control-Allow-Origin': r2.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Credentials': r2.headers.get('Access-Control-Allow-Credentials'),
            'vulnerable': is_misconfigured(r2.headers, test_origin)
        }

    except Exception as e:
        results = {'error': str(e)}

    print(json.dumps(results))  # output JSON to be read by Node.js

if __name__ == "__main__":
    url = sys.argv[1]
    main(url)