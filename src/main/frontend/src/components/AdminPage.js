import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import "./AdminPage.css";
import {useNavigate} from "react-router-dom"; // 로그인 스타일 파일을 임포트합니다.

const AdminPage = () => {
    const [time, setTime] = useState(new Date());
    const [loginId, setLoginId] = useState();
    const [admin, setAdmin] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수를 저장하기 위한 상태 추가
    const navigate = useNavigate();

    const [backendTimeDate, setBackendTimeDate] = useState(new Date());
    const [backendTime, setBackendTime] = useState(new Date());

    const currentDate_log = new Date();

    const handleLogoutClick = () => {
        localStorage.setItem('token', ''); // 토큰 삭제
        setLoginId(''); // 로그인 상태 해제

        axios.post('/api/logout')
            .then()
            .catch();
    };


    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await axios.get(`/api/productsAdmin?page=${currentPage - 1}`);
    //             setProducts(response.data.content);
    //             setTotalPages(response.data.totalPages); // 총 페이지 수를 상태에 저장
    //         } catch (error) {
    //             console.error('상품 목록을 불러오는 중 에러 발생:', error);
    //         }
    //     };
    //
    //     fetchProducts();
    // }, [currentPage]); // currentPage가 변경될 때마다 useEffect를 실행
    //
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/productsAdmin?page=${currentPage - 1}`);
                const productsData = response.data.content;

                // 각 product의 loginId와 buyId를 기반으로 추가적인 데이터 조회
                const enhancedProducts = await Promise.all(
                    productsData.map(async (product) => {
                        // product.loginId를 이용하여 추가적인 데이터를 조회하는 요청 보내기
                        const loginDataResponse = await axios.get(`/api/adminLoginDateAll/${product.loginId}`);
                        const loginData = loginDataResponse.data; // 예시로 받아온 데이터

                        // product.buyId를 이용하여 추가적인 데이터를 조회하는 요청 보내기
                        const buyDataResponse = await axios.get(`/api/adminLoginDateAll/${product.buyId}`);
                        const buyData = buyDataResponse.data; // 예시로 받아온 데이터

                        // 기존 product 객체에 추가적인 데이터를 합치기
                        return {...product, loginData, buyData};
                    })
                );

                setProducts(enhancedProducts);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('상품 목록을 불러오는 중 에러 발생:', error);
            }
        };

        fetchProducts();
    }, [currentPage]);


//상품설명 글자제한 밑 ... 붙히기
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    };

//가격에 콤마 붙히기 1,000,000원 이런식으로
    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };


    // const AdDate = (id) => axios.get(`/api/adminLoginDateAll/${id}`)
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error('어드민 여부 확인 중 오류 발생:', error);
    //     });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUsernameFromToken = async () => {
            try {
                const response = await axios.get(`/api/getUsernameFromToken/${token}`);
                const username = response.data;
                setLoginId(username);
            } catch (error) {
                alert("토큰이 만료되었습니다, 다시 로그인 해주세요")
                handleLogoutClick();
                console.error('토큰에서 사용자 이름 가져오는 중 오류 발생:', error);
            }
        };
        if (token) {
            // 토큰이 있으면 아이디 추출하여 로그인 상태로 설정
            fetchUsernameFromToken();
        }
        if (!token) {
            handleLogoutClick();
        }

        if (loginId) {
            axios.get(`/api/adminCheck/${loginId}`)
                .then(response => {
                    setAdmin(response.data);
                    console.log(response.data)
                    if (!response.data) {
                        // 얼럿 표시
                        alert('어드민 권한이 없습니다.');
                        // 메인 페이지로 이동
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error('어드민 여부 확인 중 오류 발생:', error);
                });
        }


        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(id);
    }, [loginId, setLoginId, admin, setAdmin]);

    const adminproductbnt = (productId) => {

        if (window.confirm('정말로 이 작업을 수행하시겠습니까?')) {
            axios.post(`/api/adminProductCom?productId=${productId}`)
                .then(response => {
                    // 응답 처리 필요시 처리
                })
                .catch(error => {
                    // 오류 처리 필요시 처리
                })
                .finally(response => {
                    window.location.reload();
                })
            ;
        } else {
            // 사용자가 취소하면 아무 작업도 수행하지 않음
        }
    };



    return (
        <div className="admin_main">
            {admin ? (
                <div className={`admin_main_container`}>
                    <div className="admin_main_product_container">
                        {products.map((product) => (
                            // 상품이 만료되지 않은 경우에만 표시
                            <div key={product.id} className="admin_main_product">
                                <div
                                    className={`admin_main_product_box${new Date() > new Date(product.timeAfter24Hours) ? "_red" : ""}`}>
                                    <div className="admin_main_product_box_L">
                                        <div className="admin_product_img_div">
                                            <img src={`/api/images/${product.imagePath}`} className="product_img"
                                                 alt={product.productName}/>
                                        </div>
                                    </div>
                                    <div className="admin_main_product_box_R">
                                        <div className="admin_main_product_box_R1">
                                            <div className="admin_main_product_title">제목 : {product.productName}</div>
                                            <div className="admin_main_product_des">내용
                                                : {truncateDescription(product.content, 30)}</div>
                                            <div className="admin_main_product_mon">시작 입찰가
                                                : {formatCurrency(product.startingPrice)}원
                                            </div>
                                            <div className="admin_main_product_mon2">현재 입찰가
                                                : {formatCurrency(product.currentPrice)}원
                                            </div>
                                            <div className="admin_main_product-views">
                                                조회수 : {product.views}
                                            </div>
                                            <div className="admin_main_product-bids">
                                                입찰한 횟수:{product.biddersCount}</div>
                                            <div className="">
                                                물품 등록일: {new Date(product.registrationTime).toLocaleString()}
                                            </div>
                                            <div className="">
                                                입찰 마감일: {new Date(product.timeAfter24Hours).toLocaleString()}
                                            </div>

                                        </div>


                                        <div className="admin_main_product_box_R2">

                                            <div>판매자 정보</div>
                                            <div>판매자: {product.loginId}</div>
                                            <div>{`판매자 이름: ${(product.loginData.name)}`}</div>
                                            <div>{`판매자 주소: ${(product.loginData.homeAddress)}`}</div>
                                            <div>{`${(product.loginData.detailHomeAddress)}`}</div>
                                            <div>{`판매자 전화번호: ${(product.loginData.phoneNumber)}`}</div>
                                        </div>

                                        {product.buyId &&
                                            <div className="admin_main_product_box_R3">
                                                <div>구매자 정보</div>
                                                <div>구매자 :{product.buyId}</div>
                                                <div>{`구매자 이름 : ${(product.buyData.name)}`}</div>
                                                <div>{`구매자 주소 : ${(product.buyData.homeAddress)}`}</div>
                                                <div>{`${(product.buyData.detailHomeAddress)}`}</div>
                                                <div>{`구매자 전화번호: ${(product.buyData.phoneNumber)}`}</div>
                                            </div>
                                        }
                                        {!product.buyId &&
                                            <div className="admin_main_product_box_R3_notBuyId">구매자 없음</div>}

                                    </div>
                                    <div className="admin_product_link_box">
                                        <div className="admin_product_link_subBox">
                                            <Link to={`/product/${product.id}`} className="admin_product_link">
                                                <div className="admin_main_product_link_div">페이지 이동</div>
                                            </Link>
                                            <div>
                                                {new Date() > new Date(product.timeAfter24Hours)
                                                    ?
                                                    <button
                                                        className={`admin_main_product_bnt${product.delivery ? 'red' : ''}`}
                                                        onClick={() => adminproductbnt(product.id)}
                                                    >
                                                        {product.delivery ? '전달완료' : '물품전달'}
                                                    </button>

                                                    :
                                                    <div></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="admin_main_product_container_bnt_box">
                        {[...Array(totalPages).keys()].map((page, index) => ( // totalPages 상태 사용
                            <button className="admin_main_product_container_bnt" key={index}
                                    onClick={() => handlePageChange(page + 1)}>
                                {page + 1}
                            </button>
                        ))}
                    </div>

                </div>
            ) : (
                <div>
                    <p>You do not have permission to access this page.</p>
                    {/* Optionally, you can redirect the user to another page or show a login link */}
                </div>
            )}
        </div>
    );
};

export default AdminPage;