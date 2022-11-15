# useb-api-sdk-nodejs

useB API 는 고객의 신원인증을 API 호출을 통해 간단하게 조회 할 수 있도록 제공하는 서비스입니다.

- 이 모듈은 useB에서 제공하는 REST API를 [Node.js®](https://nodejs.org/)로 구현한 SDK 입니다.
- Nodejs 환경에서 별도의 API 호출 클라이언트를 구현하지 않고 간편하게 useB API를 호출할 수 있습니다.
- 관련 API 문서는 [useB API 문서](https://docs.useb.co.kr/)를 참고하세요.

## Features

- API 생성자를 제외한 모든 함수는 [Promise](http://www.html5rocks.com/ko/tutorials/es6/promises/)를 반환합니다
- Typescript 로 구현되어있어 [TypeScript](https://www.typescriptlang.org/) 환경에서도 사용할 수 있습니다.

## Requirements

- [nodejs](https://github.com/nodejs/node) >= 0.12.x

## 설치하기

아래 명령어를 통해 `useb-api-sdk-nodejs`를 nodeJS 프로젝트에 추가합니다.

```
$ npm install useb-api-sdk-nodejs
```

## API 호출하기

아래는 `useb-api-sdk-nodejs`를 활용해 주민등록번호 진위여부 조회 API를 호출하는 예제 코드입니다.

```javascript
// 1. useB REST API 호출에 필요한 모듈을 불러옵니다.
import { UsebAPI } from 'useb-api-sdk-nodejs';

// 2. UsebAPI 객체를 생성합니다. 귀하의 API 정보는 dashboard.useb.co.kr 프로필(또는 내정보) > API KEYS를 참고해주세요.
const usebAPI = new UsebAPI({
  clientId: 'YOUR_ClIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
});

// 3. 주민등록번호 진위여부 조회 API를 호출합니다.
// 3-1. Promise chaining 사용시
usebAPI.status
  .idcard({
    param: {
      identity: '주민등록번호',
      issueDate: '주민등록번호 발급일',
      userName: '이름',
    },
  })
  .then((data) => {
    console.log(data);
    // {"success":true,"message":"입력하신 내용은 등록된 내용과 일치합니다.","transaction_id":"605c77eeec82e373fdc11dee"}
  })
  .catch((err) => {
    console.log(err.data);
    // {"success":false,"message":"ID number is invalid","error_code":"A001","transaction_id":"5ff48526ec829f1fdfcb6a9b"}
  });

// 3-2. async/await 사용시
try {
  const result = await usebAPI.status.idcard({
    param: {
      identity: '주민등록번호',
      issueDate: '주민등록번호 발급일',
      userName: '이름',
    },
  });
  console.log(result);
  // {"success":true,"message":"입력하신 내용은 등록된 내용과 일치합니다.","transaction_id":"605c77eeec82e373fdc11dee"}
} catch (e) {
  console.log(e.data);
  // {"success":false,"message":"ID number is invalid","error_code":"A001","transaction_id":"5ff48526ec829f1fdfcb6a9b"}
}
```

## License

[MIT](LICENSE)

## Author

[useB](https://useb.co.kr)
