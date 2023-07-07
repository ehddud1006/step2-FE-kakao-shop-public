import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Button } from '@components/@base';
import { RegularInput } from '@components/@molecules';

const LoginForm = () => {
  return (
    <S.Root>
      <S.Container>
        {data.map(item => (
          <RegularInput.HiddenLabel key={item.content} placeholder={item.placeholder} css={S.InputStyle}>
            {item.content}
          </RegularInput.HiddenLabel>
        ))}
        <Button css={S.ButtonStyle}>로그인</Button>
        <S.Link to="/signup">회원가입</S.Link>
      </S.Container>
    </S.Root>
  );
};

export default LoginForm;

const data = [
  { content: '이메일 (아이디)', placeholder: '이메일' },
  { content: '비밀번호', placeholder: '비밀번호' },
];

const S = {
  Root: styled.section`
    width: 580px;

    box-sizing: border-box;
    margin: 40px auto 42px;
    padding: 0 69px;

    border: 1px solid rgba(0, 0, 0, 0.12);

    font-size: 12px;
  `,
  Container: styled.form`
    position: relative;

    height: 100%;

    box-sizing: border-box;
    padding: 55px 0 50px;
  `,
  InputStyle: css`
    position: relative;

    width: 100%;
    min-height: 45px;

    box-sizing: border-box;
    margin-bottom: 12px;
    padding: 10px 0 8px;

    border: solid #ccc;
    border-width: 0 0 2px;

    background-color: transparent;

    font-size: 18px;
    line-height: 25px;
    color: #191919;
    letter-spacing: 0;

    caret-color: #191919; // input focus 커서 색상

    &:focus {
      border: solid #191919;
      border-width: 0 0 2px;
    }
  `,
  ButtonStyle: css`
    width: 100%;
    height: 50px;

    margin-top: 20px;

    background-color: #fee500;
    border-radius: 4px;

    font-weight: 400;
    font-size: 16px;
    line-height: 51px;
    color: #191919;
  `,
  Link: styled(Link)`
    display: inline-block;

    width: 100%;

    margin-top: 20px;

    text-align: center;
    color: #333;
    font-size: 14px;
  `,
};