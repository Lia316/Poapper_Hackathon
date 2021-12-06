# Poapper_Hackathon
포애퍼 내부 해커톤



## 기획

주제 : 🏘 기숙사 민원 신청 어플리케이션



#### 계획

1. 사용자 정보 입력 화면 (로그인 시스템)
   - 동 호수 입력
2. 민원 접수 화면
   - 대상 호수 (ex. 203)
   - 제목 (ex. 203호 너무 시끄러운데요)
   - 본문 (ex. 203호 지금 노래 부르고 계신가요? 운동하고 계신가요? 화나네요 😡)
   - 접수! (버튼)
3. 사용자 정보 확인 화면
   - 내가 쓴 글
   - 내가 받은 민원 - 민원 읽음 여부 알려주기
   - 접수 현황 (접수되었습니다 / 확인했습니다 / 미확인)



#### 협업 RULE

- 📑 매일 저녁 9시에 작업 현황 서로 슬랙으로 보고하기
- 💪🏻 목표 : 실제로 프로젝트를 해보며 배운 것 적용하기 / 우선 순위를 정해서 기능 개발하기
- 💬 소통 : 매일 슬랙으로 간단한 소통 / 회의는 줌으로!





## BE



#### 1. 목표

- Front-End 와 협업하는 방식 배우기
- 로컬 벗어나서 원격으로 서버 운영하기



#### 2. 구현한 기능 (미완)

> 프론트와 협업하기

```javascript
const axios = require('axios')

axios.get('http://localhost:8080/food')
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })

axios.post('http://localhost:8080/food', {
    name: 'Apple',
    kcal: '80',
    isVegan: '1'
    })
    .then((res) => {
        console.log(res.status)
    })
    .catch((err) => {
        console.log(err)
    })
```

- `GET` 요청을 받으면 `response` 그대로 전달해도 되는 건지, 따로 과정이 필요한 건지, 코드를 합쳐야하는지 고민이었다
- 허무하게도 [BackEnd Seminar 6-2](https://poapper.github.io/backend-seminar/2021/11/19/BackEnd-Seminar6-2.html) 에서 답을 찾을 수 있었다
- 다만, `request` 가 deprecated되어서 axios로 대체해야했다

```javascript
const router = express.Router()

router.get('', (req, res) => {
    db.query(`SELECT * FROM foods`, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})
```

- 실험 끝에 이대로 response를 보내고, 프론트엔드 분은 데이터를 파싱하면 될 것 같다는 결론을 내렸다





> 로컬 벗어나서 원격으로 서버 운영하기

- 협업을 하려면 바로 서버를 배포해야겠다고 생각했다
  - 거의 끝나서야 mock api를 제공했어야 했다는 생각이 들었다.. 😥



##### 서버 구축 방법 선정의 이유💡

- 서버를 구축하는 방법에는 2가지가 있다
  1. 아파치/Nginx 같은 소프트웨어를 설치해서 본인 컴퓨터를 서버 컴으로 돌리기
  2. 웹호스팅/서버호스팅/클라우드 중 선택해서 서버 배포하기 
- 자가 컴퓨터를 서버로 사용하면 보안이 취약하고 서버를 돌리고 싶을 때마다 컴퓨터를 켜줘야한다는 단점이 있어서 2번 방법 중에 고르기로 했다
- 서버 호스팅은 서버 자체를 빌려주고 그 안에서 아파치/Nginx 같은 소프트웨어를 설치해야하고 비싸다
- 나머지 대안 중에서, 무료인 플랫폼을 골라 클라우드 컴퓨팅 플랫폼인 `Heroku`를 선택했다.



##### 수 많은 에러와의 전쟁⚔️

- <img width="549" alt="image" src="https://user-images.githubusercontent.com/73650994/144814921-f171e3bd-5fd4-400d-bdb8-c106685ddc96.png"> 

- 수 많은 Heroku 에러와 싸웠다..

- <img width="728" alt="image" src="https://user-images.githubusercontent.com/73650994/144815205-84278295-2a38-4d94-8758-1161840ce4c8.png"> 

  - 그 중에 하나는 `Path` 로, Heroku 에 구축한 서버 app 은 로컬과 다른 파일 경로로 처리해줘야했다.

- ```
  $ heroku open
  ```

- <img width="671" alt="image" src="https://user-images.githubusercontent.com/73650994/144815376-b6b9c1c9-bd76-4f64-b277-fa02a8e0b662.png">

  - 아무튼 서버 배포는 성공했다

- <img width="671" alt="image" src="https://user-images.githubusercontent.com/73650994/144815527-8fc983a4-ca6a-4b5f-8247-23417c6612b9.png">

  - 다만 cleardb로 구축한 데이터베이스 쿼리를 받아오려고 하면 `503 Service Unaviable` 에러가 발생한다 💦



##### Mock Server

<img width="649" alt="image" src="https://user-images.githubusercontent.com/73650994/144816088-8002e48d-1ecd-43df-9be9-9be928f07d32.png">

<img width="637" alt="image" src="https://user-images.githubusercontent.com/73650994/144816161-064d4e10-5f07-4539-8f3a-879e265f1390.png">

- 뒤늦게 mock api 라는 존재를 깨닫고 구축했다


##### DB

<img width="912" alt="image" src="https://user-images.githubusercontent.com/73650994/144818332-88f07f2a-4482-4ce8-9c4f-9d7765f40c5a.png">

<img width="912" alt="image" src="https://user-images.githubusercontent.com/73650994/144818500-48409aac-c2c8-491a-a208-f35ba13b8e7a.png">

- Heroku 서버와 연결된 cleardb (정상 작동)




#### 배운 점 / 좋았던 점

- 원했던 목표인 프론트와의 협업, 서버 배포 과정을 경험해볼 수 있어서 좋았다
- 서버에 대한 이해도를 높일 수 있었던 점도 좋았다
- 에러 메시지에 의존하여 문제를 해결하는 습관이 조금 생긴 것 같다



#### 아쉬웠던 점

- 복잡한 데이터베이스 구축도 배워보고 싶었는데 기초에 그쳐 아쉬웠다
- 시간이 조금 더 있었다면 더 깃허브 자원을 사용해 소통할 수 있었을 텐데 하는 아쉬움이 남는다 (commit convention, wiki 정리 등등)


## 목표(front-end)
1. 민원을 사용자한테서 입력받아 서버에 보내기

2. 자신한테 온 민원들 목록을 서버에  받아와 보여주기

3. 자신이 쓴 민원들 목록 서버에서 받아 와서 출력하기

### 배운 것들(어려웠던 점)


1.   리스트 출력하는 법
`const list = frommelist.map(info => (<Claiminfo  key = {info.id}  info = {info}/>)
);`

      .map을 사용해 컴포넌트를 리스트로 만들어 출력하면 된다.

2.  react의 전반적인 사용법
       * 컴포넌트
       * state, props
       * 등등 

### 아쉬운 점
1. 미완성

2. 서버와의 연결

### 시연

