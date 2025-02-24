## 📑 API

### 1. 유저 랭킹 등록
사용자가 랭킹에 자신의 정보를 등록한다.
#### url
```
METHOD : POST
"/api/save/rank"
```
#### Request Body
```
{
    "name" : str        // 닉네임
    "time" : int        // 걸린 시간
    "count" : int       // 시도 횟수
    "score" : int       // 점수
    "isSolved" : bool   //6번안에 풀었는지 여부
}
```

#### Response
```
{
    status : 200
}
```

<br>

### 2. 유저 랭킹 조회 (실제 HTTP 네트워크 보고 적기기)
모든 사용자의 랭킹 정보를 가져온다.
#### url
```
METHOD : GET
"/api/get/rank"
```

#### Response
```
{
    status : 200
}
```

<br>

### 3. 유저 랭킹 삭제 (실제 HTTP 네트워크 보고 적기기)
모든 사용자의 랭킹을 삭제한다. (24시간 마다 초기화)
#### url
```
METHOD : DELETE
"/api/delete/rank"
```

#### Response
```
{
    status : 200
}
```

<br>

### 4. 단어 유효성 검사 (실제 HTTP 네트워크 보고 적기기)
사용자가 제출한 단어가 유효한 단어인지 검증한다.
#### url
```
METHOD : POST
"/api/validation"
```

#### Request Body
```
{
    "validWord": list  // 사용자가 제출한 단어 자모음 리스트
}
```

#### Response
```
{
    "isValid" : True  
}
```

<br>

### 5. 오늘의 단어 조회 (실제 HTTP 네트워크 보고 적기기)
오늘의 정답 단어를 가지고 온다.
#### url
```
METHOD : GET
"/api/todayWord"
```

#### Response
```
{
    "word" : ["ㅇ","ㅏ","ㄴ","ㄴ","ㅕ","ㅇ"]
}
```

<br>
<br>

### 기타 API (기존 게임 통계, 정답 단어 추천을 위한 API)
<hr>

### 1. 모든 단어 리스트 가져오기
엑셀 파일에 있는 모든 자음 모음 리스트들을 조회한다.
#### url
```
METHOD : GET
"/api/wordList"
```

#### Response
```
{
    [
        ["ㅇ","ㅏ","ㄴ","ㄴ","ㅕ",ㅇ"],
        ["ㄷ","ㅏ","ㅣ","ㅈ","ㅓ","ㄴ"],
        ["ㅁ","ㅜ","ㄹ","ㅅ","ㅗ","ㄱ"],
        ...
        ...
    ]
}

```

<br>

### 2. 정답 단어 추천 받기기
기존 게임에서 지금 까지 입력한 정보들을 바탕으로 다음 시도할 단어들을 추천받을 수 있다.
#### url
```
METHOD : POST
"/api/recommend"
```

#### Request Body
```
{
    "word": str       // 제출한 단어
    "result": str     // word를 시도했을 때 결과 (초록,주황,회색)
    "strList": list   // 현재 상황에서 가능한 자음 모음 리스트
}
```

#### Response
```
{
    "resultword" : 
    [
        ["ㅇ","ㅏ","ㄴ","ㄴ","ㅕ",ㅇ"],
        ["ㄷ","ㅏ","ㅣ","ㅈ","ㅓ","ㄴ"],
        ["ㅁ","ㅜ","ㄹ","ㅅ","ㅗ","ㄱ"],
        ...
        ...
    ]

    "resultJoinWord" :
    [
        "안녕",
        "대전",
        "물속",
        ...
        ...
    ]
}

```
