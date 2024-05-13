import styled from 'styled-components';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  border-radius: var(--border-radius-full);

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-700);
  }

  &:hover {
    box-shadow: var(--shadow-round);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export default ButtonIcon;
