import React from 'react';
import styled from 'styled-components';

export interface TeamCardProps {
    className?: string;
    imageLink?: string;
    teamName?: string;
    size?: string | 'large' | 'medium';
}

const TeamCard:React.FC<TeamCardProps> = ({
    className='',
    imageLink="https://livedemo00.template-help.com/wt_prod-19186/images/team-atletico-100x100.png",
    size='large',
    teamName
}) => {


    return (
        <Wrapper className={["team-card", size, className].join(' ')} >
            <img src={imageLink}/>
            <p className="team-name">{ teamName }</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.team-card {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--light-gray);
    }
    &.team-card.large,
    &.team-card.medium {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &.team-card.large {
        width: 200px;
        height: 242px;
    }
    &.team-card.medium {
        width: 115px;
        height: 118px;
    }
    .team-name {
        text-transform: uppercase;
        margin-bottom: 5px;
        font-weight: 700;
        color: var(--dark) 
    }
    img {
        width: 150px;
        height: 150px;
        margin-bottom: 10px;
    }
`;

export default TeamCard;