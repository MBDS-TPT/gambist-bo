import React from 'react';
import styled from 'styled-components';
import { Loader as LoaderSvg } from '../svg-icons/Icons';

export interface LoaderProps {
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({
    className='',
}) => {

    return (
        <Wrapper className={[className, 'loader'].join(' ')}>
            <LoaderSvg width={80} color={"#bbbbbb"} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.loader {
        position: absolute;
        background-color: rgba(200, 200, 200, 0.5);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        z-index: 10;
    }
`;

export default Loader;