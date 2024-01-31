from jamo import h2j,j2hcj
from unicode import join_jamos
import pandas as pd
import re

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

def recommend_text(my_jamoText,result,jamo_str):
    result_set=[]
    recommend_set=[]
    recommend_word=[]
    for text in jamo_str:
        Test(my_jamoText,text,result_set)
    
    for i in range(len(result_set)):
        if(result==result_set[i]):
            recommend_set.append(jamo_str[i])
    for i in range(len(recommend_set)):
        recommend_word.append(join_jamos(recommend_set[i]))
    print(recommend_word)
    return recommend_set

def Test(my_jamoText,target_jamoText,result_set):
    result=[]
    for i in range(len(my_jamoText)):
        if(my_jamoText[i]==target_jamoText[i]):
            result.append('g')
            continue
        for j in range(len(my_jamoText)):
            if(my_jamoText[i]==target_jamoText[j]):
                result.append('y')
                break
            elif(j==5):
                result.append('o')
    result_set.append(result)
    return

str_jamo_list=find_hangle_list()

while(True):
    result=[]
    result_text=input()
    my_text=input()
    for i in range(0,6):
        result.append(result_text[i])
    my_jamoText=jamo_split(my_text)
    str_jamo_list=recommend_text(my_jamoText,result,str_jamo_list)


#테스트
# result_set=[]
# Test(jamo_split("김창"),jamo_split("각각"),result_set)
# print(result_set)
