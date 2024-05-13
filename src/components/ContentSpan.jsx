import styled, { css } from 'styled-components';

const sizeStyles = {
  xLarge: css`
    font-size: 3rem;
  `,
  large: css`
    font-size: 2rem;
  `,

  medium: css`
    font-size: 1.5rem;
  `,

  small: css`
    font-size: 1.25rem;
  `,
};

const weightStyles = {
  regular: css`
    font-weight: 500;
  `,
  semiBold: css`
    font-weight: 600;
  `,
  bold: css`
    font-weight: 700;
  `,
};

const typeStyles = {
  primary: css`
    color: var(--color-grey-700);
  `,
  secondary: css`
    color: var(--color-grey-500);
  `,
  tertiary: css`
    color: var(--color-grey-300);
  `,
  brand: css`
    color: var(--color-brand-500);
  `,
  brandDark: css`
    color: var(--color-brand-600);
  `,
  danger: css`
    color: var(--color-red-700);
  `,
};

const alignStyles = {
  left: css`
    text-align: left;
  `,
  center: css`
    text-align: center;
  `,
  right: css`
    text-align: right;
  `,
};

const ContentSpan = styled.span`
  ${(props) => sizeStyles[props.size]}
  ${(props) => typeStyles[props.type]}
  ${(props) => alignStyles[props.$align]}
  ${(props) => weightStyles[props.$weight]}
`;

ContentSpan.defaultProps = {
  type: 'primary', // default type
  size: 'medium', // default color
};
export default ContentSpan;
