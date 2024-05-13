import styled, { css } from 'styled-components';

const typeStyles = {
  primary: css`
    background-color: var(--color-primary-300);

    &:hover {
      background-color: var(--color-primary-400);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-primary-200);

    &:hover {
      background: var(--color-primary-300);
    }
  `,
  brand: css`
    background-color: var(--color-brand-200);

    &:hover {
      background-color: var(--color-brand-600);
    }
  `,
  tertiary: css`
    background: var(--color-grey-100);
    color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-200);
    }
  `,
  info: css`
    color: var(--color-blue-100);
    background: var(--color-blue-700);

    &:hover {
      background-color: var(--color-blue-800);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  success: css`
    color: var(--color-green-100);
    background-color: var(--color-green-700);

    &:hover {
      background-color: var(--color-green-800);
    }
  `,
};

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.45rem;
    padding: 1rem 1.5rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-900);
  cursor: pointer;

  ${(props) => props.disabled && 'opacity: 0.5; cursor: not-allowed;'}
  ${(props) => typeStyles[props.type]}
  ${(props) => sizes[props.size]}
`;

Button.defaultProps = {
  type: 'primary',
  size: 'medium',
};

export default Button;
