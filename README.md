# YSAuction (연성옥션)
## 연성대학교 3학년 종합설계 프로젝트


<p align="center">
  <br>
  <img src="sample.png">
  <br>
</p>


## 프로젝트 소개
- ### 개요
- 현재의 중고 거래 앱 및 사이트는 대부분 고정 가격에 기반한 판매 방식을 채택하고 있다.
그러나 이러한 방식은 중고 물품의 실제 가치를 정확히 반영하기 어렵다는 한계가 있다.
중고 물품의 가치는 다양한 요인에 의해 결정되기 때문에 판매자가 원하는 가격과 구매자가 
지불할 수 있는 적정한 가격 사이에서 타협점을 찾기 어렵다. 
이에 따라 경매 방식을 도입한 중개 웹 사이트의 필요성이 부각됨. 
경매를 통해 판매자는 물품에 더 높은 가격을 기대할 수 있고, 구매자는 실제 시장 가치에 
따라 경쟁적인 입찰을 통해 물품을 구매할 수 있다. 이러한 웹 사이트는 경매 방식의 중고 거래를 간편하게 이용하고자 하는 판매자와 구매자들에게 편리함을 제공하며, 
시장에서의 활성화와 안전한 거래를 촉진함.

- ### 목표
- 사용자들이 안전하고 편리하게 중고 물품을 경매하고 거래할 수 있는 웹 플랫폼을 개발하여, 
경매 참여자 및 관리자 간에 신뢰성 있는 서비스를 제공함.

<br>

## 기술 스택

<br>

| JavaScript | Spring Boot |  React   |  MySQL |
| :--------: | :--------: | :------: | :-----: |
|   <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">    |  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">   | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> | <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> |

<br>

## 구현 기능

### 로그인 및 회원가입, 회원탈퇴
- 로그인 인증 jwt 사용 서버에서 jwt 발급후 서버에 저장 이후 필요할때마다 클라이언트에서 검증요청
- 회원가입시 다음 지도 api 사용하여 편리하게 주소 입력가능
### 메인 페이지(배너,경매 물건 리스트,카테고리,검색)
- 사용자의 관심도를 올리기위한 이동식 배너 (Swiper.js 라이브러리 사용)
- 경매 등록한 상품들을 20개단위로 페이징처리하여 메인화면에 출력
- 카테고리,검색으로 사용자의 편의 증진 
### 상품 등록
- 상품 이미지, 카테고리, 상품 이름, 시작가격 , 상품 설명등을 기입후 상품 등록
### 입찰 시스템
- 입찰 기능을 통해 조회수, 입찰된 횟수, 시작 입찰가, 현재 입찰가 등의 정보를 제공하며, 사용자가 입찰할경우 해당 금액만큼 포인트에서 차감.
- 유찰시 기존에 입찰하던 사용자에게 포인트 환불
- 24시간이 지난후 상품 마감으로 인하여 추가 입찰은 불가능
### 마이페이지,내정보
- 판매 상품리스트, 현재 입찰중인 상품, 입찰 완료 상품, 유찰당한 상품 을 확인할수 있는 마이페이지
- 비밀번호나 이메일 생년월일등을 변경할수있는 내정보 페이지
### 관리자 페이지
- 판매상품 전체를 확인할수있으며 입찰완료된 상품들은 보기 쉽게 background를 회색으로 변경
<br>

## 사용법
- ### Forntend

```sh
\YSCoding\src\main\frontend>
npm i
npm start
```

- ### Backend

```sh
YsCodingApplication execution
```
## 배운 점 & 아쉬운 점

