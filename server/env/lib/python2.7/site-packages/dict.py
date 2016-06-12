#!/usr/bin/env python
# -*- coding: utf-8 -*-
try:
    import __builtin__  as __builtins__ # python 2
except:
    import builtins as __builtins__ # python 3
from datetime import *
from json import *
from public import *
from self import *

def isdict(object):
    return isinstance(object,dict)

@public
class dict(dict):
    def __init__(self, *args, **kwargs):
        self.update(*args, **kwargs)

    def get(self,key=None,default=None,i=False):
        result = __builtins__.dict.get(self,key,default)
        if result is None and i==True: # insensitive
            for k in self.keys():
                if str(key).lower()==str(k).lower():
                   return self[k]
        return result

    @self
    def update(self,*args,**kwargs):
        __builtins__.dict.update(self,*args,**kwargs)

    @property
    def json(self):
        """return json string"""
        dthandler = lambda i: i.isoformat() if isinstance(i,datetime) else None
        return dumps(
            self.__dict__,
            dthandler
        )

    @self
    def remove(self,v):
        """remove element(s) by key"""
        if isinstance(v,list): # list
            map(self.remove,v)
        else:
            if v in self:
                del self[v]

    def __getattribute__(self,name):
        if hasattr(type(self),name):
            return object.__getattribute__(self,name)
        if name in self:
            if isinstance(self[name],dict): # dict
                return dict(self[name])
            return self[name]

    def __getitem__(self,key): 
        if key in self:
            v = __builtins__.dict.__getitem__(self,key)
            if isdict(v): # recirsive
                return type(self)(v)
            return v

    def __setattr__(self, name, value):
        if hasattr(type(self),name):
            object.__setattr__(self,name,value)
        else:
            self[name] =  value

if __name__=="__main__":
    print(dict(key="v")["key"]) # v
    print(dict(key="v").key) # v
    print(dict(key="v")["not-existing"]) # None
    print(dict(key="v").not_existing) # None
    dict().remove("not-existing")
    dict().remove("not-existing").remove("not-existing2") # 
    dict().remove(["not-existing","not-existing2"]) # 
