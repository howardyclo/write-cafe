#encoding:utf-8
from nltk.tokenize import  wordpunct_tokenize 
from collections import Counter
from pattern.en import lexeme #pip install pattern
import os

PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(PROJECT_ROOT, 'data/')

content_Words = ['N', 'V', 'ADJ', 'ADV']
sents = [line.strip().decode('utf-8') for line in open(DATA_PATH + 'sentences_new.txt')]

def get_ngram(words, word_pos): #從片段取出ngram
    ngrams = []
    for n in range(2,6):
        for i in range(len(words)-n+1):
            for w in words[i:i+n]:
                if word_pos[w] in content_Words: #只取含有實詞的ngram
                    if word_pos[w] == 'V':
                        tense = lexeme(w) #List of possible verb forms: be => is, was, been...
                        for verb in tense:
                            Slice = words[i:i+n]
                            Slice[Slice.index(w)] = verb
                            ngrams.append(Slice)
                    else:
                        ngrams.append(words[i:i+n])
                    continue
    #print ngrams
    return ngrams


def slice_pos(inputs):
    word_pos = {}
    prep = ''
    input_slice = ''
    for word, pos in inputs:
        word = word.lower()
        word_pos[word] = pos
        input_slice += word + ' '
        if pos == 'PREP':
            prep = word
    return word_pos, input_slice, prep


def find_sent(Slice): #讀入句子資料，找出符合的ngram並計算分數
    scores = Counter()
    word_pos, input_slice, prep = slice_pos(Slice)
    #print word_pos, input_slice, prep
    ngrams = get_ngram(wordpunct_tokenize(input_slice.lower()), word_pos)

    for line in sents:
        for i in range(len(ngrams)):
            ngram = ' '.join(ngrams[i])
            if line.find(ngram) >= 0:
                #print ngram+'\t'+line
                scores[line] += 10 if ngram.find(prep) >= 0 else len(ngrams[i]) #若ngram中包含介系詞算10分，其他則以ngram長度為分數

    return [sent[0] for sent in scores.most_common(3)]
    # for rank, sent in enumerate(scores.most_common(5), 1): #取分數最高的前五名句子為改錯例句
    #     print '%d. %s' % (rank, sent[0])

