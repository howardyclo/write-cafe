#!/usr/bin/env python
from inspect import *
from decorator import *
from public import *

@decorator
@public
def self(method,self,*args,**kwargs):
    """method decorator to return self object

    Example:

    @self
    def method(self):
        # statement
    """
    if not isroutine(method):
        err = "@self decorator for methods only, got %s" % method
        raise TypeError(err)
    margs = [self]+list(args)
    r = method(*margs,**kwargs)
    if r:
        raise ValueError("@self %s result is not None" % method)
    return self

if __name__=="__main__":
    class CLS(object):
        @self
        def test(self):
            pass
    instance=CLS()
    print(instance.test()) # <__main__.CLS object at ...>

