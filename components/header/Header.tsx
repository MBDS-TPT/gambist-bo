import React from 'react';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';

const Header: React.FC = () => {
    return (
        <Wrapper>
            <Toolbar
                className="header"
            >
                
            </Toolbar>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .header {
        background-color: var(--dark);
    }
`;

export default Header;