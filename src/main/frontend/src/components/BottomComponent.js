import React from 'react';
import "./BottomComponent.css"

const BottomComponent = () => {
    return (
        <div>
            <div className="bottom-component">
                <div className="company-info">
                    <div className="company-info-left">
                        <div>상호명 및 호스팅 서비스 제공: 연성옥션(주)</div>
                        <div>대표이사: 홍연승,최영,김연수,최형우</div>
                        <div>서울시 강남구 강남대로 999-999</div>
                        <div>사업자 등록번호: 123-45-00000000</div>
                    </div>

                    <div className="company-info-right">
                        <div>통신판매업신고: 2026-서울강남-000000</div>
                        <div>고객센터 | 전자금융거래분쟁처리담당: 02-1234-56789 (유료)</div>
                        <div>서울시 강남구 강남대로 999-999</div>
                        <div>이메일: help@ysauction.com</div>
                    </div>
                </div>

                <div className="bank-info">
                    연성은행 채무지급보증 안내
                    당사는 고객님이 현금 결제한 금액에 대해
                    연성은행과 채무지급보증 계약을 체결하여
                    안전거래를 보장하고 있습니다.
                </div>

                <div className="product-info">
                    서비스 가입사실 확인 >
                    사이버몰 내 판매되는 상품 중에는 마켓마스터에 등록한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다. 마켓플레이스(오픈마켓) 상품의 경우 마켓마스터는
                    통신판매중개자이며 통신판매의 당사자가 아닙니다. 마켓마스터는 마켓플레이스(오픈마켓) 상품, 거래정보 및 거래 등에 대하여 책임을 지지 않습니다.
                </div>

                <div className="trust-center">
                    연성옥션은 소비자 보호와 안전거래를 위해 신뢰관리센터(support@ysauction.com)를 운영하고 있으며, 관련 분쟁이 발생할 경우 별도의 분쟁 처리절차에 의거 분쟁이
                    처리됩니다.
                    Copyright © MarketMaster Corp. 2023 All Rights Reserved.
                </div>
            </div>

        </div>
    );
};

export default BottomComponent;