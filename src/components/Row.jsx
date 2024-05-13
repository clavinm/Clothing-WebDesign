import styled, { css } from 'styled-components';

const typeStyles = {
  horizontal: css`
    align-items: center;
  `,
  vertical: css`
    justify-content: space-between;
    flex-direction: column;
    ${'' /* gap: 4rem; */}
  `,
  title: css`
    align-items: center;
    border-bottom: 2px solid var(--color-brand-500);
    position: sticky;
    top: -2.5%;
    backdrop-filter: blur(10px);
    z-index: 5;
  `,
  footer: css`
    align-items: center;
    padding-block: 1rem;
    border-top: 2px solid var(--color-brand-500);
    position: sticky;
    bottom: -2.5%;
    backdrop-filter: blur(10px);
    z-index: 5;
  `,
};

const sizeStyles = {
  small: css`
    gap: 0.25rem;
  `,

  medium: css`
    gap: 1rem;
  `,

  large: css`
    gap: 1.5rem;
  `,

  xLarge: css`
    gap: 2rem;
  `,

  xxLarge: css`
    gap: 3rem;
  `,

  threeXLarge: css`
    gap: 6rem;
  `,

  fourXLarge: css`
    gap: 10rem;
  `,
};

const contentPositionStyles = {
  spaceBetween: css`
    justify-content: space-between;
  `,
  center: css`
    justify-content: center;
    align-items: center;
  `,
  left: css`
    justify-content: flex-start;
    align-items: flex-start;
  `,
  right: css`
    justify-content: flex-end;
  `,
};

const Row = styled.div`
  display: flex;
  ${(props) => typeStyles[props.type]}
  ${(props) => sizeStyles[props.size]}
  ${(props) => contentPositionStyles[props.$contentposition]}
`;

Row.defaultProps = {
  type: 'horizontal',
  size: 'medium',
  $contentposition: 'spaceBetween',
};

export default Row;
