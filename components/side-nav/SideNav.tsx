import { Link, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export interface SideNavProps {
    className?: string;
}

const SideNav: React.FC<SideNavProps> = ({
    className='',
}) => {

    return (
        <Wrapper className={[className, 'side-nav'].join(' ')}>
            <div className="logo"></div>
            <List component="nav" className="nav" aria-label="menu">
                <ListItem className="nav-item" button>
                    <Link href="/teams">
                        <ListItemText primary="Teams" />
                    </Link>
                </ListItem>
                <ListItem className="nav-item" button>
                    <Link href="/categories">
                        <ListItemText primary="Categories" />
                    </Link>
                </ListItem>
                <ListItem className="nav-item" button>
                    <Link href="/matches">
                        <ListItemText primary="Matches" />
                    </Link>
                </ListItem>
                <ListItem className="nav-item" button>
                    <Link href="/bet-type">
                        <ListItemText primary="Bet Types" />
                    </Link>
                </ListItem>
                <ListItem className="nav-item" button>
                    <Link href="/users">
                        <ListItemText primary="Users" />
                    </Link>
                </ListItem>
                <ListItem className="nav-item" button>
                    <Link href="/bets">
                        <ListItemText primary="Bets" />
                    </Link>
                </ListItem>
            </List>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.side-nav {
        width: 20%;
        min-width: 240px;
        background-color: var(--dark); 
        display: flex;
        justify-content: start;
        flex-direction: column;
    }
    .logo {
        width: 100%;
        height: 68px;
        border-bottom: 5px solid var(--light-gray);
    }
    .nav {
        color: var(--white);
    }
    .nav-item {
        height: 64px;
        padding-left: 30px;
    }
    .nav-item a {
        color: var(--white);
        :hover {
            text-decoration: none;
        }
    }
`;

export default SideNav;