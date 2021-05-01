import styled from "styled-components";

export const ProfileArea = styled.div`

  margin-bottom: 20px;

  form {
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px #999;
    
    .input-label {
      display: flex;
      align-items: center;
      padding: 10px;
      max-width: 500px;

      .input--title {
        width: 200px;
        text-align: right;
        padding-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }

      .input--field {
        flex: 1;

        input {
          width: 100%;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          outline: 0;
          transition: all ease 0.3s;

          &:focus {
            border: 1px solid #333;
            color: #333;
          }
        }

        button {
          background-color: #0089ff;
          border: 0;
          outline: 0;
          padding: 5px 10px;
          border-radius: 4px;
          color: #fff;
          font-size: 15px;
          cursor: pointer;

          &:hover {
            background-color: #006fce;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    form {
      .input-label {
        flex-direction: column;

        .input--title, .input--checkbox {
          width: 100%;
          text-align: left;
          margin-bottom: 10px;
        }

        .input--checkbox select {
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }

        .input--field {
          width: 100%;

          button {
            width: 100%;
            padding: 10px;
          }
        }
      }
    }
  }
`;

export const MyAdsArea = styled.div`
  h2 {
    font-size: 20px;
  }

  .list {
    display:flex;
    flex-wrap: wrap;
    
    .adItem {
      width: 25%;
    }
  }
  
  @media (max-width: 600px) {

    & {
      margin:10px;
    }

    .list .adItem {
      width: 50%;
    }
  }
`;
