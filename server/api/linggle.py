import requests
import urllib

def parseData(rowdict):
    def extract_word(word):
        return word.replace('<strong>', '').replace('</strong>', '').strip()
    return (' '.join(map(extract_word, rowdict['phrase'])), float(rowdict['count']))

def linggleit(query):
    url = 'http://linggle.com/query/{}'.format(urllib.quote(query, safe=''))
    r = requests.get(url)
    if r.status_code == 200:
        res = dict()
        for ngram, count in map(parseData, r.json()):
            if ngram not in res:
                res[ngram] = count
        return sorted(res.items(), key=lambda x: x[-1], reverse=True)