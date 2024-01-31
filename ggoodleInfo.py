from jamo import h2j,j2hcj
from unicode import join_jamos
import pandas as pd
import re

def jamo_split(word):
    jamo = j2hcj(h2j(word))
    dic = {'ㅐ':'ㅏㅣ','ㅒ':'ㅑㅣ','ㅔ':'ㅓㅣ','ㅖ':'ㅕㅣ',
       'ㅘ':'ㅗㅏ','ㅙ':'ㅗㅐ','ㅚ':'ㅗㅣ','ㅝ':'ㅜㅓ',
       'ㅞ':'ㅜㅔ','ㅟ':'ㅜㅣ','ㅢ':'ㅡㅣ',
       'ㄳ' : 'ㄱㅅ', 'ㄵ' : 'ㄴㅈ', 'ㄶ' : 'ㄴㅎ','ㄺ' : 'ㄹㄱ',
       'ㄻ' : 'ㄹㅁ', 'ㄼ' : 'ㄹㅂ', 'ㄽ' : 'ㄹㅅ', 'ㄾ' : 'ㄹㅌ', 
       'ㄿ' : 'ㄹㅍ', 'ㅀ' : 'ㄹㅎ', 'ㅄ' : 'ㅂㅅ', 'ㄲ' : 'ㄱㄱ','ㅆ'  : 'ㅅㅅ'}
    for i in jamo:
        if i in dic.keys():
            jamo = jamo.replace(i,dic[i])
    return jamo

def find_hangle_list():
    test_list=[]
    excel_data=pd.read_excel('./Desktop/꼬들/한국어 학습용 어휘 목록.xls',usecols=[1])
    data=excel_data['단어'].to_list()
    for i in range(len(data)):
        data[i]=re.sub(r'\d','',data[i])
        str_jamo=jamo_split(data[i])
        if(len(str_jamo)==6):
            test_list.append(str_jamo)
    return test_list

def find_info(str_jamo_list):
    hangle_ja_list=['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
    hangle_mo_list=['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ']
    ggodle_dic_sorted_list=[]
    sum_hangle_dic={}
    ggodle_dic={}
    for ja in hangle_ja_list:
        sum_hangle_dic[ja]=0
        ggodle_dic[ja]=0
    for mo in hangle_mo_list:
        sum_hangle_dic[mo]=0
        ggodle_dic[mo]=0
    
    for t in range(0,6):
        for ja in hangle_ja_list:
            ggodle_dic[ja]=0
        for mo in hangle_mo_list:
            ggodle_dic[mo]=0
        for ja in hangle_ja_list:
            for i in range(len(str_jamo_list)):
                if(str_jamo_list[i][t]==ja):
                    ggodle_dic[ja]=ggodle_dic[ja]+1
                    sum_hangle_dic[ja]=sum_hangle_dic[ja]+1
        for mo in hangle_mo_list:
            for i in range(len(str_jamo_list)):
                if(str_jamo_list[i][t]==mo):
                    sum_hangle_dic[mo]=sum_hangle_dic[mo]+1
                    ggodle_dic[mo]=ggodle_dic[mo]+1
        sorted_dict = sorted(ggodle_dic.items(), key= lambda item:item[1], reverse=True)
        sorted_sum_dict = sorted(sum_hangle_dic.items(), key= lambda item:item[1], reverse=True)
        ggodle_dic_sorted_list.append(sorted_dict)
    return ggodle_dic_sorted_list, sorted_sum_dict

most_jamo_list=[]
most_jamo_set=[]
sum_rank=[]
str_jamo_list=find_hangle_list()
ggodle_sorted,sum_hangle_dic=find_info(str_jamo_list)

for k in range(len(ggodle_sorted)):
    most_jamo_set=[]
    for i in range(0,8): #여기 숫자 바꿔서 n등까지 표시
        most_jamo_set.append(ggodle_sorted[k][i])
    most_jamo_list.append(most_jamo_set)

for i in range(len(most_jamo_list)):
    print(most_jamo_list[i])

for i in range(len(sum_hangle_dic)):
    sum_rank.append(sum_hangle_dic[i][0])
print(sum_rank)





