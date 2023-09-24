import styled, { keyframes } from 'styled-components';

const Loader = () => {
    return (
        <ContentLoader className="container">
            <div className="dash uno"></div>
            <div className="dash dos"></div>
            <div className="dash tres"></div>
            <div className="dash cuatro"></div>
        </ContentLoader>
    );
};
const spin4 = keyframes`
    0% {
      transform: rotate(0deg);
    }
    38% {
        transform: rotate(0deg);
    }
    60% {
        transform: rotate(-360deg);
    }
    65% {
        transform: rotate(-370deg);
    }
    75% {
        transform: rotate(-360deg);
    }
    100% {
        transform: rotate(-360deg);
    }
`;
const spin2 = keyframes`
    0% {
      transform: rotate(0deg);
    }
    20% {
        transform: rotate(0deg);
    }
    30% {
        transform: rotate(-180deg);
    }
    35% {
        transform: rotate(-190deg);
    }
    40% {
        transform: rotate(-180deg);
    }
    78% {
        transform: rotate(-180deg);
    }
    95% {
        transform: rotate(-360deg);
    }
    98% {
        transform: rotate(-370deg);
    }
    100% {
        transform: rotate(-360deg);
    }
`;
const spin3 = keyframes`
    0% {
    transform: rotate(0deg);
  }
  27% {
    transform: rotate(0deg);  
  }
  40% {
    transform: rotate(180deg);
  }
  45% {
    transform: rotate(190deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  80% {
    transform: rotate(370deg);
  }
  85% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    25% {
        transform: rotate(360deg);
    }
    30% {
        transform: rotate(370deg);
    }
    35% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const ContentLoader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;

    & .dash {
        margin: 0 7px;
        width: 15px;
        height: 5px;
        border-radius: 8px;
        background: #7d2cff;
        box-shadow: 0 0 10px 0 #FECDFF;
    }

    & .uno {
        margin-right: -10px;
        transform-origin: center left;
        animation: ${spin} 3s linear infinite;  
    }

    & .dos {
        transform-origin: center right;
        animation: ${spin2} 3s linear infinite;
        animation-delay: .2s;
    }

    & .tres {
        transform-origin: center right;
        animation: ${spin3} 3s linear infinite;
        animation-delay: .3s;
    }

    & .cuatro {
        transform-origin: center right;
        animation: ${spin4} 3s linear infinite;
        animation-delay: .4s;
    }
`;

export default Loader;