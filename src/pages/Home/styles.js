import styled from 'styled-components';

export const SearchArea = styled.div`
    background-color: #ddd;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;

.searchBox {
    background-color: #9dd83c;
    padding: 20px 15px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0.3px rgba(0,0,0,0.2);
    display: flex;

    form {
        flex: 1;
        display: flex;

        input, select, button {
            height: 40px;
            border: 0;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: #000;
            margin-right: 20px;

        }

        input {
            flex: 1;
            padding: 0 10px;
        }

        select {
            width: 80px;
        }

        button {
            background-color: #49aeef;
            color: #fff;
            padding: 0 20px;
            cursor: pointer;
        }
    }
}

.categoryList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .categoryItem {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        text-decoration: none;
        height: 50px;
        margin-bottom: 10px;

        &:hover {
            color: #999;
        }

        img {
            width: 45px;
            height: 45px;
            margin-right: 10px;
        }
    }

}

@media (max-width: 600px) {

    .searchBox form {
        flex-direction: column;

        input {
            padding: 10px;
            margin-right: 0;
            margin-bottom: 10px;
        }

        select {
            width: 100%;
            margin-bottom: 10px;
        }

        button {
            width: 100%;
        }

    }

    .categoryList .categoryItem {
        width: 50%;
        padding: 10px;
        justify-content: flex-start;
    }
   
}

`;

export const Area = styled.div`

h2 {
    font-size: 20px;
}

.list {
    display: flex;
    flex-wrap: wrap;

    .itemAd {
        width: 25%;
    }
}

.seeAllLink {
    color: #000;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
}

@media (max-width: 600px) {
    margin: 10px;

    h2 {
        text-align: center;
    }

    .list .itemAd{
        width: 50%;
    }
}

`;

