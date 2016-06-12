#!/usr/bin/env python
try:
    from urlparse import parse_qs
except ImportError:
    from urllib.parse import parse_qs
from public import *


def _parse_qs(query):
    kwargs = dict()
    for k, v in parse_qs(query).items():
        if len(v) == 1:
            v = v[0]
        kwargs[k] = v
    return kwargs


@public
def query_string(string):
    if not string:
        return dict()
    if "?" in string:
        qs = string.split("?")[1]
    else:
        qs = string
    if "#" in qs:
        qs = qs.split("#")[0]
    return _parse_qs(qs)

if __name__ == "__main__":
    print(query_string("https://site.org/index.php?k=v&k2=v2&k3=v3"))
    print(query_string("index.php?k=v&k2=v2&k3=v3"))
    print(query_string("k=v&k2=v2&k3=v3"))
    print(query_string("k=v&k2=v2&k3=v3#anchor"))
    print(query_string("https://site.com"))  # {}
