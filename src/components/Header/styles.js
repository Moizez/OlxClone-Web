import styled from 'styled-components';

export const Area = styled.div`
    background-color: #fff;
    height: 60px;
    border-bottom: 1px solid #ccc;

.container{
    max-width: 1000px;
    margin: auto;
    display: flex;
}

a {
    text-decoration: none;
}

.logo {
    flex: 1;
    height: 60px;
    display: flex;
    align-items: center;

    .logo-olx{
        width: 60px;
    }
}

nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul {
        display: flex;
        align-items: center;
        height: 40px;
    }

    li {
        margin-left: 20px;
        margin-right: 20px;

        a, button{
            border: 0;
            background: none;
            color: #000;
            font-size: 14px;
            text-decoration: none;
            cursor: pointer;
            outline: 0;

            &:hover{
                color: #999;
            }

            &.button {
                background-color: #ff8100;
                border-radius: 5px;
                color: #fff;
                padding: 5px 10px;

            }

            &.button:hover {
                background-color: #e57706;
            }
        }
    }
}
`;