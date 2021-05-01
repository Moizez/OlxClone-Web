import styled from "styled-components";

export const AdContainer = styled.div`
  a {
    display: block;
    border: 1px solid #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color:#000;
    background-color: #fff;
    transition: all ease 0.2s;

    &:hover {
      background-color: #eee;
      border: 1px solid #ccc;
    }

    .itemImage img {
      width: 100%;
      border-radius: 5px;
      transition: all ease 0.2s;

      &:hover {
        transform: scale(1.01)
      }
    }

    .itemName {
      font-weight: bold;
    }
  }
`;
