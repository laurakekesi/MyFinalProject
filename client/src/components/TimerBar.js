import styled, { keyframes } from "styled-components";

const TimerBar = () => {
    return(
        <>
        <BarDiv></BarDiv>
        </>
    )
}

const elapse = keyframes`
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
`;

const colourChange = keyframes`
    from {
        background-color: var(--orangey-yellow);
    }
    to {
        background-color: var(--pink);
    }
`;

const BarDiv = styled.div`
height: 30px;
border-radius: 15px;
animation: ${elapse} 15s cubic-bezier(1,.99,0,-0.02), ${colourChange} 15s cubic-bezier(1,.99,0,-0.02);
`



// const Wrapper = styled.div`
//     animation: ${scale} 300ms forwards, ${fade} 500ms forwards;
//     border-radius: 50%;
//     background: ${(props)=> props.color};
//     width: ${(props) => props.size}px;
//     height: ${(props) => props.size}px;
// `;


// @keyframes animation{

// }

// .round-time-bar {
//     margin: 1rem;
//     overflow: hidden;
//   }
//   .round-time-bar div {
//     height: 5px;
//     animation: roundtime calc(var(--duration) * 1s) steps(var(--duration))
//       forwards;
//     transform-origin: left center;
//     background: linear-gradient(to bottom, red, #900);
//   }
// .round-time-bar[data-style="smooth"] div {
//     animation: roundtime calc(var(--duration) * 1s) linear forwards;
//   }

// @keyframes roundtime {
//     to {
//       /* More performant than `width` */
//       transform: scaleX(0);
//     }
//   }
export default TimerBar;