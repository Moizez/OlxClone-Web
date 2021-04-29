import styled from 'styled-components';

export const Fake = styled.div`
    background-color: #ddd;
    height: ${props => props.height || 20}px;
`;

export const Area = styled.div`
    display: flex;
    margin-top: 20px;

.box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px #999;
    margin-bottom: 20px;
}

.box--padding {
    padding: 10px;
}

.leftSide {
    flex: 1;
    margin-right: 20px;

    .box {
        display: flex;
        
    }

    .adImage {
        width: 320px;
        height: 320px;
        margin-right: 15px;

        .slide img {
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            height: 320px;
        }

    }

    .adInfo {
        flex: 1;

        .adName{
            margin-bottom: 15px;

            h2 {
                margin: 0;
                margin-top: 20px;
            }

            small {
                color: #666;
            }
        }

        .adDescription {

            small {
                color: #666;
            }

        }
    }
}

.rightSide {
    width: 250px;

    .price span {
        color: #f00;
        display: block;
        font-size: 25px;
        font-weight: bold;
    }

    .contactSeller {
        background-color: #f00;
        color: #fff;
        height: 30px;
        border-radius: 5px;
        box-shadow: 0 0 4px #999;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        margin-bottom: 15px;

    }

    .created small{
        display: block;
        color: #666;
        margin-top: 5px;
    }
}
`;

export const OthersArea = styled.div`

h2 {
    font-size: 20px;
}

.others {
    display: flex;

    .itemAd {
        width: 25%;
    }
}
`;

export const BreadCrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0 5px;
        text-decoration: underline;
        color: #000;
    }
`;
