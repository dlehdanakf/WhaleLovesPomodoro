Whale loves Pomodro
===================
> 25분의 시간동안 집중하고 토마토를 획득하는 재미에 빠져보세요!

<img src="./dist/images/whale_contest.png" alt="Pomodoro" style="height: 12px; margin-right: 4px" /> 웨일 확장 앱 콘테스트 출품작입니다.

![Release](https://img.shields.io/github/release/dlehdanakf/WhaleLovesPomodoro.svg)
![NAVER](https://img.shields.io/badge/platform-NAVER%20whale-green.svg)
![NPM](https://img.shields.io/badge/npm-v6.4.1-blue.svg)
![GitHub](https://img.shields.io/github/license/dlehdanakf/WhaleLovesPomodoro.svg)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-%23ff69b4.svg)

🐋 ❤️ 🍅⏲️  
Whale loves Pomodoro는 시간을 효율적으로 관리할 수 있게 도와주는 Pomodoro Technique을 NAVER Whale에서 사용할 수 있도록 개발한 확장프로그램입니다.

### Pomodoro Technique 이란?
> 뽀모도로 기법(Pomodoro Technique)은 시간 관리 방법론으로 1980년대 후반 '프란체스코 시릴로'(Francesco Cirillo)가 제안했다. 타이머를 이용해서 25분간 집중해서 일을 한 다음 5분간 휴식하는 방식이다. '뽀모도로'는 이탈리아어로 토마토를 뜻한다. 프란체스코 시릴로가 대학생 시절 토마토 모양으로 생긴 요리용 타이머를 이용해 25분간 집중 후 휴식하는 일처리 방법을 제안한데서 그 이름이 유래했다.  
> 출처 : [위키백과](https://ko.wikipedia.org/wiki/%EB%BD%80%EB%AA%A8%EB%8F%84%EB%A1%9C_%EA%B8%B0%EB%B2%95)

### 어떻게 하면 사용자가 업무에 집중할 수 있을까?
그 동안 출시된 Pomodoro Timer 관련 브라우져 확장 프로그램에서는 타이머 자체의 역할에 대해 고민하고, 사용자의 집중을 돕기 위해 집중시간 동안에는 집중에 방해가 되는 사이트의 접근을 차단하고 타이머 종료 Notification을 발송하는 기능을 제공했습니다.

하지만 타이머가 동작하면 바로 사용자는 업무에 집중할 수 있을까요? Whale loves Pomodoro는 사용자의 집중력 발휘에는 강한 동기부여가 필요하다 생각했습니다. 사용자가 설정한 시간동안 집중한다면 `간단한 보상`을 통해 성취감과 자기만족을 얻을 수 있는 게임을 고안했습니다.

어린시절에 길을 걷다가 보도블럭에 그어진 금을 밟지 않고 앞으로 나아가는 게임을 해보신적이 있을겁니다. 사람은 아무도 알아주지 않는 내면의 싸움을 통해서 성취감을 느끼곤 합니다. Whale loves Pomodoro는 사용자에게 집중에 성공할 때 마다 토마토를 선물하여 갯수를 올리는 재미를 선물합니다. 사용자에게 대단한 `보상`을 제공하지 않지만 성취감과 자기만족을 통해 강력한 동기부여를 줄 수 있습니다.

### 집중하고 토마토를 보상받으세요!
| 정상 토마토 | 시든 토마토 |
| --- | --- |
| <img src="./dist/images/pomodoro_normal.png" alt="Pomodoro" style="width: 64px;" /> | <img src="./dist/images/pomodoro_rotten.png" alt="Pomodoro" style="width: 64px;" /> |

Whale loves Pomodoro는 집중시간 동안 사용자의 행동을 관찰하며 다음과 같은 행동을 할 경우 집중에 실패한 것으로 판단되고 사용자는 시든 토마토를 얻게됩니다.

- 사전에 지정한 Site Blacklist에 접속할 경우
- 사전에 지정한 Site Whitelist 외에 접속할 경우
- 5분 이상 아무 행동도 하지 않을 경우 (자리를 비울 경우)
- 뽀모도로 타이머를 정지(초기화) 하는 경우

## Getting Started
Whale loves Pomodoro는 NAVER Whale 브라우저에서 동작하는 확장 프로그램으로 [웨일 스토어](https://store.whale.naver.com)에서 설치하실 수 있습니다.

Github에서 소스코드를 내려받아 테스트, 디버깅하기 위해서는 먼저 몇가지 설정을 하셔야 이용 가능합니다.  
보다 자세한 설정 방법은 [웨일 개발자 센터](https://developers.whale.naver.com/tutorials/debugging/)에서 확인 가능합니다.

### Installing
```
$ git clone https://github.com/dlehdanakf/WhaleLovesPomodoro
$ cd WhaleLovesPomodoro
$ npm install
$ npm run build
```

[웨일 개발자 센터](https://developers.whale.naver.com/tutorials/debugging/)에서 안내하는 방법에 따라 `확장앱 소스폴더`를 앞서 git clone을 통해 설치한 폴더로 설정합니다.

## License
본 프로젝트에 포함된 소스코드는 MIT 라이센스를 따르며 자세한 사항은 [LICENSE 문서](./LICENSE)를 참고하시기 바랍니다.  
