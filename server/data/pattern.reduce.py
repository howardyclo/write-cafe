# -*- coding: utf-8 -*-
import fileinput
from collections import defaultdict, Counter

N = ['NN', 'NNS', 'NNP', 'NNPS']
V = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
ADJ = ['JJ', 'JJR', 'JJS']
ADV = ['RB', 'RBR', 'RBS']
sub_conj = ['although', 'though', 'because', 'if', 'once', 'that', 'until', 'when', 'whenever', 'where', 'wherever', 'whether', 'while'] 

eng_symbols = u'{}"\'()[].,:;+!?-*/&|<>=~$#%：`'

def isPattern(ngram):
    first, last = ngram[0], ngram[-1]
    if first.split('/')[-1] in ['V', 'N', 'ADJ', 'ADV', 'PREP'] and last.split('/')[-1] in ['V', 'N', 'ADJ', 'ADV', 'PREP']:
        for elem in ngram[1:-1]:
            if any(symbol in elem.split('/')[0] for symbol in eng_symbols): return False
            if elem.split('/')[-1] in ['WDT', 'CC']: return False
        return True
    return False

def generalizeTag(ngram):
    for i, elem in enumerate(ngram):
        word = elem.split('/')[0]
        pos = elem.split('/')[-1]
        if pos in N: ngram[i] = word + u'/N'
        elif pos in V: ngram[i] = word + u'/V'
        elif pos in ADJ: ngram[i] = word + u'/ADJ'
        elif pos in ADV: ngram[i] = word + u'/ADV'
        elif (pos == 'IN' and word not in sub_conj) or pos == 'TO': ngram[i] = word + u'/PREP'
    return ngram

rules = defaultdict(lambda: 0)
for line in fileinput.input():
    if line == '': break
    words = line.decode('UTF-8').strip().split()
    for i, word in enumerate(words):
        wd = word.split('/')[0]
        pos = word.split('/')[-1]
        if (pos == 'IN' and wd not in sub_conj) or (pos == 'TO' and words[i+1].split('/')[-1] != 'VB'):
            for n in range(3, 6):
                for k in range(i-n+1, i+1): # 從i(介係詞位置)往前n個字開始組ngram
                    if k < 0 or k+n > len(words): continue
                    if k+n-1 == i and i != len(words)-2: continue # 介係詞必須是句子的結尾, 才可當ngram的最後一個字
                    if k == i and i != 0: continue # 介係詞必須是句子的開頭, 才可當ngram的第一個字
                    ngram = generalizeTag(words[k:k+n])
                    if isPattern(ngram):
                        pos = tuple([elem.split('/')[-1].encode('UTF-8') for elem in ngram])
                        rules[pos] += 1

temp = sorted(rules.keys(), key=rules.get, reverse=True)
for rule in temp:
    # if rules[rule] < 50: continue
    counter = Counter(rule)
    if counter['PREP'] > 1: continue
    print '{}\t{}'.format(' '.join(rule), rules[rule])

