import React from 'react';
import styled from 'styled-components';
import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';


export interface PageWrapperProps {
    className?: string;
}

const Page:React.FC<any> = ({
    className='',
    children
}) => {
    return (
        <Wrapper className={[className, "page"].join(' ')}>
            <SideNav/>
            <div className="page-container">
                <Header/>
                <div className="page-content">
                    {children}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.page {
        display: flex;
        flex-direction: row;
    }
    .page-container {
        width: 80%;
        min-width: 400px;
        min-height: 100vh;
    }
    .page-content {
        padding: 20px;
    }
`;

export default Page;