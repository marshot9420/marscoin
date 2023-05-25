# MarsCoin Crypto Tracker

MarsCoin은 웹 기반 암호화폐 트래커 애플리케이션입니다.
사용자는 다양한 암호화폐의 현재 가치와 차트를 볼 수 있으며 원하는 방식으로 리스트를 정렬할 수도 있습니다.

## 애플리케이션 실행
아래 gh-pages로 생성된 URL을 통해 이 애플리케이션에 접근하실 수 있습니다.
URL: 

## 기술
- ReactJS: 함수형 컴포넌트를 사용하여 효율적(재사용)이고 유지 보수에 용이한 사용자 인터페이스(UI) 구현
- TypeScript: 정적 타입 검사를 통해 자잘한 버그를 줄이고 런타임 에러 방지, 코드의 가독성과 유지 보수성 향상
- react-router-dom: 웹 애플리케이션의 라우팅 관리, 코인의 상세 페이지 및 chart, price 표시의 빠른 전환
- styled-components: CSS-in-JS 라이브러리, 컴포넌트 단위로 스타일을 구성, 다크모드의 빠르고 편안한 구현을 위해 사용

## 애플리케이션 구조
이 프로젝트는 'npx create-react-app marscoin --template typescript' 명령어를 통해 생성하였으며 이후 필요한 의존성 라이브러리를 추가로 설치했습니다.

애플리케이션은 전체적으로 두 부분으로 나누어져 있습니다.

1. "/" 경로에서는 암호화폐의 리스트가 표시되며, 사용자는 상단의 다크 모드 버튼을 클릭해 다크 모드 전환, 그리고 암호화폐를 정렬하는 옵션을 정할 수 있습니다.

2. 사용자가 특정 암호화폐를 선택하면, 해당 암호화폐에 대한 약식 정보가 표시됩니다. 그리고 chart, price 탭을 클릭하면 페이지 새로고침 없이 해당 화폐의 막대 그래프 차트와 상세 가격 정보를 볼 수 있습니다.

## 프로젝트 구조

- tsconfig.json : 'npx create-react-app marscoin --template typescript' 명령어를 통해 애플리케이션이 생성되면서 자동으로 설치된 파일입니다. typescript 설정에 관한 정보를 담고 있습니다.
- README.md : 이 프로젝트에 관한 설명입니다.
- src : 이 프로젝트의 소스코드가 들어 있습니다.
    - App.tsx : 
    - index.tsx
    - react-app-env.d.ts

## 이슈 노트

### styled-components 설치 에러 (1)
개요: WSL2를 통해 Ubuntu-20.04 버전에서 작업하던 도중, OS 자체가 문제가 있었다. 원인은 불명. 에러는 다음과 같다.
```
npm ERR! Cannot read properties of null (reading 'edgesOut')

npm ERR! A complete log of this run can be found in: /home/marshot1001/.npm/_logs/2023-05-25T07_33_48_637Z-debug-0.log
```

원인: 이전까지만 해도 잘 작동했기에 어떤 원인인지를 잘 모르겠다.

해결: 원래 이전에 하던 프로젝트에서 (그당시엔) DB로 사용하던 MongoDB가 Ubuntu-20.04까지밖에 지원을 하지 않아 해당 버전을 설치하고 사용했었는데, 최근에는 MongoDB가 6.0.4버전 부터는 Ubuntu-22.04 버전(현재 사용중인 버전)도 지원을 하기에 이참에 20.04버전은 삭제하고, 22.04버전을 세팅 및 사용. 내친김에 nvm도 설치했다.

### styled-components 설치 에러 (2)
개요: Ubuntu-22.04 버전으로 옮겼음에도 styled-components를 설치했을 때 동일한 에러가 발생했다.

원인: 추측성이지만 npm 7버전 이상에서 일부 패키지 설치가 정상적으로 이루어지지 않는 문제가 알려져있다. (얼마전까지만해도 styled-components가 5 버전대였는데, 지금 보니 6.0.0-rc.2 버전이다. 이로 인한 호환 문제인듯 하다.)

해결: 위와 같은 이유로 npm(현재 버전: 9.6.6)을 아래 명령어를 통해 다운그레이드 시켜보았다.
```
npm install -g npm@6
```

그리고 'npm -v'를 통해 6.14.18 버전이 제대로 설치됐음을 확인한 후, 다시 설치해보았다.
