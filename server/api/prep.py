# -*- coding: utf-8 -*-

from flask_restful import Resource
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from collections import defaultdict

import os
import linggle
import json

PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(PROJECT_ROOT, 'data/')

''' Test data '''
# I'm not allowed to listen music after 11 p.m. . # MT
# Finally, I would like to know the weather in California . # MT(know about)
# We are restricted doing nearly everything. # restricted in
# So when I read other sharks eating the shark the old man had caught, I got very angry and annoyed. # read about
# I spent two days there, and I think it was the best Arts Festival I have ever been at . # RT(at->to)
# It will let me get up close with nature, and experience life in the wild.'] # with->to
# First of all, we are happy to have won the first prize on your competition.'] # on->in
# We have discussed about it a lot of times. # about->X
# I think we should think about more carefully when we buy something for our children. # about->X
# I learnt lots of thing from there that I couldn't learn from school. # from->X
# The price for the weekend tickets is too expensive. # for->of

N = ['NN', 'NNS', 'NNP', 'NNPS']
V = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
ADJ = ['JJ', 'JJR', 'JJS']
ADV = ['RB', 'RBR', 'RBS']

sub_conj = ['although', 'though', 'because', 'if', 'once', 'that', 'until', 'when', 'whenever', 'where', 'wherever', 'whether', 'while']

MT = defaultdict(lambda:defaultdict(set))
RTnUT = defaultdict(lambda:defaultdict(int))

class Prep(Resource):

	def __init__(self):
		for line in open(DATA_PATH + 'patterns.txt'):
			pattern, count = line.strip().split('\t')
			if int(count) < 100: break
			pattern = pattern.split()
			i = pattern.index('PREP')
			RTnUT[len(pattern)][tuple(pattern)] = i
			pattern.remove('PREP')
			MT[len(pattern)][tuple(pattern)].add(i)

	def generalizeTag(self, tags):
		for i, (word, pos) in enumerate(tags):
			if (pos == 'IN' and word not in sub_conj) or (pos == 'TO' and tags[i+1][1] != 'VB'): tags[i] = (word, 'PREP')
		for i, (word, pos) in enumerate(tags):
			if pos in N: tags[i] = (word, 'N')
			elif pos in V: tags[i] = (word, 'V')
			elif pos in ADJ: tags[i] = (word, 'ADJ')
			elif pos in ADV: tags[i] = (word, 'ADV')
		return tags

	def subfinder(self, shortlist, longlist):
		return (False if any(pos not in longlist for pos in shortlist) else True)

	def matchPattern(self, tags, patterns): # 若要符合介係詞在開頭或結尾的pattern, 句子中的介係詞必須也要是在開頭或結尾?
	    res = []
	    for n in range(6, 1, -1): # 6gram ~ 2gram
	        ngram = [ tags[i:i+n] for i in range(len(tags)-n+1) ] # to ngram
	        for ng in ngram:
	            pos_ngram = tuple([pos for _, pos in ng]) # 只取詞性
	            # print pos_ngram
	            if pos_ngram in patterns[n].iterkeys():
	                if any(self.subfinder(ng, elem) for elem, _ in res): # 若與前面的ngram重疊,則不處理
	                    continue
	                res.append([ng, patterns[n][pos_ngram]]) # [ngram, index]
	    return (res if len(res) > 0 else None)

	def generalizeQuery(self, ngram, pi): # pi == index of preposition
	    for posType in [['ADJ', 'ADV'], ['N'], ['V']]:
	        for i, (word, pos) in enumerate(ngram):
	            if (i in [pi-1, pi, pi+1]) or word.startswith('?'): continue
	            if pos in posType:
	                ngram[i] = ('?'+word, pos)
	                return ngram       
	    return ngram

	def correct(self, ngram, pi):
		ngram[pi] = ('?prep.', 'PREP')
		for i, (word, pos) in enumerate(ngram):
			if pos == 'PRP$': ngram[i] = (word+'/the', pos) # your -> your/the

		res = linggle.linggleit(' '.join([w for w, _ in ngram]))
		if res:
	        # print 'Query:', ' '.join([w for w, _ in ngram])
			return ([res[0]] if len(res) == 1 or res[1][1]/res[0][1] < 0.15 else res[0:2])
		else:
			for i in range(2):
				ngram = self.generalizeQuery(ngram, pi)
				res = linggle.linggleit(' '.join([w for w, _ in ngram]))
				if res:
					# print 'Query:', ' '.join([w for w, _ in ngram])
					return ([res[0]] if len(res) == 1 or res[1][1]/res[0][1] < 0.15 else res[0:2])
	        
	    # print 'Query:', ' '.join([w for w, _ in ngram])
		return None

	def isModified(self, before, after, pi): # 主要看介係詞的部分有無改變
	    after = self.generalizeTag(pos_tag(after.split()))
	    if 'PREP' in [pos for _, pos in before]: # 本來就有介係詞->RT或UT 
	        return (False if before[pi] in after else True)
	    else: # 本來沒有介係詞->MT 
	        return (False if 'PREP' not in [pos for _, pos in after] else True)

	def formatTuplesToJson(self, tuples):
		res = []
		for item in tuples:
			d = {}
			d['sentence'] = item[0]
			d['count'] = item[1]
			res.append(d)
		return res


	def process(self, s=''):

		print 'INPUT SENTENCE:', s
		tag = pos_tag(word_tokenize(s))
		tag = self.generalizeTag(tag)
		preps = [(i, word) for i, (word, pos) in enumerate(tag) if pos == 'PREP'] # 介係詞在句子中的位置
		print preps

		res_RTorUT = (self.matchPattern(tag, RTnUT) if preps != [] else None)
		res_MT = self.matchPattern(tag, MT)

		results = []

		if res_RTorUT:
			print '\nn-grams matched [RT] or [UT] patterns:'
			for ngram in res_RTorUT: # [[('discussed', 'V'), ('about', 'prep'), ('it', 'PRP')], 1]
				corrections = self.correct(ngram[0][:], ngram[1])
				if corrections:
					if any( self.isModified(ngram[0], corr, ngram[1]) for corr, _ in corrections ):
						print ngram
						print '->', corrections
						results += corrections

		if res_MT:
			print '\nn-grams matched [MT] patterns:'
			for ngram in res_MT: 
				for i in ngram[1]: # ngram[1] => set
					# 當介係詞insert的位置是片段的開頭時, 檢查片段的前一個字是否為介係詞
					if (i == 0) and (tag[ tag.index(ngram[0][0])-1 ][-1] == 'PREP'):
						continue
					temp = ngram[0][:] # pass list by value instead of reference
					temp.insert(i, ('?prep.', 'prep'))
					corrections = self.correct(temp, i)
					if corrections:
						if any( self.isModified(ngram[0][:], corr, i) for corr, _ in corrections ):
							print [ngram[0], i] 
							print '->', corrections
							results += corrections

		return self.formatTuplesToJson(results)

	def get(self, sentence=''):
		return self.process(sentence)
