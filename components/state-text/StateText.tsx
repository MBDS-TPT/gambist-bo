import React from 'react';
import styled from 'styled-components';

export interface StateTextProps {
    className?: string;
    state: number;
}

const StateText: React.FC<StateTextProps> = ({
    className='',
    state=0
}) => {
    
    const getTextState = () => {
        switch(state) {
            case 0:
                return 'created'
            case -1:
                return 'deleted'
            case 1:
                return 'canceled'
            default:
                return 'undefined'
        }
    }

    return (
        <Wrapper className={[className, 'state'].join(' ')}>
            <span className={ getTextState() }>{ getTextState() }</span>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.state {
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
    }
    .created {
        color: blue;
    }
    .deleted {
        color: red;
    }
`;

export default StateText;