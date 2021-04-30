import styled from 'styled-components';

export const Area = styled.div`
    display: flex;
    margin-top: 20px;

    .leftSide {
        width: 250px;
        margin-right: 10px;

        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }
        
        input, select {
            width: 100%;
            height: 40px;
            border-radius: 5px;
            border: 2px solid #9bb83c;
            outline: 0;
            font-size: 15px;
            color: #000;
            padding: 10px;
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .itemCategory {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: #000;
            cursor: pointer;
            margin-bottom: 3px;

            img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
            }

            span {
                font-size: 14px;
            }
        }

        .itemCategory:hover,
        .itemCategory.active {
            background-color: #9bb83c;
            color: #fff;
        }
    }

    .rightSide {
        flex: 1;


        h2 {
            margin-top: 0;
            font-size: 18px;
        }

        .listWarning {
            padding: 30px;
            text-align: center;
        }

        .list {
            display: flex;
            flex-wrap: wrap;

            .itemAd {
                width: 25%;
            }
        }

        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;

            .pageItem {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border: 1px solid #000;
                font-size: 14px;
                margin-right: 5px;
                cursor: pointer;

                &:hover {
                    border: 1px solid #999;
                }

                &.active {
                    background-color: #9bb83c;
                }
            }
        }
    }
`;

