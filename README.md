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

- react-query: 데이터 비동기 처리, 캐싱, 동기화, 업데이트 등의 작업 간소화로 인한 애플리케이션의 성능 향상

- react-helmet: <head> 요소(메타데이터 등 포함)의 동적 관리

- react-icons: ReactJS에서 다양한 아이콘을 쓸 수 있는 라이브러리

- recoil: 상태 관리 라이브러리, 유연하고 확장 가능한 상태 관리, 렌더링 최적화

## 애플리케이션 구조

이 프로젝트는 'npx create-react-app marscoin --template typescript' 명령어를 통해 생성하였으며 이후 필요한 의존성 라이브러리를 추가로 설치했습니다.

애플리케이션은 전체적으로 두 부분으로 나누어져 있습니다.

1. "/" 경로에서는 암호화폐의 리스트가 표시되며, 사용자는 상단의 다크 모드 버튼을 클릭해 다크 모드 전환, 그리고 암호화폐를 정렬하는 옵션을 정할 수 있습니다.

2. 사용자가 특정 암호화폐를 선택하면, 해당 암호화폐에 대한 약식 정보가 표시됩니다. 그리고 chart, price 탭을 클릭하면 페이지 새로고침 없이 해당 화폐의 막대 그래프 차트와 상세 가격 정보를 볼 수 있습니다.

## 프로젝트 구조

marscoin/
├── src/
│ ├── components/
│ │ └── Header.tsx: 상단 header 컴포넌트, title, home버튼, darkmode 버튼
│ ├── routes/
│ │ ├── Coins.tsx: 암호화폐 리스트
│ │ ├── Coin.tsx: 특정 암호화폐에 대한 정보와 차트, 가격
│ │ ├── Chart.tsx: 암호화폐의 막대 그래프 차트
│ │ ├── Price.tsx: 암호화폐의 가격에 대한 일일 정보
│ │ └── atoms.ts: Recoil 상태 정의
│ ├── App.tsx: 애플리케이션 진입점
│ ├── index.tsx: React 애플리케이션을 실제 DOM에 렌더링하는 엔트리 포인트
│ ├── react-app-env.d.ts: TypeScript 환경 설정
│ ├── Router.tsx: Coins.tsx, Coin.tsx 라우팅
│ ├── styled.d.ts: styled-components 라이브러리에 대한 타입 선언(커스텀 theme)
│ ├── theme.ts: 애플리케이션의 theme 스타일 정의
│ └── api.ts: API fetch 함수 정의
├── README.md: 이 프로젝트의 설명
└── tsconfig.json: TypeScript 설정 파일

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

### useEffect의 비동기 처리 에러

개요: Coins.tsx 파일의 Coins 함수를 다음과 같이 작성했다.

```
const Coins = () => {
  useEffect(() => {
    async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      console.log(json);
    };
  }, []);
  return (
    <Container>
      <Header>
        <Title>MarsCoin</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name}</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};
```

그랬더니 다음과 같은 에러가 발생했다.

```
ERROR
[eslint]
src/routes/Coins.tsx
  Line 73:5:  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions

Search for the keywords to learn more about each error.
```

원인: useEffect hook은 직접적으로 'async' 함수를 지원하지 않는다고 한다.

해결: async 함수를 선언하고 그 함수를 useEffect hook 내에서 호출하도록 (즉시 실행 함수) 아래와 같이 코드를 작성했다.

```
useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      console.log(json);
    })();
  }, []);
```

이러면 useEffect의 콜백 함수 자체는 Promise를 반환하지 않게 되므로 에러가 발생하지 않는다.
