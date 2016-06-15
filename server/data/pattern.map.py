# -*- coding: utf-8 -*-
from nltk import pos_tag
from nltk.tokenize import word_tokenize
import fileinput

for line in fileinput.input():
    if line == '': break
    words = word_tokenize(line.decode('utf-8').strip())
    # for i, word in enumerate(words):
    # 	if word.endswith('//UT'):
    # 		words[i] = word[:-4]
    # words = [w for w in words if not w.endswith('//UT')]
    tags = pos_tag(words)
    print ' '.join([ word.encode('utf-8')+'/'+pos.encode('utf-8') for word, pos in tags ])