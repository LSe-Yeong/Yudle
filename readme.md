## 🔎 프로젝트 소개  

위 프로젝트는 다음과 같은 배경에서 진행된 Kordle 게임의 클론 프로젝트 입니다.
- 자음 모음 6개를 맞추는 kordle 이라는 게임이 친구들 사이에서 유행하기 시작함.
- kordle 게임에서 랭킹 시스템과, 타이머 시스템이 도입된다면 친구들이 게임을 더 재미있게 즐길 수 있을 것이라 생각함.
- 또한 프론트엔드, 백엔드, 배포의 과정을 한번에 진행할 수 있을 것 같아 기술 역량 증가에도 도움이 될 것이라 생각함.

클론 프로젝트의 대상인 kordle 게임은 [kordle 게임 바로가기](https://kordle.kr/) 에서 확인할 수 있습니다. 
<br>

### 1. 프로젝트 기간
 **2024.01.31 ~ 2024.12.06**

<br>

### 2. 포함 내용
1. 프로젝트 소개
2. 사용 기술 스택
3. 서비스 화면 및 기능
4. 디렉토리 구조 및 패키지 역할
5. API 구조
6. 기술적 이슈 및 해결 과정
7. 프로젝트 팀원 및 역할
   
<br>

## 🔧 사용 기술 스택

### Backend and DB
- FastAPI
- MySQL

### Frontend
- React
- Redux

### Tools
- GitHub


<br>

## 🚀 서비스 화면 및 기능
본 서비스는 [Yudle 게임 바로가기](https://ggodle.vercel.app/) 에서 확인할 수 있습니다.

**이곳에 설명과 사진 넣기**
<br>

## 📂 디렉토리 구조 및 패키지 역할
### 루트 디렉토리 (백엔드)
```
꼬들
 ┣ kordlefront
 ┃ ┗ src
 ┣ ggoodle.py
 ┣ ggoodleDB.py
 ┣ ggoodleInfo.py
 ┗ unicode.py
 
```
1. kordlefront : yudle 게임의 React Frontend와 관련된 파일들이 있는 디렉토리
2. ggoodle.py : yudle 게임 FastAPI 서버의 메인 Controller 파일  
3. ggoodleDB.py : yudle 게임의 RDBMS 관련 처리를 담당하는 파일
4. ggoodleInfo.py : "가장 많이 쓰이는 자모음이 무엇인지?" 와 같은 kordle 원본 게임의 통계를 알기 위해 만든 파일 (Yudle 게임과는 관련 없음)
5. unicode.py : 자음 모음 분리, 결합과 같은 함수들이 있는 외부 라이브러리 파일

### kordlefront 디렉토리 (프론트엔드)
```
src
 ┣ api
 ┃ ┣ GetApi.js
 ┃ ┗ PostApi.js
 ┣ asset
 ┃ ┣ component
 ┃ ┃ ┣ AnswerBar.css
 ┃ ┃ ┣ AnswerBar.js
 ┃ ┃ ┣ background.css
 ┃ ┃ ┣ DescriptionButton.css
 ┃ ┃ ┣ DescriptionButton.js
 ┃ ┃ ┣ JamoLayout.js
 ┃ ┃ ┣ Maker.css
 ┃ ┃ ┣ Maker.js
 ┃ ┃ ┣ RankingButton.css
 ┃ ┃ ┣ RankingButton.js
 ┃ ┃ ┣ RankingHeader.css
 ┃ ┃ ┣ RankingHeader.js
 ┃ ┃ ┣ RankingLayout.css
 ┃ ┃ ┣ RankingLayout.js
 ┃ ┃ ┣ Timer.css
 ┃ ┃ ┗ Timer.js
 ┃ ┗ image
 ┃ ┃ ┣ background.png
 ┃ ┃ ┣ clock.png
 ┃ ┃ ┣ description.png
 ┃ ┃ ┗ ranking.png
 ┣ fonts
 ┃ ┗ KyoboHandwriting2023wsa.ttf
 ┣ page
 ┃ ┣ GamePage.css
 ┃ ┣ GamePage.js
 ┃ ┗ MainP.js
 ┣ store
 ┃ ┣ dataslice.js
 ┃ ┗ store.js
 ┣ App.css
 ┣ App.js
 ┣ App.test.js
 ┣ index.css
 ┣ index.js
 ┣ logo.svg
 ┣ reportWebVitals.js
 ┣ setProxy.js
 ┗ setupTests.js
 ```
 1. api : api 처리 관련 디렉토리
 2. asset : 이미지, 폰트, 컴포넌트와 같은 정적파일 및 컴포넌트 파일들로 구성된 디렉토리
 3. page : 각각의 page를 구성하는 파일들로 구성된 디렉토리
 4. store : redux와 관련된 변수들의 상태 관리를 하는 디렉토리
 
<br>

## 📑 API 구조
본 프로젝트의 API 구조는 [여기]()서 확인할 수 있습니다.

## ✅ 기술적 이슈 및 해결 과정
1. 커뮤니티 탐지를 위해 어떠한 알고리즘을 사용해야 할까?
    - 초기에 Neo4j GDS 라이브러리의 Louvain 알고리즘을 사용했음.
    - 하지만 커뮤니티를 나눈 결과가 원하는 대로 나오지 않았음.
    - 팀원들끼리 회의한 후 유사한 그룹을 더 잘 표현할 수 있는 Kmeans 알고리즘을 사용하기로 결정함.
      
2. 여러 패키지에서 DB 연결을 동시에 진행하고 있음.
    - ChatingManager, AuthManager, episodeManager 패키지에서 DB연결을 진행함.
    - 코드의 중복성을 제거하기 위해 전역적으로 설정할 수 있는 globals 패키지에 DB를 연결할 수 있는 util 파일을 만듬.
    - 외부 패키지에서 DBUtil에 있는 connection 변수를 import만 해도 DB를 바로 사용할 수 있다. 

<br>

## 👬 프로젝트 팀원 및 역할
1. 🐶이세영 [@LSe-Yeong](https://github.com/LSe-Yeong)

