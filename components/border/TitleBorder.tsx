import React from 'react';
import styled from 'styled-components';

export interface TitleBorderProps {
    className?: string;
    title?: string;
}

const TitleBorder: React.FC<TitleBorderProps> = ({
    className='',
    title,
    children
}) => {
    
    return (
        <Wrapper className={[className, 'title-border'].join(' ')}>
            { title && <h4 className="title"> { title } </h4> }
            { children }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.title-border {
        border: 2px solid var(--light-gray);
        border-radius: 5px;
        padding: 0 15px 15px 15px;
        margin-bottom: 20px;
    }
    .title {
        background-color: var(--white); 
        min-height: 20px;
        font-size: 20px;
        position: relative;
        bottom: 14px;
        padding: 0 10px;
        min-width: 200px;
        display: inline;
    }
`;

export default TitleBorder;